export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  medium: "Analog" | "Digital";
  /** ILFORD stock for film; iPhone model + exposure for digital */
  technical: string;
};

const modules = import.meta.glob<string>("../../assets/photography/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});

/** Omitted from the public carousel (privacy / subject request) */
const EXCLUDED_PHOTO_FILES = new Set([
  "digital-sounds-of-the-universe.jpg",
  "roll-danielf004951-r1-016-6a.jpg",
  "roll-danielf004951-r1-018-7a.jpg",
  "roll-danielf004951-r1-020-8a.jpg",
  "roll-danielf004951-r1-024-10a.jpg",
  "roll-danielf004951-r1-026-11a.jpg",
  "roll-danielf004951-r1-028-12a.jpg",
  "roll-danielf004951-r1-050-23a.jpg",
  "roll-danielf004951-r1-052-24a.jpg",
]);

/** Roll suffix 0 = 950, 1 = 951 — two different Ilford stocks on the Euro trip */
const ILFORD_BY_ROLL: Record<string, string> = {
  "0": "ILFORD HP5 Plus · ISO 400",
  "1": "ILFORD Delta 400 Professional · ISO 400",
};

const ANALOG_PLACE_BY_FILE: Record<string, string> = {
  "roll-danielf004950-r1-032-14a.jpg": "Amsterdam",
  "roll-danielf004950-r1-024-10a.jpg": "Rotterdam",
  "roll-danielf004950-r1-022-9a.jpg": "Arched shopfronts",
  "roll-danielf004951-r1-004-0a.jpg": "Shoreline",
  "roll-danielf004950-r1-046-21a.jpg": "Amsterdam",
};

const digitalMeta: Record<
  string,
  { caption: string; alt: string; technical: string }
> = {
  "digital-windshield-drive.jpg": {
    caption: "Through the windshield",
    alt: "View through a car windshield on a sunny road, light leak",
    technical: "iPhone 15 Pro · Backlit · through glass",
  },
  "digital-bike-rental-sign.jpg": {
    caption: "Street signage",
    alt: "Bike rental and ATM sign with street stickers",
    technical: "iPhone 15 Pro · Daylight · hard sun / shadow",
  },
  "digital-music-lovers.jpg": {
    caption: "Digital — #musicLovers",
    alt: "Red hashtag musicLovers typography on textured dark background",
    technical: "iPhone 15 Pro · Low light · graphic / type",
  },
  "digital-reckless-records.jpg": {
    caption: "London — Reckless Records",
    alt: "Reckless Records storefront with orange facade and vinyl signage",
    technical: "iPhone 15 Pro · Daylight · high contrast",
  },
  "digital-street-cafe.jpg": {
    caption: "Street café",
    alt: "European street café with white umbrellas and red tablecloths",
    technical: "iPhone 15 Pro · Daylight · open shade",
  },
  "digital-vatican-square.jpg": {
    caption: "Vatican City",
    alt: "St. Peter's Square with basilica dome, candid family moment, light leak",
    technical: "iPhone 15 Pro · Midday sun · backlit haze",
  },
};

function sortPhotos(a: string, b: string): number {
  const fileA = a.split("/").pop() ?? "";
  const fileB = b.split("/").pop() ?? "";
  const digitalA = fileA.startsWith("digital-");
  const digitalB = fileB.startsWith("digital-");
  if (digitalA !== digitalB) return digitalA ? 1 : -1;
  return fileA.localeCompare(fileB, undefined, { numeric: true });
}

function metaForFile(filename: string): Omit<Photo, "id" | "src"> {
  const digital = digitalMeta[filename];
  if (digital) {
    return { ...digital, medium: "Digital" };
  }

  const rollMatch = filename.match(/roll-danielf00495(\d)-r1-(\d+)-/i);
  if (rollMatch) {
    const rollKey = rollMatch[1];
    const frame = rollMatch[2];
    const ilford = ILFORD_BY_ROLL[rollKey] ?? "ILFORD · ISO 400";
    const place = ANALOG_PLACE_BY_FILE[filename.toLowerCase()];
    const caption = place ?? `Frame ${frame}`;
    return {
      caption,
      medium: "Analog",
      technical: ilford,
      alt: place
        ? `Analog photograph, ${place}, ${ilford}`
        : `Analog travel photograph, frame ${frame}, ${ilford}`,
    };
  }

  return {
    caption: filename.replace(/\.(jpg|jpeg|JPG)$/i, ""),
    medium: "Analog",
    technical: "ILFORD · ISO 400",
    alt: "Personal analog photograph",
  };
}

export const photos: Photo[] = Object.entries(modules)
  .filter(([path]) => {
    const filename = path.split("/").pop() ?? "";
    return !EXCLUDED_PHOTO_FILES.has(filename);
  })
  .sort(([pathA], [pathB]) => sortPhotos(pathA, pathB))
  .map(([path, src]) => {
    const filename = path.split("/").pop() ?? "photo.jpg";
    const id = filename.replace(/\.(jpg|jpeg|JPG)$/i, "");
    return { id, src, ...metaForFile(filename) };
  });
