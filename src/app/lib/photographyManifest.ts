import amsterdamCanal from "../../assets/photography/amsterdam-canal.jpg";
import amsterdam750 from "../../assets/photography/amsterdam-750.jpg";
import amsterdamBicycles from "../../assets/photography/amsterdam-bicycles.jpg";
import amsterdamFacade from "../../assets/photography/amsterdam-facade.jpg";
import amsterdamWaterfront from "../../assets/photography/amsterdam-waterfront.jpg";
import archedShops from "../../assets/photography/arched-shops.jpg";
import barcelonaBarceloneta from "../../assets/photography/barcelona-barceloneta-01.jpg";
import barcelonaBorneLanterns from "../../assets/photography/barcelona-borne-lanterns-01.jpg";
import barcelonaEixample from "../../assets/photography/barcelona-eixample-grid-01.jpg";
import barcelonaGothic from "../../assets/photography/barcelona-gothic-quarter-01.jpg";
import barcelonaMontjuic from "../../assets/photography/barcelona-montjuic-01.jpg";
import beachSwimmers from "../../assets/photography/beach-swimmers.jpg";
import berlinFriedrichshain from "../../assets/photography/berlin-friedrichshain-01.jpg";
import berlinGrunewald from "../../assets/photography/berlin-grunewald-path-01.jpg";
import berlinKreuzberg from "../../assets/photography/berlin-kreuzberg-cafe-01.jpg";
import berlinMitte from "../../assets/photography/berlin-mitte-evening-01.jpg";
import berlinOberbaum from "../../assets/photography/berlin-oberbaum-01.jpg";
import berlinSpree from "../../assets/photography/berlin-spree-banks-01.jpg";
import bikeRentalSign from "../../assets/photography/bike-rental-sign.jpg";
import rotterdamLyceum from "../../assets/photography/rotterdam-lyceum.jpg";

import thumbAmsterdamCanal from "../../assets/photography/thumbs/amsterdam-canal.jpg";
import thumbAmsterdam750 from "../../assets/photography/thumbs/amsterdam-750.jpg";
import thumbAmsterdamBicycles from "../../assets/photography/thumbs/amsterdam-bicycles.jpg";
import thumbAmsterdamFacade from "../../assets/photography/thumbs/amsterdam-facade.jpg";
import thumbAmsterdamWaterfront from "../../assets/photography/thumbs/amsterdam-waterfront.jpg";
import thumbArchedShops from "../../assets/photography/thumbs/arched-shops.jpg";
import thumbBarcelonaBarceloneta from "../../assets/photography/thumbs/barcelona-barceloneta-01.jpg";
import thumbBarcelonaBorneLanterns from "../../assets/photography/thumbs/barcelona-borne-lanterns-01.jpg";
import thumbBarcelonaEixample from "../../assets/photography/thumbs/barcelona-eixample-grid-01.jpg";
import thumbBarcelonaGothic from "../../assets/photography/thumbs/barcelona-gothic-quarter-01.jpg";
import thumbBarcelonaMontjuic from "../../assets/photography/thumbs/barcelona-montjuic-01.jpg";
import thumbBeachSwimmers from "../../assets/photography/thumbs/beach-swimmers.jpg";
import thumbBerlinFriedrichshain from "../../assets/photography/thumbs/berlin-friedrichshain-01.jpg";
import thumbBerlinGrunewald from "../../assets/photography/thumbs/berlin-grunewald-path-01.jpg";
import thumbBerlinKreuzberg from "../../assets/photography/thumbs/berlin-kreuzberg-cafe-01.jpg";
import thumbBerlinMitte from "../../assets/photography/thumbs/berlin-mitte-evening-01.jpg";
import thumbBerlinOberbaum from "../../assets/photography/thumbs/berlin-oberbaum-01.jpg";
import thumbBerlinSpree from "../../assets/photography/thumbs/berlin-spree-banks-01.jpg";
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

/** Europe-focused set (NL → DE → ES); swap JPEGs in /photography for final scans — filenames stable */
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
    id: "berlin-friedrichshain-01",
    src: berlinFriedrichshain,
    thumbSrc: thumbBerlinFriedrichshain,
    alt: "Berlin evening skyline silhouette with cool blue-hour light and film grain",
    caption: "Berlin — Friedrichshain",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "berlin-oberbaum-01",
    src: berlinOberbaum,
    thumbSrc: thumbBerlinOberbaum,
    alt: "Berlin city blocks at dusk, soft highlights on the river side",
    caption: "Berlin — Oberbaum",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "berlin-mitte-evening-01",
    src: berlinMitte,
    thumbSrc: thumbBerlinMitte,
    alt: "Berlin Mitte street glow and tower hint against a slate sky",
    caption: "Berlin — Mitte",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "berlin-spree-banks-01",
    src: berlinSpree,
    thumbSrc: thumbBerlinSpree,
    alt: "Spree embankment mood, long shadows and grain",
    caption: "Berlin — Spree",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "berlin-kreuzberg-cafe-01",
    src: berlinKreuzberg,
    thumbSrc: thumbBerlinKreuzberg,
    alt: "Kreuzberg evening, warm stray light on facades",
    caption: "Berlin — Kreuzberg",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "berlin-grunewald-path-01",
    src: berlinGrunewald,
    thumbSrc: thumbBerlinGrunewald,
    alt: "Grunewald path at low light, deep greens and grain",
    caption: "Berlin — Grunewald",
    medium: "Analog",
    technical: DELTA,
  },
  {
    id: "barcelona-gothic-quarter-01",
    src: barcelonaGothic,
    thumbSrc: thumbBarcelonaGothic,
    alt: "Barcelona Gothic Quarter lanes, warm stone and Mediterranean light",
    caption: "Barcelona — Gothic Quarter",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "barcelona-barceloneta-01",
    src: barcelonaBarceloneta,
    thumbSrc: thumbBarcelonaBarceloneta,
    alt: "Barceloneta sea band and rooftops, hazy coastal palette",
    caption: "Barcelona — Barceloneta",
    medium: "Analog",
    technical: DELTA,
  },
  {
    id: "barcelona-eixample-grid-01",
    src: barcelonaEixample,
    thumbSrc: thumbBarcelonaEixample,
    alt: "Eixample rooftops and radial evening glow",
    caption: "Barcelona — Eixample",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "barcelona-montjuic-01",
    src: barcelonaMontjuic,
    thumbSrc: thumbBarcelonaMontjuic,
    alt: "Montjuïc slope light over the city, terracotta and sea",
    caption: "Barcelona — Montjuïc",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "barcelona-borne-lanterns-01",
    src: barcelonaBorneLanterns,
    thumbSrc: thumbBarcelonaBorneLanterns,
    alt: "El Born lanes at dusk, lantern warmth",
    caption: "Barcelona — El Born",
    medium: "Analog",
    technical: DELTA,
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
