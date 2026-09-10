import os
from PIL import Image, ImageDraw, ImageFont

def build_lounge_poster(photo_filename, output_name):
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

    # Soft, ultra-subtle gradient overlay at top and bottom (no heavy dark blocks)
    overlay = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Top gradient (180px)
    for y in range(180):
        alpha = int(140 * (1 - y / 180.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(6, 10, 18, alpha))

    # Bottom gradient (260px)
    for y in range(CANVAS_H - 260, CANVAS_H):
        alpha = int(160 * ((y - (CANVAS_H - 260)) / 260.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(6, 10, 18, alpha))

    comp = Image.alpha_composite(photo_cropped, overlay)
    draw = ImageDraw.Draw(comp)

    # Thin Elegant Golden Border Frame (margin = 40px)
    border_margin = 40
    gold_color = (212, 175, 55, 230)
    draw.rectangle(
        [border_margin, border_margin, CANVAS_W - border_margin, CANVAS_H - border_margin],
        outline=gold_color,
        width=2
    )

    # Fonts
    font_brand = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 36)
    font_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 22)
    font_headline = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 44)
    font_cta = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 20)

    # 1. TOP BRANDING
    brand_text = "R I S H A B H   V I L L A"
    location_text = "L O N A V A L A"

    draw.text((CANVAS_W // 2, 95), brand_text, fill=(225, 195, 130), font=font_brand, anchor="mm")
    draw.text((CANVAS_W // 2, 140), location_text, fill=(240, 240, 240), font=font_sub, anchor="mm")

    # 2. BOTTOM HEADLINE
    headline_text = "YOUR PRIVATE GETAWAY AWAITS"
    draw.text((CANVAS_W // 2, CANVAS_H - 180), headline_text, fill=(255, 255, 255), font=font_headline, anchor="mm")

    # 3. ELEGANT CTA STYLING (NO BLACK BOX)
    # Styled with delicate gold side accent rules and glowing gold text!
    cta_text = "C O N T A C T   F O R   D I R E C T   B O O K I N G S"
    tb_cta = draw.textbbox((0, 0), cta_text, font=font_cta)
    cta_w = tb_cta[2] - tb_cta[0]

    cta_y = CANVAS_H - 110
    rule_margin = 60

    # Delicate gold accent lines on left and right
    draw.line([(rule_margin, cta_y), ((CANVAS_W - cta_w) // 2 - 25, cta_y)], fill=gold_color, width=1)
    draw.line([((CANVAS_W + cta_w) // 2 + 25, cta_y), (CANVAS_W - rule_margin, cta_y)], fill=gold_color, width=1)

    # Draw text cleanly with warm gold color
    draw.text((CANVAS_W // 2, cta_y), cta_text, fill=(235, 205, 135), font=font_cta, anchor="mm")

    final_rgb = comp.convert("RGB")

    out_artifact = f"/Users/raahilshah/.gemini/antigravity-ide/brain/39e75e52-b9b8-4759-92c0-071bdbe0419c/{output_name}"
    out_public = f"/Users/raahilshah/Desktop/lonavala/public/{output_name}"

    final_rgb.save(out_artifact)
    final_rgb.save(out_public)
    print(f"Generated poster without black box: {output_name}")

def main():
    # 35.jpg: Pool deck with 2 lounge chairs at dusk
    build_lounge_poster("PHOTO-2026-09-09-15-37-55 35.jpg", "poster_lounge_chairs_pool.png")
    # 13.jpg: Living pavilion lounge chairs
    build_lounge_poster("PHOTO-2026-09-09-15-37-55 13.jpg", "poster_lounge_chairs_living.png")
    # 21.jpg: Outdoor patio lounge chairs
    build_lounge_poster("PHOTO-2026-09-09-15-37-55 21.jpg", "poster_lounge_chairs_patio.png")

if __name__ == "__main__":
    main()
