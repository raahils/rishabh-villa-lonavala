import os
from PIL import Image, ImageDraw, ImageFont

def generate_photo_10_post():
    # Base photo: PHOTO-2026-09-09-15-37-55 10.jpg (Full Villa Aerial View - Other Angle)
    photo_path = '/Users/raahilshah/Desktop/lonavala/public/photos/PHOTO-2026-09-09-15-37-55 10.jpg'
    if not os.path.exists(photo_path):
        print(f"Error: Photo 10 not found at {photo_path}")
        return

    CANVAS_W, CANVAS_H = 1080, 1080
    photo = Image.open(photo_path).convert("RGBA")

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

    overlay = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Gradient overlays
    for y in range(220):
        alpha = int(170 * (1 - y / 220.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(8, 12, 20, alpha))

    for y in range(CANVAS_H - 340, CANVAS_H):
        alpha = int(195 * ((y - (CANVAS_H - 340)) / 340.0))
        draw_ov.line([(0, y), (CANVAS_W, y)], fill=(8, 12, 20, alpha))

    comp = Image.alpha_composite(photo_cropped, overlay)
    draw = ImageDraw.Draw(comp)

    # Gold frame
    border_margin = 40
    gold_color = (212, 175, 55, 210)
    draw.rectangle(
        [border_margin, border_margin, CANVAS_W - border_margin, CANVAS_H - border_margin],
        outline=gold_color,
        width=2
    )

    brand_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 36)
    sub_brand_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 22)
    headline_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 44)
    specs_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 22)
    btn_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 24)

    # Branding
    draw.text((CANVAS_W // 2, 95), "R I S H A B H   V I L L A", fill=(225, 195, 130), font=brand_font, anchor="mm")
    draw.text((CANVAS_W // 2, 140), "L O N A V A L A", fill=(240, 240, 240), font=sub_brand_font, anchor="mm")

    # Headline & Specs
    draw.text((CANVAS_W // 2, CANVAS_H - 240), "YOUR PRIVATE GETAWAY AWAITS", fill=(255, 255, 255), font=headline_font, anchor="mm")
    draw.text((CANVAS_W // 2, CANVAS_H - 180), "6 BHK Luxury Villa  •  Pool & Many Other Amenities  •  Pure Veg", fill=(215, 215, 215), font=specs_font, anchor="mm")

    # Button: CONTACT FOR DIRECT BOOKINGS (No phone number)
    btn_text = "CONTACT FOR DIRECT BOOKINGS"
    btn_w = 480
    btn_h = 54
    btn_x = (CANVAS_W - btn_w) // 2
    btn_y = CANVAS_H - 125

    draw.rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], fill=(15, 20, 30, 220), outline=(212, 175, 55), width=2)
    draw.text((CANVAS_W // 2, btn_y + btn_h // 2), btn_text, fill=(255, 255, 255), font=btn_font, anchor="mm")

    final_rgb = comp.convert("RGB")

    out_artifact = "/Users/raahilshah/.gemini/antigravity-ide/brain/39e75e52-b9b8-4759-92c0-071bdbe0419c/aerial_other_angle_post.png"
    out_public = "/Users/raahilshah/Desktop/lonavala/public/aerial_other_angle_post.png"

    final_rgb.save(out_artifact)
    final_rgb.save(out_public)
    print("Photo 10 (Other Angle) graphic successfully generated!")

if __name__ == '__main__':
    generate_photo_10_post()
