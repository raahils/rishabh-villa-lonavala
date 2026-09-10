import os
from PIL import Image, ImageDraw, ImageFont

def build_rates_starting_post():
    # Use full aerial villa & illuminated pool photo
    photo_path = '/Users/raahilshah/Desktop/lonavala/public/photos/PHOTO-2026-09-09-15-37-55 10.jpg'
    if not os.path.exists(photo_path):
        photo_path = '/Users/raahilshah/Desktop/lonavala/public/photos/PHOTO-2026-09-09-15-37-55 2.jpg'

    CANVAS_W, CANVAS_H = 1080, 1080

    # Load photo
    photo = Image.open(photo_path).convert("RGBA")
    
    # Scale and center crop to 1080x1080
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

    # Apply dark vignettes & gradient overlay for high readability
    overlay = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Top dark gradient (250px)
    for y in range(250):
        alpha = int(180 * (1 - y / 250.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(8, 12, 20, alpha))

    # Center dark overlay box for price callout
    draw_ov.rectangle([100, 380, 980, 680], fill=(12, 16, 26, 190))

    # Bottom dark gradient (360px)
    for y in range(CANVAS_H - 360, CANVAS_H):
        alpha = int(210 * ((y - (CANVAS_H - 360)) / 360.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(8, 12, 20, alpha))

    comp = Image.alpha_composite(photo_cropped, overlay)
    draw = ImageDraw.Draw(comp)

    # Outer Gold Frame
    border_margin = 36
    gold_color = (212, 175, 55, 220)
    draw.rectangle(
        [border_margin, border_margin, CANVAS_W - border_margin, CANVAS_H - border_margin],
        outline=gold_color,
        width=2
    )

    # Inner Price Box Gold Border
    draw.rectangle(
        [100, 380, 980, 680],
        outline=gold_color,
        width=2
    )

    # Load System Fonts
    try:
        brand_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 36)
        sub_brand_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 22)
        tagline_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 24)
        price_label_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 26)
        price_val_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 64)
        specs_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 22)
        btn_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 24)
    except:
        brand_font = sub_brand_font = tagline_font = price_label_font = price_val_font = specs_font = btn_font = ImageFont.load_default()

    # 1. TOP BRANDING
    brand_text = "R I S H A B H   V I L L A"
    location_text = "L O N A V A L A"

    draw.text((CANVAS_W // 2, 95), brand_text, fill=(225, 195, 130), font=brand_font, anchor="mm")
    draw.text((CANVAS_W // 2, 140), location_text, fill=(240, 240, 240), font=sub_brand_font, anchor="mm")

    # 2. CENTER PROMINENT PRICE BANNER
    draw.text((CANVAS_W // 2, 430), "EXCLUSIVE 6 BHK PRIVATE VILLA", fill=(200, 169, 126), font=tagline_font, anchor="mm")
    draw.text((CANVAS_W // 2, 490), "RATES STARTING FROM", fill=(255, 255, 255), font=price_label_font, anchor="mm")
    draw.text((CANVAS_W // 2, 575), "₹ 15,000 / NIGHT", fill=(255, 215, 0), font=price_val_font, anchor="mm")
    draw.text((CANVAS_W // 2, 640), "*Direct Booking • Zero Brokerage Fees", fill=(200, 200, 200), font=sub_brand_font, anchor="mm")

    # 3. BOTTOM HIGHLIGHTS & CTA
    headline_text = "YOUR PRIVATE LUXURY RETREAT AWAITS"
    specs_text = "Private Swimming Pool  •  Plush Lawn  •  100% Pure Veg & Jain Food"

    draw.text((CANVAS_W // 2, CANVAS_H - 240), headline_text, fill=(255, 255, 255), font=tagline_font, anchor="mm")
    draw.text((CANVAS_W // 2, CANVAS_H - 185), specs_text, fill=(215, 215, 215), font=specs_font, anchor="mm")

    # Call to Action Button
    btn_text = "BOOK DIRECTLY WITH OWNER"
    btn_w = 480
    btn_h = 54
    btn_x = (CANVAS_W - btn_w) // 2
    btn_y = CANVAS_H - 125

    draw.rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], fill=(15, 20, 30, 230), outline=(212, 175, 55), width=2)
    draw.text((CANVAS_W // 2, btn_y + btn_h // 2), btn_text, fill=(255, 255, 255), font=btn_font, anchor="mm")

    # Save output images
    final_rgb = comp.convert("RGB")

    out_artifact = "/Users/raahilshah/.gemini/antigravity-ide/brain/d10c73a7-0237-43a5-be39-0e514e1c64c9/rates_starting_15k_poster.png"
    out_public = "/Users/raahilshah/Desktop/lonavala/public/rates_starting_15k_poster.png"

    final_rgb.save(out_artifact)
    final_rgb.save(out_public)

    print(f"Success! Generated rates starting poster:")
    print(f"Artifact: {out_artifact}")
    print(f"Public: {out_public}")

if __name__ == '__main__':
    build_rates_starting_post()
