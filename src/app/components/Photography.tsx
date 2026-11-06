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

function preloadImage(src: string) {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
}

function neighborIndices(index: number, length: number): number[] {
  if (length === 0) return [];
  const prev = (index - 1 + length) % length;
  const next = (index + 1) % length;
  return [index, prev, next];
}

/** Collins-style row: side panels peek prev/next; center is the hero */
export function Photography() {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slideReady, setSlideReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const centerImgRef = useRef<HTMLImageElement>(null);

  const length = photos.length;
  const current = length ? photos[currentIndex] : null;
  const prevPhoto = length ? photos[(currentIndex - 1 + length) % length] : null;
  const nextPhoto = length ? photos[(currentIndex + 1) % length] : null;

  const goToSlide = useCallback((index: number) => {
    setSlideReady(false);
    setCurrentIndex((index + length) % length);
  }, [length]);

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    setCurrentIndex((prev) => (length ? prev % length : 0));
  }, [length]);

  useEffect(() => {
    if (!current) return;
    setSlideReady(false);
    for (const i of neighborIndices(currentIndex, length)) {
      preloadImage(photos[i].src);
    }
    const img = centerImgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setSlideReady(true);
    }
  }, [currentIndex, current?.id, length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        for (const i of neighborIndices(0, length)) {
          preloadImage(photos[i].src);
        }
        observer.disconnect();
      },
      { rootMargin: "240px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen || length <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToPrev, goToNext, lightboxOpen, length]);

  if (length === 0 || !current) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="pt-8 mt-23 px-6 md:px-12 font-portfolio pb-20"
      id="photography"
    >
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
            flare, and soft focus.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="relative"
            aria-roledescription="carousel"
            aria-label="Photography gallery"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-3 md:justify-center min-h-[min(52vh,420px)] md:min-h-[min(60vh,480px)]">
              {/* Previous peek */}
              <button
                type="button"
                onClick={goToPrev}
                className="relative order-2 md:order-1 min-h-[140px] md:min-h-0 md:w-[22%] md:max-w-[200px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-transform hover:scale-[1.02] active:scale-[0.99]"
                aria-label={`Previous: ${prevPhoto?.caption}`}
              >
                {prevPhoto && (
                  <img
                    src={prevPhoto.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                )}
                <span className="absolute bottom-2 left-2 right-2 text-left text-[10px] md:text-xs text-white/50 uppercase tracking-wide">
                  Previous
                </span>
              </button>

              {/* Center hero */}
              <div className="relative order-1 md:order-2 flex-1 md:w-[56%] min-h-[min(48vh,380px)] md:min-h-0 rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
                {!slideReady && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/30 z-[1]"
                    aria-hidden
                  >
                    <div className="h-12 w-12 rounded-full border-2 border-white/15 border-t-[#EB5097]/80 animate-spin" />
                  </div>
                )}

                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: slideReady ? 1 : 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" }}
                    className="flex-1 flex items-center justify-center p-3 md:p-6 min-h-0"
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="w-full h-full min-h-[200px] md:min-h-[280px] flex items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      aria-label={`View full size: ${current.caption}`}
                    >
                      <img
                        ref={centerImgRef}
                        src={current.src}
                        alt={current.alt}
                        decoding="async"
                        fetchPriority={currentIndex === 0 ? "high" : "auto"}
                        onLoad={() => setSlideReady(true)}
                        className="max-w-full max-h-[min(48vh,420px)] w-auto h-auto object-contain rounded-lg"
                      />
                    </button>
                  </motion.div>
                </AnimatePresence>

                <div className="border-t border-white/10 px-4 py-3 md:py-3.5 flex items-center justify-between gap-2 bg-black/20">
                  <p className="text-white/60 text-xs md:text-sm truncate">View full size</p>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="text-white/80 text-xs md:text-sm font-medium shrink-0 hover:text-[#EB5097] transition-colors"
                  >
                    Open
                  </button>
                </div>

                <button
                  type="button"
                  onClick={goToPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-[2] w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-colors hover:bg-black/70 hover:border-[#EB5097]/50 md:left-3"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-[2] w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-colors hover:bg-black/70 hover:border-[#EB5097]/50 md:right-3"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Next peek */}
              <button
                type="button"
                onClick={goToNext}
                className="relative order-3 min-h-[140px] md:min-h-0 md:w-[22%] md:max-w-[200px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-transform hover:scale-[1.02] active:scale-[0.99]"
                aria-label={`Next: ${nextPhoto?.caption}`}
              >
                {nextPhoto && (
                  <img
                    src={nextPhoto.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                )}
                <span className="absolute bottom-2 left-2 right-2 text-left text-[10px] md:text-xs text-white/50 uppercase tracking-wide">
                  Next
                </span>
              </button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 px-1">
              <div>
                <p className="text-white text-lg">{current.caption}</p>
                <p className="text-[#EB5097]/90 text-sm mt-1">{current.technical}</p>
                <p className="text-white/50 text-sm mt-1">
                  {currentIndex + 1} / {length}
                  <span className="mx-2 text-white/30" aria-hidden>
                    ·
                  </span>
                  <span className="uppercase tracking-wide text-xs">{current.medium}</span>
                </p>
              </div>
              <p className="text-white/40 text-sm">Click center image or Open</p>
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
            decoding="async"
            className="w-full h-auto max-h-[80vh] object-contain bg-black"
          />
          <div className="px-6 py-4 border-t border-white/10 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-white text-sm">{current.caption}</p>
              <p className="text-[#EB5097]/90 text-xs mt-0.5">{current.technical}</p>
            </div>
            <p className="text-white/50 text-xs uppercase tracking-wide">{current.medium}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
