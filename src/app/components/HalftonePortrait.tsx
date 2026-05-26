import { useState, useRef, useEffect } from "react";
import portraitImage from "figma:asset/a96981bb6877cda98199de6acc8b2114d354d90a.png";
import stippleImage from "../../imports/dfpixel.png";

export function HalftonePortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stippleRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [revealRadius, setRevealRadius] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const radiusRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animate reveal radius on hover
  useEffect(() => {
    let animationFrameId: number;

    if (isHovering) {
      // Fade in over 180ms
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / 180, 1);
        // ease-out: starts fast, ends slow
        const eased = 1 - Math.pow(1 - progress, 3);
        const newRadius = eased * 80; // 80px reveal radius
        radiusRef.current = newRadius;
        setRevealRadius(newRadius);
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    } else {
      // Fade out over 240ms
      const startRadius = radiusRef.current;
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / 240, 1);
        // ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        const newRadius = startRadius * (1 - eased);
        radiusRef.current = newRadius;
        setRevealRadius(newRadius);
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovering]);

  // Update CSS variables for mask position
  useEffect(() => {
    if (stippleRef.current) {
      stippleRef.current.style.setProperty('--cursor-x', `${cursorPos.x}px`);
      stippleRef.current.style.setProperty('--cursor-y', `${cursorPos.y}px`);
      stippleRef.current.style.setProperty('--reveal-radius', `${revealRadius}px`);
    }
  }, [cursorPos, revealRadius]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "120px",
        height: "120px",
        borderRadius: "72px",
        backgroundColor: "#0A0A0A",
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {/* Bottom layer: Original photo (always visible) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={portraitImage}
          alt="Daniel"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Top layer: Stipple version with mask reveal */}
      <div
        ref={stippleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maskImage: `radial-gradient(
            circle var(--reveal-radius, 0px) at var(--cursor-x, 50%) var(--cursor-y, 50%),
            transparent 0%,
            transparent 40%,
            black 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle var(--reveal-radius, 0px) at var(--cursor-x, 50%) var(--cursor-y, 50%),
            transparent 0%,
            transparent 40%,
            black 100%
          )`,
          willChange: "mask-position",
        }}
      >
        <img
          src={stippleImage}
          alt=""
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
