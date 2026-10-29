import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { useReducedMotion } from "../lib/useReducedMotion";
import { photos } from "../lib/photographyManifest";

export function Photography() {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const current = photos[currentIndex];

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + photos.length) % photos.length);
  }, []);

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const active = strip.querySelector<HTMLButtonElement>(`[data-index="${currentIndex}"]`);
    active?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentIndex, reducedMotion]);

  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="pt-8 mt-23 px-6 md:px-12 font-portfolio pb-20" id="photography">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Photography<span className="text-[#EB5097]">.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-3">
            Reminiscence — memories in analog and digital light.
          </p>
          <p className="text-base text-white/50 max-w-2xl mb-12">
            Not assignment work: places, weather, and scenes I didn&apos;t want to forget. Grain,
            flare, and soft focus are part of the memory—not mistakes.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="relative"
            aria-roledescription="carousel"
            aria-label="Photography gallery"
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              style={{ height: "min(70vh, 560px)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={reducedMotion ? false : { opacity: 0, x: 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, x: -48 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="w-full h-full flex items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    aria-label={`View full size: ${current.caption}`}
                  >
                    <img
                      src={current.src}
                      alt={current.alt}
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                    />
                  </button>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={goToPrev}
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-colors hover:bg-black/70 hover:border-[#EB5097]/50 z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-colors hover:bg-black/70 hover:border-[#EB5097]/50 z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 px-1">
              <div>
                <p className="text-white text-lg">{current.caption}</p>
                <p className="text-white/50 text-sm mt-1">
                  {currentIndex + 1} / {photos.length}
                  <span className="mx-2 text-white/30" aria-hidden>
                    ·
                  </span>
                  <span className="uppercase tracking-wide text-xs">{current.medium}</span>
                </p>
              </div>
              <p className="text-white/40 text-sm">Click image to enlarge</p>
            </div>

            <div
              ref={thumbStripRef}
              className="mt-6 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin"
              aria-label="All photos"
            >
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  data-index={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 snap-center rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] ${
                    index === currentIndex
                      ? "border-[#EB5097] opacity-100 scale-105"
                      : "border-white/10 opacity-60 hover:opacity-90"
                  }`}
                  aria-label={`Go to photo ${index + 1}: ${photo.caption}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                >
                  <img
                    src={photo.src}
                    alt=""
                    loading="lazy"
                    className="w-16 h-16 md:w-20 md:h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="sm:max-w-5xl bg-black border-white/15 p-0 overflow-hidden gap-0">
          <DialogTitle className="sr-only">{current.caption}</DialogTitle>
          <DialogDescription className="sr-only">{current.alt}</DialogDescription>
          <img
            src={current.src}
            alt={current.alt}
            className="w-full h-auto max-h-[80vh] object-contain bg-black"
          />
          <div className="px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <p className="text-white text-sm">{current.caption}</p>
            <p className="text-white/50 text-xs uppercase tracking-wide">{current.medium}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
