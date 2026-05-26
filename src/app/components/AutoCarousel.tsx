import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AutoCarouselProps {
  images: { src: string; alt: string }[];
  autoplaySpeed?: number;
  height?: string;
}

export function AutoCarousel({ images, autoplaySpeed = 3000, height = "600px" }: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoplaySpeed);

    return () => clearInterval(timer);
  }, [images.length, autoplaySpeed]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* Carousel Content */}
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ height }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <div className="bg-white p-6 rounded-2xl flex items-center justify-center h-full">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: index === currentIndex ? "#EB5097" : "rgba(255, 255, 255, 0.3)",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
