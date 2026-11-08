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

  /** Pointer drag → horizontal scroll (grab hand); suppress click if user dragged */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || length <= 1) return;

    let pointerId: number | null = null;
    let startX = 0;
    let startScroll = 0;
    let didDrag = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      didDrag = false;
      el.classList.add("is-grabbing");
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      const delta = e.clientX - startX;
      if (Math.abs(delta) > 4) didDrag = true;
      el.scrollLeft = startScroll - delta;
    };

    const endDrag = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      el.classList.remove("is-grabbing");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      pointerId = null;
    };

    const onClickCapture = (e: MouseEvent) => {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
        didDrag = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
      el.classList.remove("is-grabbing");
    };
  }, [length]);

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
            <p className="sr-only">
              Drag with pointer or scroll horizontally to browse; open a slide to view full size.
            </p>
            {/* Full-bleed scroll track so peeks match reference sites */}
            <div className="-mx-6 md:-mx-12">
              <div
                ref={scrollerRef}
                tabIndex={0}
                className="photography-gallery-scroller flex items-end gap-4 md:gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory
                  scroll-smooth overscroll-x-contain touch-pan-x
                  pl-[max(1.5rem,calc(50vw-min(70vw,20rem)/2))]
                  pr-[max(1.5rem,calc(50vw-min(70vw,20rem)/2))]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--story-bg,#f8f8f7)]"
                style={{
                  scrollBehavior: reducedMotion ? "auto" : undefined,
                }}
              >
                {photos.map((photo, index) => {
                  const stagger =
                    index % 3 === 0
                      ? "w-[min(72vw,18.5rem)] md:w-[min(34vw,17.5rem)] aspect-[3/4]"
                      : index % 3 === 1
                        ? "w-[min(76vw,20rem)] md:w-[min(36vw,19rem)] aspect-[4/5] md:mb-6"
                        : "w-[min(68vw,16.5rem)] md:w-[min(30vw,16rem)] aspect-[5/7] md:mb-3";

                  return (
                    <article
                      key={photo.id}
                      ref={(el) => {
                        slideRefs.current[index] = el;
                      }}
                      data-snap-index={index}
                      className={`photography-gallery-card relative snap-center shrink-0 overflow-hidden rounded-2xl md:rounded-3xl ${stagger}`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentIndex(index);
                          setLightboxOpen(true);
                        }}
                        className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] focus-visible:ring-inset"
                        aria-label={`View full size: ${photo.caption}`}
                      >
                        {!loadedIds[photo.id] && (
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-[#f8f8f7]/80 z-[1]"
                            aria-hidden
                          >
                            <div className="h-10 w-10 rounded-full border-2 border-neutral-200 border-t-[#EB5097] animate-spin" />
                          </div>
                        )}
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          decoding="async"
                          fetchPriority={index === 0 ? "high" : "auto"}
                          loading={index < 3 ? "eager" : "lazy"}
                          onLoad={() => markLoaded(photo.id)}
                          onError={() => markLoaded(photo.id)}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 px-1" aria-live="polite">
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
