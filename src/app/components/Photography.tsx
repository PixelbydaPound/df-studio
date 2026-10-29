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

export function Photography() {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slideReady, setSlideReady] = useState(false);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const slideImgRef = useRef<HTMLImageElement>(null);

  const current = photos[currentIndex];

  const scrollThumbIntoStrip = useCallback(
    (index: number) => {
      const strip = thumbStripRef.current;
      if (!strip) return;
      const active = strip.querySelector<HTMLButtonElement>(`[data-index="${index}"]`);
      if (!active) return;
      const target =
        active.offsetLeft - strip.clientWidth / 2 + active.offsetWidth / 2;
      strip.scrollTo({
        left: target,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion],
  );

  const goToSlide = useCallback(
    (index: number, scrollThumb = false) => {
      setSlideReady(false);
      const next = (index + photos.length) % photos.length;
      setCurrentIndex(next);
      if (scrollThumb) {
        scrollThumbIntoStrip(next);
      }
    },
    [scrollThumbIntoStrip],
  );

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    setCurrentIndex((prev) => (photos.length ? prev % photos.length : 0));
  }, [photos.length]);

  useEffect(() => {
    setSlideReady(false);
    for (const i of neighborIndices(currentIndex, photos.length)) {
      preloadImage(photos[i].src);
    }
    const img = slideImgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setSlideReady(true);
    }
  }, [currentIndex, current.id]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || photos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        for (const i of neighborIndices(0, photos.length)) {
          preloadImage(photos[i].src);
        }
        observer.disconnect();
      },
      { rootMargin: "240px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (photos.length === 0) {
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
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              style={{ height: "min(70vh, 560px)" }}
            >
              {!slideReady && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-white/[0.03]"
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
                  className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="w-full h-full flex items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    aria-label={`View full size: ${current.caption}`}
                  >
                    <img
                      ref={slideImgRef}
                      src={current.src}
                      alt={current.alt}
                      decoding="async"
                      fetchPriority={currentIndex === 0 ? "high" : "auto"}
                      onLoad={() => setSlideReady(true)}
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
                <p className="text-[#EB5097]/90 text-sm mt-1">{current.technical}</p>
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
                  onClick={() => goToSlide(index, true)}
                  className={`flex-shrink-0 snap-center rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] ${
                    index === currentIndex
                      ? "border-[#EB5097] opacity-100 scale-105"
                      : "border-white/10 opacity-60 hover:opacity-90"
                  }`}
                  aria-label={`Go to photo ${index + 1}: ${photo.caption}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                >
                  <img
                    src={photo.thumbSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={80}
                    height={80}
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
