#!/usr/bin/env python3
"""
Generate stylized placeholder JPEGs for the photography carousel (Berlin / Barcelona).
Replace these files with real scans when you have them — filenames can stay the same.
"""
from __future__ import annotations

import math
import os
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT_FULL = ROOT / "src/assets/photography"
OUT_THUMB = ROOT / "src/assets/photography/thumbs"
W, H = 1024, 704  # match existing Amsterdam canal aspect (~3:2)


def grain_layer(size: tuple[int, int], intensity: float = 18) -> Image.Image:
    rng = random.Random(42)
    noise = Image.new("L", size, 0)
    px = noise.load()
    for y in range(size[1]):
        for x in range(size[0]):
            px[x, y] = rng.randint(0, 255)
    noise = noise.filter(ImageFilter.GaussianBlur(radius=0.35))
    return ImageOps.autocontrast(noise).point(lambda p: p * intensity / 255)


def add_grain(rgb: Image.Image, amount: float = 0.12) -> Image.Image:
    g = grain_layer(rgb.size, intensity=22)
    g_rgb = Image.merge("RGB", (g, g, g))
    return Image.blend(rgb, g_rgb, amount)


def save_jpeg(img: Image.Image, path: Path, quality: int = 88) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    rgb = img.convert("RGB")
    rgb.save(path, "JPEG", quality=quality, optimize=True)


def thumb(img: Image.Image, max_w: int = 480) -> Image.Image:
    w, h = img.size
    scale = max_w / w
    return img.resize((max_w, int(h * scale)), Image.Resampling.LANCZOS)


def berlin_cool_gradient(draw: ImageDraw.ImageDraw, w: int, h: int) -> None:
    # Moody blue-hour blocks
    for i in range(h):
        t = i / h
        r = int(12 + t * 18)
        g = int(18 + t * 22)
        b = int(35 + t * 45)
        draw.line([(0, i), (w, i)], fill=(r, g, b))


def barcelona_warm_gradient(draw: ImageDraw.ImageDraw, w: int, h: int) -> None:
    for i in range(h):
        t = i / h
        r = int(55 + t * 80)
        g = int(28 + t * 35)
        b = int(18 + t * 25)
        draw.line([(0, i), (w, i)], fill=(r, g, b))


def draw_building_silhouette(
    draw: ImageDraw.ImageDraw,
    base_y: float,
    heights: list[float],
    w: int,
    color: tuple[int, int, int],
) -> None:
    x = 0.0
    gap = 4 + random.random() * 6
    for hi in heights:
        width = 40 + random.random() * 90
        draw.rectangle(
            [x, base_y - hi, x + width, base_y],
            fill=color,
        )
        x += width + gap
        if x > w + 80:
            break


def scene_berlin(idx: int) -> Image.Image:
    random.seed(100 + idx)
    img = Image.new("RGB", (W, H), (15, 18, 28))
    d = ImageDraw.Draw(img)
    berlin_cool_gradient(d, W, H)

    # Horizon haze
    d.rectangle([0, int(H * 0.55), W, H], fill=(25, 32, 48))

    base = H * 0.62 + random.random() * 12
    heights = [H * (0.12 + random.random() * 0.22) for _ in range(14)]
    draw_building_silhouette(d, base, heights, W, (18, 22, 32))

    # TV tower hint (thin spire)
    tx = W * 0.38 + (idx % 3) * 40
    d.polygon(
        [
            (tx, base - H * 0.28),
            (tx + 8, base),
            (tx - 8, base),
        ],
        fill=(210, 215, 225),
    )

    # Tram / street light streaks
    for k in range(5):
        y = int(base + 20 + k * 14)
        d.line([(0, y), (W, y)], fill=(255, 200, 120), width=1)
        d.ellipse([W // 4 + k * 130, y - 4, W // 4 + k * 130 + 3, y + 3], fill=(255, 230, 180))

    img = img.filter(ImageFilter.GaussianBlur(radius=0.4))
    return add_grain(img, 0.14)


def scene_barcelona(idx: int) -> Image.Image:
    random.seed(200 + idx)
    img = Image.new("RGB", (W, H), (40, 22, 14))
    d = ImageDraw.Draw(img)
    barcelona_warm_gradient(d, W, H)

    # Sea band
    d.rectangle([0, int(H * 0.48), W, int(H * 0.58)], fill=(28, 58, 72))

    base = H * 0.58
    # Terraced rooftops
    for t in range(10):
        x0 = t * (W / 9) - 20
        w = 90 + random.random() * 50
        hgt = 35 + random.random() * 55
        d.rectangle(
            [x0, base - hgt, x0 + w, base],
            fill=(180 + t * 3, 72 + t * 2, 48),
        )

    # Grid / sagrada hint — radial burst
    cx, cy = W * 0.55, H * 0.32
    for a in range(0, 180, 8):
        rad = math.radians(a)
        x2 = cx + math.cos(rad) * 120
        y2 = cy + math.sin(rad) * 120
        d.line([(cx, cy), (x2, y2)], fill=(240, 220, 160), width=1)

    img = img.filter(ImageFilter.GaussianBlur(radius=0.35))
    return add_grain(img, 0.13)


def main() -> None:
    specs = [
        # Berlin — 6 frames
        ("berlin-friedrichshain-01", scene_berlin, 0),
        ("berlin-oberbaum-01", scene_berlin, 1),
        ("berlin-mitte-evening-01", scene_berlin, 2),
        ("berlin-spree-banks-01", scene_berlin, 3),
        ("berlin-kreuzberg-cafe-01", scene_berlin, 4),
        ("berlin-grunewald-path-01", scene_berlin, 5),
        # Barcelona — 5 frames
        ("barcelona-gothic-quarter-01", scene_barcelona, 0),
        ("barcelona-barceloneta-01", scene_barcelona, 1),
        ("barcelona-eixample-grid-01", scene_barcelona, 2),
        ("barcelona-montjuic-01", scene_barcelona, 3),
        ("barcelona-borne-lanterns-01", scene_barcelona, 4),
    ]

    for slug, factory, sub in specs:
        base_img = factory(sub)
        full_path = OUT_FULL / f"{slug}.jpg"
        save_jpeg(base_img, full_path)
        save_jpeg(thumb(base_img), OUT_THUMB / f"{slug}.jpg", quality=82)
        print("wrote", full_path.relative_to(ROOT))


if __name__ == "__main__":
    main()
