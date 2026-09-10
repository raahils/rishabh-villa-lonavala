import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_sleek_poster(photo_filename, output_name, title_override="R I S H A B H   V I L L A"):
    photo_path = f'/Users/raahilshah/Desktop/lonavala/public/photos/{photo_filename}'
    if not os.path.exists(photo_path):
        print(f"Error: Photo not found {photo_path}")
        return

    CANVAS_W, CANVAS_H = 1080, 1080
    photo = Image.open(photo_path).convert("RGBA")

    # Center Crop to 1080x1080
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

    # Apply subtle cinematic dark gradient overlay
    overlay = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Soft top gradient
    for y in range(240):
        alpha = int(160 * (1 - y / 240.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(6, 9, 14, alpha))

    # Soft bottom gradient
    for y in range(CANVAS_H - 320, CANVAS_H):
        alpha = int(180 * ((y - (CANVAS_H - 320)) / 320.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(6, 9, 14, alpha))

    comp = Image.alpha_composite(photo_cropped, overlay)
    draw = ImageDraw.Draw(comp)

    # 1. Outer Minimalist Dual Gold Frame
    m1 = 30
    m2 = 36
    gold_soft = (212, 175, 55, 230)
    gold_dim = (212, 175, 55, 100)
    
    draw.rectangle([m1, m1, CANVAS_W - m1, CANVAS_H - m1], outline=gold_dim, width=1)
    draw.rectangle([m2, m2, CANVAS_W - m2, CANVAS_H - m2], outline=gold_soft, width=2)

    # 2. Sleek Center Frosted Glass Price Card
    card_w = 720
    card_h = 290
    card_x = (CANVAS_W - card_w) // 2
    card_y = (CANVAS_H - card_h) // 2 + 10

    # Draw Frosted Dark Glass Box with rounded border
    glass = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw_glass = ImageDraw.Draw(glass)
    
    # Semi-transparent sleek dark background
    draw_glass.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=20,
        fill=(10, 13, 20, 215),
        outline=(212, 175, 55, 240),
        width=2
    )

    # Subtle inner gold accent line inside glass box
    draw_glass.rounded_rectangle(
        [card_x + 8, card_y + 8, card_x + card_w - 8, card_y + card_h - 8],
        radius=14,
        outline=(212, 175, 55, 70),
        width=1
    )

    comp = Image.alpha_composite(comp, glass)
    draw = ImageDraw.Draw(comp)

    # Fonts
    try:
        brand_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 34)
        sub_brand_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 20)
        card_sub_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 22)
        price_val_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 62)
        per_night_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 24)
        specs_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 21)
        btn_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 22)
    except:
        brand_font = sub_brand_font = card_sub_font = price_val_font = per_night_font = specs_font = btn_font = ImageFont.load_default()

    # TOP BRANDING
    draw.text((CANVAS_W // 2, 85), title_override, fill=(230, 200, 140), font=brand_font, anchor="mm")
    draw.text((CANVAS_W // 2, 126), "L O N A V A L A   •   6   B H K   V I L L A", fill=(240, 240, 240), font=sub_brand_font, anchor="mm")

    # CENTER CARD CONTENT
    draw.text((CANVAS_W // 2, card_y + 50), "R A T E S   S T A R T I N G   F R O M", fill=(200, 169, 126), font=card_sub_font, anchor="mm")
    draw.text((CANVAS_W // 2, card_y + 135), "₹ 15,000", fill=(255, 215, 0), font=price_val_font, anchor="mm")
    draw.text((CANVAS_W // 2, card_y + 215), "/ N I G H T", fill=(230, 230, 230), font=per_night_font, anchor="mm")

    # BOTTOM SPECS & SLEEK CTA BUTTON
    specs_text = "Private Swimming Pool  •  Plush Lawn  •  100% Pure Veg & Jain Cook"
    draw.text((CANVAS_W // 2, CANVAS_H - 185), specs_text, fill=(215, 215, 215), font=specs_font, anchor="mm")

    # Ultra-Sleek Pill Button
    btn_text = "DIRECT OWNER BOOKING"
    btn_w = 420
    btn_h = 50
    btn_x = (CANVAS_W - btn_w) // 2
    btn_y = CANVAS_H - 130

    btn_layer = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw_btn = ImageDraw.Draw(btn_layer)
    draw_btn.rounded_rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], radius=25, fill=(15, 20, 30, 230), outline=(212, 175, 55, 255), width=2)

    comp = Image.alpha_composite(comp, btn_layer)
    draw = ImageDraw.Draw(comp)
    draw.text((CANVAS_W // 2, btn_y + btn_h // 2), btn_text, fill=(255, 255, 255), font=btn_font, anchor="mm")

    # Save
    final_rgb = comp.convert("RGB")
    
    out_artifact = f"/Users/raahilshah/.gemini/antigravity-ide/brain/d10c73a7-0237-43a5-be39-0e514e1c64c9/{output_name}"
    out_public = f"/Users/raahilshah/Desktop/lonavala/public/{output_name}"

    final_rgb.save(out_artifact)
    final_rgb.save(out_public)
    print(f"Generated sleek poster: {output_name}")

if __name__ == '__main__':
    # Variant 1: Illuminated Night Pool
    create_sleek_poster("PHOTO-2026-09-09-15-37-55 2.jpg", "sleek_rates_15k_night_pool.png")

    # Variant 2: Twilight Pool Deck & Courtyard
    create_sleek_poster("PHOTO-2026-09-09-15-37-55 6.jpg", "sleek_rates_15k_twilight.png")
