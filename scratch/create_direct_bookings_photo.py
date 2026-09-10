import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def generate_direct_bookings_photo():
    attached_path = '/Users/raahilshah/.gemini/antigravity-ide/brain/39e75e52-b9b8-4759-92c0-071bdbe0419c/.tempmediaStorage/media_39e75e52-b9b8-4759-92c0-071bdbe0419c_1788964389616.jpg'
    img = cv2.imread(attached_path)
    if img is None:
        print("Error: Attached photo not found!")
        return

    h, w, c = img.shape
    print(f"Processing attached photo: {w}x{h}")

    # --- 1. PHOTOREALISTIC ROOF RETOUCHING ---
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Reddish/Brown roof color mask
    lower_red1 = np.array([0, 15, 30])
    upper_red1 = np.array([25, 255, 230])
    lower_red2 = np.array([155, 15, 30])
    upper_red2 = np.array([180, 255, 230])

    hsv_red_mask = cv2.bitwise_or(
        cv2.inRange(hsv, lower_red1, upper_red1),
        cv2.inRange(hsv, lower_red2, upper_red2)
    )

    bounds_brown = np.zeros((h, w), dtype=np.uint8)
    bounds_brown[370:560, 470:1140] = 255
    main_brown_mask = cv2.bitwise_and(hsv_red_mask, bounds_brown)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    main_brown_mask = cv2.morphologyEx(main_brown_mask, cv2.MORPH_CLOSE, kernel)
    main_brown_mask = cv2.dilate(main_brown_mask, kernel, iterations=1)

    # Blue tile roof mask
    lower_blue = np.array([90, 25, 25])
    upper_blue = np.array([135, 255, 240])
    hsv_blue_mask = cv2.inRange(hsv, lower_blue, upper_blue)
    bounds_blue = np.zeros((h, w), dtype=np.uint8)
    bounds_blue[480:770, 300:1240] = 255
    main_blue_mask = cv2.bitwise_and(hsv_blue_mask, bounds_blue)
    main_blue_mask = cv2.morphologyEx(main_blue_mask, cv2.MORPH_CLOSE, kernel)

    # Bilateral smoothing & color enhancement for brown roof
    retouched_brown = cv2.bilateralFilter(img, d=15, sigmaColor=75, sigmaSpace=75)
    retouched_brown_hsv = cv2.cvtColor(retouched_brown, cv2.COLOR_BGR2HSV).astype(np.float32)
    brown_indices = main_brown_mask > 0
    retouched_brown_hsv[..., 1][brown_indices] = np.clip(retouched_brown_hsv[..., 1][brown_indices] * 1.22, 0, 255)
    retouched_brown_bgr = cv2.cvtColor(retouched_brown_hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    retouched_brown_final = cv2.addWeighted(retouched_brown_bgr, 0.75, img, 0.25, 0)

    # Bilateral smoothing & color enhancement for blue roof
    retouched_blue = cv2.bilateralFilter(img, d=11, sigmaColor=50, sigmaSpace=50)
    retouched_blue_hsv = cv2.cvtColor(retouched_blue, cv2.COLOR_BGR2HSV).astype(np.float32)
    blue_indices = main_blue_mask > 0
    retouched_blue_hsv[..., 1][blue_indices] = np.clip(retouched_blue_hsv[..., 1][blue_indices] * 1.25, 0, 255)
    retouched_blue_bgr = cv2.cvtColor(retouched_blue_hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    retouched_blue_final = cv2.addWeighted(retouched_blue_bgr, 0.80, img, 0.20, 0)

    # Blend retouched roof back onto base image with soft gaussian alpha blending
    blur_ksize = 9
    brown_alpha = cv2.GaussianBlur(main_brown_mask.astype(np.float32) / 255.0, (blur_ksize, blur_ksize), 0)
    blue_alpha = cv2.GaussianBlur(main_blue_mask.astype(np.float32) / 255.0, (blur_ksize, blur_ksize), 0)
    brown_alpha3 = np.stack([brown_alpha]*3, axis=-1)
    blue_alpha3 = np.stack([blue_alpha]*3, axis=-1)

    output_img = img.astype(np.float32)
    output_img = output_img * (1.0 - brown_alpha3) + retouched_brown_final.astype(np.float32) * brown_alpha3
    output_img = output_img * (1.0 - blue_alpha3) + retouched_blue_final.astype(np.float32) * blue_alpha3
    output_bgr = np.clip(output_img, 0, 255).astype(np.uint8)

    # --- 2. LUXURY OVERLAY & TYPOGRAPHY WITH PIL ---
    # Convert BGR (cv2) to RGB (PIL)
    pil_img = Image.fromarray(cv2.cvtColor(output_bgr, cv2.COLOR_BGR2RGB)).convert("RGBA")
    
    # Create gradient overlay layer for top and bottom text contrast
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Top dark gradient (height 140px)
    for y in range(150):
        alpha = int(140 * (1 - y / 150.0))
        draw_ov.line([(0, y), (w, y)], fill=(12, 16, 26, alpha))

    # Bottom dark gradient (height 180px)
    for y in range(h - 180, h):
        alpha = int(160 * ((y - (h - 180)) / 180.0))
        draw_ov.line([(0, y), (w, y)], fill=(12, 16, 26, alpha))

    pil_img = Image.alpha_composite(pil_img, overlay)
    draw = ImageDraw.Draw(pil_img)

    # Load elegant fonts
    font_georgia_bold = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 36)
    font_georgia_reg = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 26)
    font_georgia_small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 20)

    # --- TOP BRAND HEADER ---
    title_text = "R I S H A B H   V I L L A"
    subtitle_text = "LUXURY 6 BHK PRIVATE VILLA • LONAVALA"
    
    # Draw title
    tb_title = draw.textbbox((0, 0), title_text, font=font_georgia_bold)
    title_w = tb_title[2] - tb_title[0]
    draw.text(((w - title_w) // 2, 35), title_text, fill=(255, 255, 255, 240), font=font_georgia_bold)

    # Draw subtext
    tb_sub = draw.textbbox((0, 0), subtitle_text, font=font_georgia_small)
    sub_w = tb_sub[2] - tb_sub[0]
    draw.text(((w - sub_w) // 2, 85), subtitle_text, fill=(212, 175, 55, 230), font=font_georgia_small) # Gold accent color

    # --- BOTTOM CALL TO ACTION (NO PHONE NUMBER) ---
    cta_main = "CONTACT FOR DIRECT BOOKINGS"
    cta_sub = "DM or Visit rishabhvillalonavala.com for Best Rates & Availability"

    # Draw CTA Main
    tb_cta = draw.textbbox((0, 0), cta_main, font=font_georgia_bold)
    cta_w = tb_cta[2] - tb_cta[0]
    
    # Gold decorative lines on left & right of CTA
    line_y = h - 110
    line_margin = 40
    draw.line([(line_margin, line_y), ((w - cta_w) // 2 - 25, line_y)], fill=(212, 175, 55, 200), width=1)
    draw.line([((w + cta_w) // 2 + 25, line_y), (w - line_margin, line_y)], fill=(212, 175, 55, 200), width=1)

    draw.text(((w - cta_w) // 2, line_y - 22), cta_main, fill=(255, 255, 255, 255), font=font_georgia_bold)

    # Draw CTA Subtext
    tb_cta_sub = draw.textbbox((0, 0), cta_sub, font=font_georgia_reg)
    cta_sub_w = tb_cta_sub[2] - tb_cta_sub[0]
    draw.text(((w - cta_sub_w) // 2, h - 65), cta_sub, fill=(212, 175, 55, 240), font=font_georgia_reg)

    # Convert back to RGB and save
    final_rgb = pil_img.convert("RGB")

    output_png = '/Users/raahilshah/.gemini/antigravity-ide/brain/39e75e52-b9b8-4759-92c0-071bdbe0419c/direct_bookings_photo.png'
    output_public = '/Users/raahilshah/Desktop/lonavala/public/direct_bookings_photo.png'

    final_rgb.save(output_png)
    final_rgb.save(output_public)

    print("Direct Bookings Graphic successfully generated & saved to:")
    print(f"- {output_png}")
    print(f"- {output_public}")

if __name__ == '__main__':
    generate_direct_bookings_photo()
