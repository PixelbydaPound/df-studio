import { useCallback, useEffect, useState } from "react";
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
import amsterdamCanal from "../../assets/photography/amsterdam-canal.jpg";
import amsterdam750 from "../../assets/photography/amsterdam-750.jpg";
import archedShops from "../../assets/photography/arched-shops.jpg";
import beachSwimmers from "../../assets/photography/beach-swimmers.jpg";
import bikeRentalSign from "../../assets/photography/bike-rental-sign.jpg";
import musicLovers from "../../assets/photography/music-lovers.jpg";
import recklessRecords from "../../assets/photography/reckless-records.jpg";
import rotterdamLyceum from "../../assets/photography/rotterdam-lyceum.jpg";
import soundsOfTheUniverse from "../../assets/photography/sounds-of-the-universe.jpg";
import streetCafe from "../../assets/photography/street-cafe.jpg";
import vaticanSquare from "../../assets/photography/vatican-square.jpg";
import windshieldDrive from "../../assets/photography/windshield-drive.jpg";

type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  medium: "Analog" | "Digital";
};

const photos: Photo[] = [
  {
    id: "amsterdam-canal",
    src: amsterdamCanal,
    alt: "Tour boat on an Amsterdam canal in bright sunlight, film grain",
    caption: "Amsterdam",
    medium: "Analog",
  },
  {
    id: "sounds-of-the-universe",
    src: soundsOfTheUniverse,
    alt: "Sounds of the Universe record shop on a London corner at dusk",
    caption: "London — Soho",
    medium: "Analog",
  },
  {
    id: "vatican-square",
    src: vaticanSquare,
    alt: "St. Peter's Square with basilica dome, candid family moment, light leak",
    caption: "Vatican City",
    medium: "Digital",
  },
  {
    id: "amsterdam-750",
    src: amsterdam750,
    alt: "Amsterdam 750 celebration banners on a circular building beside the water",
    caption: "Amsterdam",
    medium: "Analog",
  },
  {
    id: "reckless-records",
    src: recklessRecords,
    alt: "Reckless Records storefront with orange facade and vinyl signage",
    caption: "London",
    medium: "Analog",
  },
  {
    id: "arched-shops",
    src: archedShops,
    alt: "Stone arch shopfronts with outdoor seating and film texture",
    caption: "Arched shopfronts",
    medium: "Analog",
  },
  {
    id: "rotterdam-lyceum",
    src: rotterdamLyceum,
    alt: "Grafisch Lyceum Rotterdam building, grainy film look",
    caption: "Rotterdam",
    medium: "Analog",
  },
  {
    id: "street-cafe",
    src: streetCafe,
    alt: "European street café with white umbrellas and red tablecloths",
    caption: "Street café",
    medium: "Analog",
  },
  {
    id: "beach-swimmers",
    src: beachSwimmers,
    alt: "Beach with swimmers in the distance, washed film colors",
    caption: "Shoreline",
    medium: "Analog",
  },
  {
    id: "windshield-drive",
    src: windshieldDrive,
    alt: "View through a car windshield on a sunny road, analog light leak",
    caption: "Through the windshield",
    medium: "Analog",
  },
  {
    id: "bike-rental-sign",
    src: bikeRentalSign,
    alt: "Bike rental and ATM sign with street stickers",
    caption: "Street signage",
    medium: "Digital",
  },
  {
    id: "music-lovers",
    src: musicLovers,
    alt: "Red hashtag musicLovers typography on textured dark background",
    caption: "Digital — #musicLovers",
    medium: "Digital",
  },
];

export function Photography() {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

            <div className="flex justify-center flex-wrap gap-2 mt-6">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097]"
                  style={{
                    backgroundColor:
                      index === currentIndex ? "#EB5097" : "rgba(255, 255, 255, 0.3)",
                    transform: index === currentIndex ? "scale(1.15)" : "scale(1)",
                  }}
                  aria-label={`Go to photo ${index + 1}: ${photo.caption}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                />
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
