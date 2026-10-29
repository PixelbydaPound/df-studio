export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  medium: "Analog" | "Digital";
};

const modules = import.meta.glob<string>("../../assets/photography/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});

const digitalMeta: Record<string, { caption: string; alt: string }> = {
  "digital-windshield-drive.jpg": {
    caption: "Through the windshield",
    alt: "View through a car windshield on a sunny road, analog light leak",
  },
  "digital-bike-rental-sign.jpg": {
    caption: "Street signage",
    alt: "Bike rental and ATM sign with street stickers",
  },
  "digital-music-lovers.jpg": {
    caption: "Digital — #musicLovers",
    alt: "Red hashtag musicLovers typography on textured dark background",
  },
  "digital-reckless-records.jpg": {
    caption: "London — Reckless Records",
    alt: "Reckless Records storefront with orange facade and vinyl signage",
  },
  "digital-sounds-of-the-universe.jpg": {
    caption: "London — Soho",
    alt: "Sounds of the Universe record shop on a London corner at dusk",
  },
  "digital-street-cafe.jpg": {
    caption: "Street café",
    alt: "European street café with white umbrellas and red tablecloths",
  },
  "digital-vatican-square.jpg": {
    caption: "Vatican City",
    alt: "St. Peter's Square with basilica dome, candid family moment, light leak",
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
    const roll = rollMatch[1];
    const frame = rollMatch[2];
    return {
      caption: `Roll 95${roll} · Frame ${frame}`,
      medium: "Analog",
      alt: `Analog travel photograph, roll 95${roll}, frame ${frame}`,
    };
  }

  return {
    caption: filename.replace(/\.(jpg|jpeg|JPG)$/i, ""),
    medium: "Analog",
    alt: "Personal analog photograph",
  };
}

export const photos: Photo[] = Object.entries(modules)
  .sort(([pathA], [pathB]) => sortPhotos(pathA, pathB))
  .map(([path, src]) => {
    const filename = path.split("/").pop() ?? "photo.jpg";
    const id = filename.replace(/\.(jpg|jpeg|JPG)$/i, "");
    return { id, src, ...metaForFile(filename) };
  });
