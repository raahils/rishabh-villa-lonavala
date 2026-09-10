import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def generate_post(image_path, title_sub, category_tag, output_filename):
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return

    orig_img = Image.open(image_path).convert("RGBA")
    w, h = orig_img.size

    # Create gradient dark overlay for header & footer typography legibility
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Top dark gradient (140px height)
    for y in range(140):
        alpha = int(140 * (1 - y / 140.0))
        draw_ov.line([(0, y), (w, y)], fill=(10, 14, 22, alpha))

    # Bottom dark gradient (180px height)
    for y in range(h - 180, h):
        alpha = int(170 * ((y - (h - 180)) / 180.0))
        draw_ov.line([(0, y), (w, y)], fill=(10, 14, 22, alpha))

    comp_img = Image.alpha_composite(orig_img, overlay)
    draw = ImageDraw.Draw(comp_img)

    # Fonts
    font_bold = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", int(h * 0.038))
    font_reg = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", int(h * 0.026))
    font_small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", int(h * 0.020))

    # --- TOP BRANDING ---
    title_text = "R I S H A B H   V I L L A"
    subtitle_text = f"{category_tag} • LONAVALA"

    tb_title = draw.textbbox((0, 0), title_text, font=font_bold)
    title_w = tb_title[2] - tb_title[0]
    draw.text(((w - title_w) // 2, int(h * 0.035)), title_text, fill=(255, 255, 255, 245), font=font_bold)

    tb_sub = draw.textbbox((0, 0), subtitle_text, font=font_small)
    sub_w = tb_sub[2] - tb_sub[0]
    draw.text(((w - sub_w) // 2, int(h * 0.085)), subtitle_text, fill=(212, 175, 55, 230), font=font_small)

    # --- BOTTOM CALL TO ACTION (NO PHONE NUMBER) ---
    cta_main = "CONTACT FOR DIRECT BOOKINGS"
    cta_sub = "DM or Visit rishabhvillalonavala.com for Best Tariff & Availability"

    tb_cta = draw.textbbox((0, 0), cta_main, font=font_bold)
    cta_w = tb_cta[2] - tb_cta[0]

    line_y = h - int(h * 0.11)
    line_margin = int(w * 0.04)

    # Gold decorative accent rules
    draw.line([(line_margin, line_y), ((w - cta_w) // 2 - 20, line_y)], fill=(212, 175, 55, 200), width=1)
    draw.line([((w + cta_w) // 2 + 20, line_y), (w - line_margin, line_y)], fill=(212, 175, 55, 200), width=1)

    draw.text(((w - cta_w) // 2, line_y - int(h * 0.022)), cta_main, fill=(255, 255, 255, 255), font=font_bold)

    tb_cta_sub = draw.textbbox((0, 0), cta_sub, font=font_reg)
    cta_sub_w = tb_cta_sub[2] - tb_cta_sub[0]
    draw.text(((w - cta_sub_w) // 2, h - int(h * 0.065)), cta_sub, fill=(212, 175, 55, 240), font=font_reg)

    final_rgb = comp_img.convert("RGB")

    out_artifact = f"/Users/raahilshah/.gemini/antigravity-ide/brain/39e75e52-b9b8-4759-92c0-071bdbe0419c/{output_filename}"
    out_public = f"/Users/raahilshah/Desktop/lonavala/public/{output_filename}"

    final_rgb.save(out_artifact)
    final_rgb.save(out_public)
    print(f"Generated: {output_filename}")

def main():
    photos_base = "/Users/raahilshah/Desktop/lonavala/public/photos"
    
    posts = [
        {
            "filename": "PHOTO-2026-09-09-15-37-55 12.jpg",
            "tag": "PRIVATE SWIMMING POOL & DECK",
            "out": "direct_booking_pool.png"
        },
        {
            "filename": "PHOTO-2026-09-09-15-37-55 16.jpg",
            "tag": "MOUNTAIN VIEW SUITES (6 BHK)",
            "out": "direct_booking_bedroom.png"
        },
        {
            "filename": "PHOTO-2026-09-09-15-37-55 13.jpg",
            "tag": "GRAND LIVING PAVILION",
            "out": "direct_booking_living.png"
        },
        {
            "filename": "PHOTO-2026-09-09-15-37-55 19.jpg",
            "tag": "SPACIOUS PRIVATE LAWN & GAZEBO",
            "out": "direct_booking_lawn.png"
        }
    ]

    for p in posts:
        full_path = os.path.join(photos_base, p["filename"])
        generate_post(full_path, p["tag"], p["tag"], p["out"])

if __name__ == "__main__":
    main()
