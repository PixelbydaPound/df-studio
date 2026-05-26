import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import LogoTextLight from "../imports/LogoTextLight";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedNumber({ value, duration = 2, suffix = "", prefix = "" }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function MaiaStats() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-white/5 border border-white/10 rounded-2xl p-12"
        style={{
          background: 'oklch(0.145 0 0)',
          minHeight: '380px'
        }}
      >
        {/* Stats positioned in corners with proper padding */}
        <div className="relative w-full" style={{ height: '280px' }}>
          {/* Top Left - Components */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 flex flex-col items-start"
          >
            <div
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '48px',
                color: '#4a4a4a',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '4px'
              }}
            >
              +<AnimatedNumber value={1000} duration={2.5} />
            </div>
            <div
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                color: '#4a4a4a',
                fontWeight: 400,
              }}
            >
              components
            </div>
          </motion.div>

          {/* Top Right - Libraries */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute top-0 right-0 flex flex-col items-end"
          >
            <div
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '48px',
                color: '#4a4a4a',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '4px'
              }}
            >
              +<AnimatedNumber value={5} duration={2} />
            </div>
            <div
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                color: '#4a4a4a',
                fontWeight: 400,
              }}
            >
              libraries
            </div>
          </motion.div>

          {/* Centered Maia Logo */}
          <div className="absolute" style={{ left: 'calc(50% - 8px)', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <LogoTextLight />
            </motion.div>
          </div>

          {/* Bottom Left - Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 flex items-center gap-2"
          >
            <span 
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '32px',
                fontWeight: 600,
                color: '#4a4a4a'
              }}
            >
              Aa
            </span>
            <div 
              className="rounded-lg border-2 flex items-center justify-center"
              style={{
                width: '32px',
                height: '32px',
                borderColor: '#4a4a4a'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 3L10 17M10 3L14 7M10 3L6 7M10 17L14 13M10 17L6 13" stroke="#4a4a4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span 
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '32px',
                fontWeight: 600,
                color: '#4a4a4a'
              }}
            >
              <AnimatedNumber value={24} duration={2} suffix="px" />
            </span>
          </motion.div>

          {/* Bottom Right - Layers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="absolute bottom-0 right-0 flex flex-col items-end"
          >
            <div
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '48px',
                color: '#4a4a4a',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '4px'
              }}
            >
              <AnimatedNumber value={3} duration={1.5} />
            </div>
            <div
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                color: '#4a4a4a',
                fontWeight: 400,
              }}
            >
              layers
            </div>
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-6 h-6 border-2 border-dashed border-white/10 rounded-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-2 border-dashed border-white/10 rounded-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-dashed border-white/10 rounded-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-dashed border-white/10 rounded-lg pointer-events-none" />
      </motion.div>
    </div>
  );
}
