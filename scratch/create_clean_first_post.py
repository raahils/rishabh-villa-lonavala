import os
from PIL import Image, ImageDraw, ImageFont

def build_clean_poster(photo_filename, output_name):
    photo_path = f"/Users/raahilshah/Desktop/lonavala/public/photos/{photo_filename}"
    if not os.path.exists(photo_path):
        print(f"File not found: {photo_path}")
        return

    CANVAS_W, CANVAS_H = 1080, 1080
    photo = Image.open(photo_path).convert("RGBA")

    # Center-crop & scale to 1080x1080 square
    w, h = photo.size
    aspect = w / float(h)

    if aspect > 1.0:
        new_h = 1080
        new_w = int(aspect * new_h)
        photo_resized = photo.resize((new_w, new_h), Image.Resampling.LANCZOS)
        left = (new_w - 1080) // 2
        photo_cropped = photo_resized.crop((left, 0, left + 1080, 1080))
    else:
        new_w = 1080
        new_h = int(new_w / aspect)
        photo_resized = photo.resize((new_w, new_h), Image.Resampling.LANCZOS)
        top = (new_h - 1080) // 2
        photo_cropped = photo_resized.crop((0, top, 1080, top + 1080))

    # Subtle vignette overlay for text legibility
    overlay = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Top dark gradient (210px)
    for y in range(210):
        alpha = int(160 * (1 - y / 210.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(8, 12, 20, alpha))

    # Bottom dark gradient (300px)
    for y in range(CANVAS_H - 300, CANVAS_H):
        alpha = int(185 * ((y - (CANVAS_H - 300)) / 300.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(8, 12, 20, alpha))

    comp = Image.alpha_composite(photo_cropped, overlay)
    draw = ImageDraw.Draw(comp)

    # Thin Elegant Golden Border Frame (margin = 40px)
    border_margin = 40
    gold_color = (212, 175, 55, 220)
    draw.rectangle(
        [border_margin, border_margin, CANVAS_W - border_margin, CANVAS_H - border_margin],
        outline=gold_color,
        width=2
    )

    # Typography Fonts
    font_brand = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 36)
    font_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 22)
    font_headline = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 44)
    font_btn = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 24)

    # 1. TOP BRANDING
    brand_text = "R I S H A B H   V I L L A"
    location_text = "L O N A V A L A"

    draw.text((CANVAS_W // 2, 95), brand_text, fill=(225, 195, 130), font=font_brand, anchor="mm")
    draw.text((CANVAS_W // 2, 140), location_text, fill=(240, 240, 240), font=font_sub, anchor="mm")

    # 2. BOTTOM HEADLINE
    headline_text = "YOUR PRIVATE GETAWAY AWAITS"
    draw.text((CANVAS_W // 2, CANVAS_H - 210), headline_text, fill=(255, 255, 255), font=font_headline, anchor="mm")

    # 3. UNDERNEATH: CONTACT FOR DIRECT BOOKINGS (NO DM, NO URL, NO PHONE NUMBER)
    btn_text = "CONTACT FOR DIRECT BOOKINGS"
    btn_w = 480
    btn_h = 54
    btn_x = (CANVAS_W - btn_w) // 2
    btn_y = CANVAS_H - 135

    # Sleek dark glassmorphism box with gold border
    draw.rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], fill=(12, 16, 26, 220), outline=gold_color, width=2)
    draw.text((CANVAS_W // 2, btn_y + btn_h // 2), btn_text, fill=(255, 255, 255), font=font_btn, anchor="mm")

    final_rgb = comp.convert("RGB")

    out_artifact = f"/Users/raahilshah/.gemini/antigravity-ide/brain/39e75e52-b9b8-4759-92c0-071bdbe0419c/{output_name}"
    out_public = f"/Users/raahilshah/Desktop/lonavala/public/{output_name}"

    final_rgb.save(out_artifact)
    final_rgb.save(out_public)
    print(f"Generated clean poster: {output_name}")

def main():
    # Generate on the two best candidate photos for the first Instagram post
    # Candidate 1: Photo 10 (Full Villa Aerial View - Other Angle)
    build_clean_poster("PHOTO-2026-09-09-15-37-55 10.jpg", "clean_poster_aerial.png")
    # Candidate 2: Photo 12 (Private Swimming Pool & Sun Deck)
    build_clean_poster("PHOTO-2026-09-09-15-37-55 12.jpg", "clean_poster_pool.png")

if __name__ == "__main__":
    main()
