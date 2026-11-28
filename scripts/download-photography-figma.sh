#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/src/assets/photography"
THUMBS="$ROOT/src/assets/photography/thumbs"
CATALOG="$ROOT/scripts/photography-figma-assets.json"
mkdir -p "$ASSETS" "$THUMBS"

node -e "
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('$CATALOG', 'utf8'));
for (const item of items) {
  console.log(item.url + '\t' + item.file);
}
" | while IFS=$'\t' read -r url file; do
  tmp="$ASSETS/.tmp-${file}"
  out="$ASSETS/$file"
  thumb="$THUMBS/$file"
  echo "Downloading $file …"
  curl -fsSL "$url" -o "$tmp"
  # Convert to JPEG, max 2200px edge, quality ~85
  sips -s format jpeg -s formatOptions 85 -Z 2200 "$tmp" --out "$out" >/dev/null
  cp "$out" "$thumb"
  sips -Z 560 "$thumb" >/dev/null
  rm -f "$tmp"
done

echo "Done: $(ls "$ASSETS"/*.jpg 2>/dev/null | wc -l | tr -d ' ') photos"