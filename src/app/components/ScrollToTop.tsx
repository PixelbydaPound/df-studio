import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
          style={{
            width: '42px',
            height: '42px',
            background: 'rgba(30, 30, 30, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          aria-label="Scroll to top"
        >
          {/* Progress ring with pink accent */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 42 42"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Background circle */}
            <circle
              cx="21"
              cy="21"
              r="19"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="21"
              cy="21"
              r="19"
              stroke="#EB5097"
              strokeWidth="2"
              fill="none"
              strokeDasharray="119.38"
              strokeDashoffset={119.38 - (119.38 * scrollProgress) / 100}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
          </svg>
          
          {/* Chevron Icon */}
          <ChevronUp className="w-4 h-4 text-white relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
