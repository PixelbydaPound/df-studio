import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
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
  const [active, setActive] = useState<Photo | null>(null);

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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <ScrollReveal key={photo.id} delay={Math.min(index * 0.05, 0.4)} className="break-inside-avoid mb-4">
              <button
                type="button"
                onClick={() => setActive(photo)}
                className="group w-full text-left rounded-xl overflow-hidden border border-white/10 bg-white/5 portfolio-card--interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="px-4 py-3 flex items-center justify-between gap-2 border-t border-white/10">
                  <span className="text-sm text-white/70">{photo.caption}</span>
                  <span className="text-xs uppercase tracking-wide text-white/40">{photo.medium}</span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="sm:max-w-4xl bg-black border-white/15 p-0 overflow-hidden gap-0">
          {active && (
            <>
              <DialogTitle className="sr-only">{active.caption}</DialogTitle>
              <DialogDescription className="sr-only">{active.alt}</DialogDescription>
              <img src={active.src} alt={active.alt} className="w-full h-auto max-h-[75vh] object-contain bg-black" />
              <div className="px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <p className="text-white text-sm">{active.caption}</p>
                <p className="text-white/50 text-xs uppercase tracking-wide">{active.medium}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
