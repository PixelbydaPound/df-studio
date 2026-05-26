import { useEffect, useRef, useState } from "react";
import portraitImage from "figma:asset/a96981bb6877cda98199de6acc8b2114d354d90a.png";
import "./HalftonePortrait.css";

const SIZE = 120;
const DOT_SPACING = 2.5;
const DENSITY_THRESHOLD = 0.08;
const INFLUENCE_RADIUS = 40;
const PUSH_STRENGTH = 3.2;
const SPRING = 0.14;
const DAMPING = 0.8;

/** Matches CSS object-fit: cover + object-position: center */
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  size: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(size / iw, size / ih);
  const sw = size / scale;
  const sh = size / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
}

type Dot = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

function buildDots(imageData: ImageData, scale: number): Dot[] {
  const { data, width, height } = imageData;
  const dots: Dot[] = [];
  const radius = SIZE / 2;

  for (let y = 0; y < height; y += DOT_SPACING) {
    for (let x = 0; x < width; x += DOT_SPACING) {
      const px = Math.min(Math.floor(x), width - 1);
      const py = Math.min(Math.floor(y), height - 1);
      const i = (py * width + px) * 4;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 40) continue;

      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const density = 1 - luminance;
      if (density < DENSITY_THRESHOLD) continue;

      const bx = x / scale;
      const by = y / scale;
      const dx = bx - SIZE / 2;
      const dy = by - SIZE / 2;
      if (dx * dx + dy * dy > radius * radius) continue;

      dots.push({
        baseX: bx,
        baseY: by,
        x: bx,
        y: by,
        vx: 0,
        vy: 0,
        radius: 0.55 + density * 1.35,
        alpha: 0.25 + density * 0.75,
      });
    }
  }

  return dots;
}

function dotsSettled(dots: Dot[]): boolean {
  for (const dot of dots) {
    if (
      Math.abs(dot.x - dot.baseX) > 0.05 ||
      Math.abs(dot.y - dot.baseY) > 0.05 ||
      Math.abs(dot.vx) > 0.01 ||
      Math.abs(dot.vy) > 0.01
    ) {
      return false;
    }
  }
  return true;
}

export function HalftonePortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -999, y: -999, active: false });
  const hoveringRef = useRef(false);
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef<number>(0);
  const [staticFallback, setStaticFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || staticFallback) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelSize = Math.floor(SIZE * dpr);
    canvas.width = pixelSize;
    canvas.height = pixelSize;

    let disposed = false;
    const img = new Image();

    const fail = () => {
      if (!disposed) setStaticFallback(true);
    };

    const init = () => {
      if (disposed || !img.naturalWidth) return;

      const offscreen = document.createElement("canvas");
      offscreen.width = pixelSize;
      offscreen.height = pixelSize;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) {
        fail();
        return;
      }

      drawImageCover(offCtx, img, pixelSize);

      let imageData: ImageData;
      try {
        imageData = offCtx.getImageData(0, 0, pixelSize, pixelSize);
      } catch {
        fail();
        return;
      }

      const dots = buildDots(imageData, dpr);
      if (dots.length === 0) {
        fail();
        return;
      }

      dotsRef.current = dots;
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active: true,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!hoveringRef.current) return;
      updatePointer(event.clientX, event.clientY);
    };

    const onPointerEnter = () => {
      hoveringRef.current = true;
      frameRef.current = requestAnimationFrame(tick);
    };

    const onPointerLeave = () => {
      hoveringRef.current = false;
      pointerRef.current = { x: -999, y: -999, active: false };
      frameRef.current = requestAnimationFrame(tick);
    };

    const draw = () => {
      const dots = dotsRef.current;
      if (dots.length === 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.save();
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, SIZE, SIZE);

      for (const dot of dots) {
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const tick = () => {
      if (disposed) return;

      const dots = dotsRef.current;
      if (dots.length === 0) return;

      const pointer = pointerRef.current;
      const isHovering = hoveringRef.current;
      let moved = false;

      for (const dot of dots) {
        if (isHovering && pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < INFLUENCE_RADIUS && dist > 0.001) {
            const force = (1 - dist / INFLUENCE_RADIUS) ** 2 * PUSH_STRENGTH;
            dot.vx += (dx / dist) * force;
            dot.vy += (dy / dist) * force;
            moved = true;
          }
        }

        dot.vx += (dot.baseX - dot.x) * SPRING;
        dot.vy += (dot.baseY - dot.y) * SPRING;
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (
          Math.abs(dot.x - dot.baseX) > 0.05 ||
          Math.abs(dot.y - dot.baseY) > 0.05 ||
          Math.abs(dot.vx) > 0.01 ||
          Math.abs(dot.vy) > 0.01
        ) {
          moved = true;
        }
      }

      if (isHovering || moved) {
        draw();
      }

      if (isHovering || !dotsSettled(dots)) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    img.onload = init;
    img.onerror = fail;
    img.src = portraitImage;

    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointermove", onPointerMove);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointermove", onPointerMove);
    };
  }, [staticFallback]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStaticFallback(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`halftone-portrait${staticFallback ? " halftone-portrait--static" : ""}`}
      role="img"
      aria-label="Daniel"
    >
      <img
        className="halftone-portrait__photo"
        src={portraitImage}
        alt=""
        aria-hidden
      />
      {!staticFallback && (
        <canvas ref={canvasRef} className="halftone-portrait__canvas" />
      )}
    </div>
  );
}
