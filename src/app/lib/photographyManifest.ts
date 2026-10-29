import amsterdamCanal from "../../assets/photography/amsterdam-canal.jpg";
import amsterdam750 from "../../assets/photography/amsterdam-750.jpg";
import amsterdamBicycles from "../../assets/photography/amsterdam-bicycles.jpg";
import amsterdamFacade from "../../assets/photography/amsterdam-facade.jpg";
import amsterdamTrees from "../../assets/photography/amsterdam-trees.jpg";
import amsterdamWaterfront from "../../assets/photography/amsterdam-waterfront.jpg";
import archedShops from "../../assets/photography/arched-shops.jpg";
import beachSwimmers from "../../assets/photography/beach-swimmers.jpg";
import bikeRentalSign from "../../assets/photography/bike-rental-sign.jpg";
import rotterdamLyceum from "../../assets/photography/rotterdam-lyceum.jpg";

import thumbAmsterdamCanal from "../../assets/photography/thumbs/amsterdam-canal.jpg";
import thumbAmsterdam750 from "../../assets/photography/thumbs/amsterdam-750.jpg";
import thumbAmsterdamBicycles from "../../assets/photography/thumbs/amsterdam-bicycles.jpg";
import thumbAmsterdamFacade from "../../assets/photography/thumbs/amsterdam-facade.jpg";
import thumbAmsterdamTrees from "../../assets/photography/thumbs/amsterdam-trees.jpg";
import thumbAmsterdamWaterfront from "../../assets/photography/thumbs/amsterdam-waterfront.jpg";
import thumbArchedShops from "../../assets/photography/thumbs/arched-shops.jpg";
import thumbBeachSwimmers from "../../assets/photography/thumbs/beach-swimmers.jpg";
import thumbBikeRentalSign from "../../assets/photography/thumbs/bike-rental-sign.jpg";
import thumbRotterdamLyceum from "../../assets/photography/thumbs/rotterdam-lyceum.jpg";

export type Photo = {
  id: string;
  src: string;
  thumbSrc: string;
  alt: string;
  caption: string;
  medium: "Analog" | "Digital";
  /** ILFORD stock for film; iPhone model + exposure for digital */
  technical: string;
};

const HP5 = "ILFORD HP5 Plus · ISO 400";
const DELTA = "ILFORD Delta 400 Professional · ISO 400";

/** Curated analog-first set — no family/stranger portraits in frame */
export const photos: Photo[] = [
  {
    id: "amsterdam-canal",
    src: amsterdamCanal,
    thumbSrc: thumbAmsterdamCanal,
    alt: "Tour boat on an Amsterdam canal in bright sunlight, film grain",
    caption: "Amsterdam",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "amsterdam-750",
    src: amsterdam750,
    thumbSrc: thumbAmsterdam750,
    alt: "Amsterdam 750 celebration banners on a circular building beside the water",
    caption: "Amsterdam",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "amsterdam-facade",
    src: amsterdamFacade,
    thumbSrc: thumbAmsterdamFacade,
    alt: "Amsterdam canal house facades and gables, analog film grain",
    caption: "Amsterdam — facades",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "amsterdam-waterfront",
    src: amsterdamWaterfront,
    thumbSrc: thumbAmsterdamWaterfront,
    alt: "Amsterdam waterfront and boats, washed film tones",
    caption: "Amsterdam — waterfront",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "amsterdam-trees",
    src: amsterdamTrees,
    thumbSrc: thumbAmsterdamTrees,
    alt: "Trees and canal edge in Amsterdam, soft analog focus",
    caption: "Amsterdam — canal edge",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "arched-shops",
    src: archedShops,
    thumbSrc: thumbArchedShops,
    alt: "Stone arch shopfronts with outdoor seating and film texture",
    caption: "Arched shopfronts",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "rotterdam-lyceum",
    src: rotterdamLyceum,
    thumbSrc: thumbRotterdamLyceum,
    alt: "Grafisch Lyceum Rotterdam building, grainy film look",
    caption: "Rotterdam",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "beach-swimmers",
    src: beachSwimmers,
    thumbSrc: thumbBeachSwimmers,
    alt: "Beach with swimmers in the distance, washed film colors",
    caption: "Shoreline",
    medium: "Analog",
    technical: DELTA,
  },
  {
    id: "amsterdam-bicycles",
    src: amsterdamBicycles,
    thumbSrc: thumbAmsterdamBicycles,
    alt: "Museumplein with Van Gogh Museum and Concertgebouw in the distance, film grain",
    caption: "Amsterdam — Museumplein",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "bike-rental-sign",
    src: bikeRentalSign,
    thumbSrc: thumbBikeRentalSign,
    alt: "Bike rental and ATM sign with street stickers",
    caption: "Street signage",
    medium: "Digital",
    technical: "iPhone 15 Pro · Daylight · hard sun / shadow",
  },
];
