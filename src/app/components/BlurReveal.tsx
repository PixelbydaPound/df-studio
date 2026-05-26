import { useEffect, useRef, useState } from 'react';

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function BlurReveal({ children, className = '' }: BlurRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [blurAmount, setBlurAmount] = useState(0.5);

  useEffect(() => {
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
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        filter: `blur(${blurAmount}px)`,
        transition: 'filter 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
}
