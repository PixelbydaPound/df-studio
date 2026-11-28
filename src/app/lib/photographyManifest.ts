import entries from "../../data/photography-entries.json";

export type Photo = {
  id: string;
  city: string;
  place: string;
  src: string;
  thumbSrc: string;
  alt: string;
  caption: string;
  medium: "Analog" | "Digital";
  /** ILFORD color stock for film; device color profile for digital */
  technical: string;
  cityIndex: number;
  cityTotal: number;
};

/** Carousel group order — each `city` in entries should appear here */
export const PHOTO_CITY_ORDER = [
  "Berlin",
  "Hoofddorp",
  "Amsterdam",
  "The Hague",
  "Rotterdam",
  "Vatican City",
  "Rome",
  "Barcelona",
  "London",
] as const;

const ILFORD_COLOR =
  "ILFORD XP2 Super 400 · C41 color · warm grain, lifted mids";
const IPHONE_COLOR =
  "iPhone 15 Pro · auto color · daylight white balance";

type Entry = {
  id: string;
  city: string;
  place: string;
  file: string;
  digital?: boolean;
};

function assetUrl(file: string) {
  return new URL(`../../assets/photography/${file}`, import.meta.url).href;
}

function thumbUrl(file: string) {
  return new URL(`../../assets/photography/thumbs/${file}`, import.meta.url).href;
}

function sortEntries(list: Entry[]): Entry[] {
  const cityRank = new Map(
    PHOTO_CITY_ORDER.map((city, index) => [city, index]),
  );
  const fileOrder = new Map(list.map((row, index) => [row.id, index]));
  return [...list].sort((a, b) => {
    const ra = cityRank.get(a.city as (typeof PHOTO_CITY_ORDER)[number]) ?? 99;
    const rb = cityRank.get(b.city as (typeof PHOTO_CITY_ORDER)[number]) ?? 99;
    if (ra !== rb) return ra - rb;
    return (fileOrder.get(a.id) ?? 0) - (fileOrder.get(b.id) ?? 0);
  });
}

const sorted = sortEntries(entries as Entry[]);

const cityTotals = sorted.reduce<Record<string, number>>((acc, row) => {
  acc[row.city] = (acc[row.city] ?? 0) + 1;
  return acc;
}, {});

const citySeen: Record<string, number> = {};

export const photos: Photo[] = sorted.map((row) => {
  citySeen[row.city] = (citySeen[row.city] ?? 0) + 1;
  const cityIndex = citySeen[row.city];
  const medium: Photo["medium"] = row.digital ? "Digital" : "Analog";
  const technical = row.digital ? IPHONE_COLOR : ILFORD_COLOR;
  const caption = row.place;

  return {
    id: row.id,
    city: row.city,
    place: row.place,
    src: assetUrl(row.file),
    thumbSrc: thumbUrl(row.file),
    alt: caption,
    caption,
    medium,
    technical,
    cityIndex,
    cityTotal: cityTotals[row.city] ?? 1,
  };
});