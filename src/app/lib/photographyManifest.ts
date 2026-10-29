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

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  medium: "Analog" | "Digital";
  /** ILFORD stock for film; iPhone model + exposure for digital */
  technical: string;
};

const HP5 = "ILFORD HP5 Plus · ISO 400";
const DELTA = "ILFORD Delta 400 Professional · ISO 400";

/** Original curated travel set — order preserved for carousel */
export const photos: Photo[] = [
  {
    id: "amsterdam-canal",
    src: amsterdamCanal,
    alt: "Tour boat on an Amsterdam canal in bright sunlight, film grain",
    caption: "Amsterdam",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "sounds-of-the-universe",
    src: soundsOfTheUniverse,
    alt: "Sounds of the Universe record shop on a London corner at dusk",
    caption: "London — Soho",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "vatican-square",
    src: vaticanSquare,
    alt: "St. Peter's Square with basilica dome, candid family moment, light leak",
    caption: "Vatican City",
    medium: "Digital",
    technical: "iPhone 15 Pro · Midday sun · backlit haze",
  },
  {
    id: "amsterdam-750",
    src: amsterdam750,
    alt: "Amsterdam 750 celebration banners on a circular building beside the water",
    caption: "Amsterdam",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "reckless-records",
    src: recklessRecords,
    alt: "Reckless Records storefront with orange facade and vinyl signage",
    caption: "London",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "arched-shops",
    src: archedShops,
    alt: "Stone arch shopfronts with outdoor seating and film texture",
    caption: "Arched shopfronts",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "rotterdam-lyceum",
    src: rotterdamLyceum,
    alt: "Grafisch Lyceum Rotterdam building, grainy film look",
    caption: "Rotterdam",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "street-cafe",
    src: streetCafe,
    alt: "European street café with white umbrellas and red tablecloths",
    caption: "Street café",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "beach-swimmers",
    src: beachSwimmers,
    alt: "Beach with swimmers in the distance, washed film colors",
    caption: "Shoreline",
    medium: "Analog",
    technical: DELTA,
  },
  {
    id: "windshield-drive",
    src: windshieldDrive,
    alt: "View through a car windshield on a sunny road, analog light leak",
    caption: "Through the windshield",
    medium: "Analog",
    technical: HP5,
  },
  {
    id: "bike-rental-sign",
    src: bikeRentalSign,
    alt: "Bike rental and ATM sign with street stickers",
    caption: "Street signage",
    medium: "Digital",
    technical: "iPhone 15 Pro · Daylight · hard sun / shadow",
  },
  {
    id: "music-lovers",
    src: musicLovers,
    alt: "Red hashtag musicLovers typography on textured dark background",
    caption: "Digital — #musicLovers",
    medium: "Digital",
    technical: "iPhone 15 Pro · Low light · graphic / type",
  },
];
