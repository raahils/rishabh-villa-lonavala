import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def build_pool_luxury_post():
    pool_photo_path = '/Users/raahilshah/Desktop/lonavala/public/photos/PHOTO-2026-09-09-15-37-55 12.jpg'
    if not os.path.exists(pool_photo_path):
        print(f"Error: Photo not found at {pool_photo_path}")
        return

    # Canvas Size: Square 1080x1080 Instagram Post
    CANVAS_W, CANVAS_H = 1080, 1080

    # Load original swimming pool photo
    photo = Image.open(pool_photo_path).convert("RGBA")
    
    # Scale and center crop to 1080x1080
    w, h = photo.size
    aspect = w / float(h)
    target_aspect = 1.0

    if aspect > target_aspect:
        # Wider than square -> resize height to 1080, crop width
        new_h = 1080
        new_w = int(aspect * new_h)
        photo_resized = photo.resize((new_w, new_h), Image.Resampling.LANCZOS)
        left = (new_w - 1080) // 2
        photo_cropped = photo_resized.crop((left, 0, left + 1080, 1080))
    else:
        # Taller than square -> resize width to 1080, crop height
        new_w = 1080
        new_h = int(new_w / aspect)
        photo_resized = photo.resize((new_w, new_h), Image.Resampling.LANCZOS)
        top = (new_h - 1080) // 2
        photo_cropped = photo_resized.crop((0, top, 1080, top + 1080))

    # Apply dark vignette & gradient overlay for rich contrast and legibility
    overlay = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Top dark gradient (200px)
    for y in range(220):
        alpha = int(170 * (1 - y / 220.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(8, 12, 20, alpha))

    # Bottom dark gradient (340px)
    for y in range(CANVAS_H - 340, CANVAS_H):
        alpha = int(195 * ((y - (CANVAS_H - 340)) / 340.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(8, 12, 20, alpha))

    comp = Image.alpha_composite(photo_cropped, overlay)
    draw = ImageDraw.Draw(comp)

    # Draw Thin Elegant Gold Border Frame (margin = 40px)
    border_margin = 40
    gold_color = (212, 175, 55, 210) # Premium Warm Gold
    draw.rectangle(
        [border_margin, border_margin, CANVAS_W - border_margin, CANVAS_H - border_margin],
        outline=gold_color,
        width=2
    )

    # Load System Fonts
    brand_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 36)
    sub_brand_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 22)
    headline_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 44)
    specs_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 23)
    btn_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 24)

    # 1. TOP BRANDING
    brand_text = "R I S H A B H   V I L L A"
    location_text = "L O N A V A L A"

    draw.text((CANVAS_W // 2, 95), brand_text, fill=(225, 195, 130), font=brand_font, anchor="mm")
    draw.text((CANVAS_W // 2, 140), location_text, fill=(240, 240, 240), font=sub_brand_font, anchor="mm")

    # 2. BOTTOM HEADLINE & SPECS
    headline_text = "YOUR PRIVATE GETAWAY AWAITS"
    specs_text = "Exclusive 6 BHK Villa  •  Private Pool & Lawn  •  100% Pure Veg"

    draw.text((CANVAS_W // 2, CANVAS_H - 240), headline_text, fill=(255, 255, 255), font=headline_font, anchor="mm")
    draw.text((CANVAS_W // 2, CANVAS_H - 180), specs_text, fill=(215, 215, 215), font=specs_font, anchor="mm")

    # 3. ELEGANT CALL TO ACTION BUTTON (NO PHONE NUMBER)
    btn_text = "CONTACT FOR DIRECT BOOKINGS"
    btn_w = 480
    btn_h = 54
    btn_x = (CANVAS_W - btn_w) // 2
    btn_y = CANVAS_H - 125

    # Draw semi-transparent dark gold button with solid gold outline
    draw.rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], fill=(15, 20, 30, 220), outline=(212, 175, 55), width=2)
    draw.text((CANVAS_W // 2, btn_y + btn_h // 2), btn_text, fill=(255, 255, 255), font=btn_font, anchor="mm")

    # Convert to RGB and save
    final_rgb = comp.convert("RGB")

    out_artifact = "/Users/raahilshah/.gemini/antigravity-ide/brain/39e75e52-b9b8-4759-92c0-071bdbe0419c/pool_luxury_first_style.png"
    out_public = "/Users/raahilshah/Desktop/lonavala/public/pool_luxury_first_style.png"

    final_rgb.save(out_artifact)
    final_rgb.save(out_public)

    print("Success! Generated luxury post matching original text layout on pool photo:")
    print(f"- {out_artifact}")
    print(f"- {out_public}")

if __name__ == '__main__':
    build_pool_luxury_post()
