import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

/**
 * Collins-style gallery: horizontal scroll-snap, centered active slide with
 * adjacent slides peeking — no arrow controls (scroll / trackpad / touch).
 */
export function Photography() {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loadedIds, setLoadedIds] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const length = photos.length;
  const current = length ? photos[currentIndex] : null;

  const markLoaded = useCallback((id: string) => {
    setLoadedIds((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  /** Cached images often skip onLoad; sync from decode / complete after paint */
  useLayoutEffect(() => {
    if (length === 0) return;

    const syncFromElements = () => {
      slideRefs.current.forEach((el, index) => {
        const photo = photos[index];
        if (!el || !photo) return;
        const img = el.querySelector("img");
        if (!img) return;
        if (img.complete && img.naturalWidth > 0) {
          markLoaded(photo.id);
        }
      });
    };

    syncFromElements();

    let cancelled = false;
    const decodePromises = photos.map((photo, index) => {
      const img = slideRefs.current[index]?.querySelector("img");
      if (!img?.decode) return Promise.resolve();
      return img.decode().catch(() => undefined);
    });

    void Promise.all(decodePromises).then(() => {
      if (!cancelled) syncFromElements();
    });

    return () => {
      cancelled = true;
    };
  }, [length, markLoaded, photos]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = slideRefs.current[index];
      const root = scrollerRef.current;
      if (!el || !root) return;
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    },
    [reducedMotion],
  );

  useEffect(() => {
    setCurrentIndex((prev) => (length ? prev % length : 0));
  }, [length]);

  useEffect(() => {
    if (!length) return;
    for (const i of neighborIndices(currentIndex, length)) {
      preloadImage(photos[i].src);
    }
  }, [currentIndex, length]);

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

  /** Which slide is snapped — largest intersection ratio with scrollport */
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || length <= 1) return;

    const slideEls = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slideEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = 0;
        let bestRatio = 0;
        for (const e of entries) {
          const idx = slideEls.indexOf(e.target as HTMLDivElement);
          if (idx < 0) continue;
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        }
        if (bestRatio > 0.2) {
          setCurrentIndex((prev) => (prev === bestIdx ? prev : bestIdx));
        }
      },
      { root, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    slideEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [length]);

  /** Center first slide on mount (scroll-padding alone doesn’t set initial scrollLeft) */
  useEffect(() => {
    const root = scrollerRef.current;
    const first = slideRefs.current[0];
    if (!root || !first || length === 0) return;
    const target = first.offsetLeft - (root.clientWidth - first.offsetWidth) / 2;
    root.scrollLeft = Math.max(0, target);
  }, [length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen || length <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex((currentIndex - 1 + length) % length);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex((currentIndex + 1) % length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollToIndex, currentIndex, lightboxOpen, length]);

  /** Vertical wheel → horizontal scroll when pointer is over the track (desktop mouse) */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || length <= 1 || lightboxOpen) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const nextLeft = el.scrollLeft + e.deltaY;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= maxScroll - 1;

      if (e.deltaY > 0 && atEnd) return;
      if (e.deltaY < 0 && atStart) return;

      e.preventDefault();
      el.scrollLeft = Math.max(0, Math.min(maxScroll, nextLeft));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [length, lightboxOpen]);

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
          <h2 className="text-4xl md:text-5xl mb-4 text-story">
            Photography<span className="text-[#EB5097]">.</span>
          </h2>
          <p className="text-lg md:text-xl text-story max-w-2xl mb-3 opacity-90">
            Reminiscence — memories in analog and digital light.
          </p>
          <p className="text-base text-story-mid max-w-2xl mb-12">
            Not assignment work: places, weather, and scenes I didn&apos;t want to forget. Grain,
            flare, and soft focus.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="relative"
            aria-roledescription="carousel"
            aria-label="Photography gallery — scroll horizontally to browse"
          >
            {/* Full-bleed scroll track so peeks match reference sites */}
            <div className="-mx-6 md:-mx-12">
              <div
                ref={scrollerRef}
                tabIndex={0}
                className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-3 scrollbar-thin
                  scroll-smooth overscroll-x-contain
                  pl-[max(1.5rem,calc(50vw-min(88vw,42rem)/2))]
                  pr-[max(1.5rem,calc(50vw-min(88vw,42rem)/2))]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--story-bg,#000)] rounded-xl"
                style={{
                  scrollBehavior: reducedMotion ? "auto" : undefined,
                }}
              >
                {photos.map((photo, index) => (
                  <article
                    key={photo.id}
                    ref={(el) => {
                      slideRefs.current[index] = el;
                    }}
                    data-snap-index={index}
                    className="snap-center shrink-0 w-[min(88vw,42rem)] flex flex-col rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)] overflow-hidden"
                  >
                    <div className="relative flex-1 min-h-[min(42vh,320px)] md:min-h-[min(52vh,420px)] flex items-center justify-center p-3 md:p-6 bg-black/20">
                      {!loadedIds[photo.id] && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/25 z-[1]"
                          aria-hidden
                        >
                          <div className="h-12 w-12 rounded-full border-2 border-white/15 border-t-[#EB5097]/80 animate-spin" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentIndex(index);
                          setLightboxOpen(true);
                        }}
                        className="relative z-[2] w-full h-full min-h-[200px] flex items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--story-bg,#000)]"
                        aria-label={`View full size: ${photo.caption}`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          decoding="async"
                          fetchPriority={index === 0 ? "high" : "auto"}
                          loading={index < 3 ? "eager" : "lazy"}
                          onLoad={() => markLoaded(photo.id)}
                          onError={() => markLoaded(photo.id)}
                          className="max-w-full max-h-[min(48vh,400px)] w-auto h-auto object-contain rounded-lg"
                        />
                      </button>
                    </div>
                    <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between gap-2 bg-black/25">
                      <p className="text-white/70 text-xs md:text-sm truncate">View full size</p>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentIndex(index);
                          setLightboxOpen(true);
                        }}
                        className="text-white text-xs md:text-sm font-medium shrink-0 hover:text-[#EB5097] transition-colors"
                      >
                        Open
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 px-1">
              <div>
                <p className="text-story text-lg">{current.caption}</p>
                <p className="text-[#EB5097]/90 text-sm mt-1">{current.technical}</p>
                <p className="text-story-mid text-sm mt-1">
                  {currentIndex + 1} / {length}
                  <span className="mx-2 text-story-soft" aria-hidden>
                    ·
                  </span>
                  <span className="uppercase tracking-wide text-xs">{current.medium}</span>
                </p>
              </div>
              <p className="text-story-mid text-sm">
                Scroll or mouse wheel to browse · tap Open or image to enlarge
              </p>
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
            onLoad={() => markLoaded(current.id)}
            onError={() => markLoaded(current.id)}
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
