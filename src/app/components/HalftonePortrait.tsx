import { useEffect, useRef, useState } from "react";
import portraitImage from "figma:asset/a96981bb6877cda98199de6acc8b2114d354d90a.png";

const SIZE = 120;
const DOT_SPACING = 3;
const INFLUENCE_RADIUS = 40;
const PUSH_STRENGTH = 3.2;
const SPRING = 0.14;
const DAMPING = 0.8;

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
      if (density < 0.12) continue;

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

export function HalftonePortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -999, y: -999, active: false });
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef<number>(0);
  const [ready, setReady] = useState(false);
  const [staticFallback, setStaticFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStaticFallback(true);
      return;
    }

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

      offCtx.drawImage(img, 0, 0, pixelSize, pixelSize);

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
      setReady(true);
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
      updatePointer(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -999, y: -999, active: false };
    };

    const tick = () => {
      if (disposed) return;

      const dots = dotsRef.current;
      const pointer = pointerRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.save();
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, SIZE, SIZE);

      for (const dot of dots) {
        if (pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < INFLUENCE_RADIUS && dist > 0.001) {
            const force = (1 - dist / INFLUENCE_RADIUS) ** 2 * PUSH_STRENGTH;
            dot.vx += (dx / dist) * force;
            dot.vy += (dy / dist) * force;
          }
        }

        dot.vx += (dot.baseX - dot.x) * SPRING;
        dot.vy += (dot.baseY - dot.y) * SPRING;
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      frameRef.current = requestAnimationFrame(tick);
    };

    img.onload = init;
    img.onerror = fail;
    img.src = portraitImage;

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointerdown", onPointerMove);

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointerdown", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Daniel"
      style={{
        position: "relative",
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        cursor: "pointer",
        touchAction: "none",
        verticalAlign: "middle",
        display: "inline-block",
      }}
    >
      {!ready && !staticFallback && (
        <img
          src={portraitImage}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      )}
      {staticFallback ? (
        <img
          src={portraitImage}
          alt=""
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
      )}
    </div>
  );
}
