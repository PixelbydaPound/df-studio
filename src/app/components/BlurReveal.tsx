import { useEffect, useRef, useState } from "react";
import { blurRevealFilter } from "../lib/motionPresets";
import { useReducedMotion } from "../lib/useReducedMotion";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function BlurReveal({ children, className = "" }: BlurRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [blurAmount, setBlurAmount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setBlurAmount(0);
      return;
    }

    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate position relative to viewport
      // When element is at bottom of viewport: blur = max
      // When element is in center: blur = 0
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate distance from center (normalized)
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      const maxDistance = windowHeight / 2;
      
      // Calculate blur amount (0 to 0.5px for very subtle effect)
      let blur = (distanceFromCenter / maxDistance) * 0.5;
      
      // Only apply blur when element is below center
      if (elementCenter > viewportCenter) {
        blur = Math.min(blur, 0.5);
      } else {
        blur = 0;
      }
      
      // Clamp blur value
      blur = Math.max(0, Math.min(0.5, blur));
      
      setBlurAmount(blur);
    };

    // Initial check
    handleScroll();
    
    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  const filter = blurRevealFilter(reducedMotion, blurAmount);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        filter,
        transition: reducedMotion ? undefined : "filter 0.3s cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    >
      {children}
    </div>
  );
}
