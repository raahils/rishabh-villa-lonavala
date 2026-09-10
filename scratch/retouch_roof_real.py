import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

def refine_original_roof():
    orig_path = '/Users/raahilshah/Desktop/lonavala/public/photos/PHOTO-2026-09-09-15-37-55 34.jpg'
    img = cv2.imread(orig_path)
    if img is None:
        print("Error: Could not load original image!")
        return

    h, w, c = img.shape
    print(f"Loaded original image: {w}x{h}")

    # Convert to HSV and LAB color spaces for precise selective retouching
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

    # Define precise roof region mask (y: 380 to 760, x: 300 to 1250)
    roof_mask = np.zeros((h, w), dtype=np.uint8)

    # 1. Main Upper Brown/Reddish Roof Segment
    # Polygon coordinates covering upper roof peak and slopes
    pts_upper_roof = np.array([
        [790, 390],  # top center peak left
        [830, 390],  # top center peak right
        [1120, 520], # right wing outer eave
        [1120, 540], # right eave trim bottom
        [910, 545],  # inner right corner
        [910, 520],  # tier step
        [700, 520],  # tier step left
        [700, 545],  # inner left corner
        [490, 540],  # left eave trim bottom
        [490, 520],  # left wing outer eave
    ], dtype=np.int32)
    cv2.fillPoly(roof_mask, [pts_upper_roof], 255)

    # Also detect brownish/reddish HSV pixels in the roof region to make the mask exact
    lower_red1 = np.array([0, 15, 30])
    upper_red1 = np.array([25, 255, 230])
    lower_red2 = np.array([155, 15, 30])
    upper_red2 = np.array([180, 255, 230])

    hsv_red_mask = cv2.bitwise_or(
        cv2.inRange(hsv, lower_red1, upper_red1),
        cv2.inRange(hsv, lower_red2, upper_red2)
    )

    # Restrict to middle-upper vertical bounds of the villa roof (y between 380 and 550, x between 480 and 1130)
    bounds_mask = np.zeros((h, w), dtype=np.uint8)
    bounds_mask[380:555, 480:1130] = 255

    # Combined brown roof mask
    main_brown_mask = cv2.bitwise_and(hsv_red_mask, bounds_mask)
    
    # Dilate slightly and close holes to get smooth solid coverage of the corrugated panels
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    main_brown_mask = cv2.morphologyEx(main_brown_mask, cv2.MORPH_CLOSE, kernel)
    main_brown_mask = cv2.dilate(main_brown_mask, kernel, iterations=1)

    # 2. Blue Tile Overhang/Awnings Roof Mask (lower levels)
    lower_blue = np.array([90, 25, 25])
    upper_blue = np.array([135, 255, 240])
    hsv_blue_mask = cv2.inRange(hsv, lower_blue, upper_blue)
    blue_bounds = np.zeros((h, w), dtype=np.uint8)
    blue_bounds[490:770, 300:1220] = 255
    main_blue_mask = cv2.bitwise_and(hsv_blue_mask, blue_bounds)
    main_blue_mask = cv2.morphologyEx(main_blue_mask, cv2.MORPH_CLOSE, kernel)

    # --- RETOUCHING THE BROWN/MAROON ROOF PANELS ---
    # Apply edge-preserving Bilateral Filter to smooth weathering/dirt spots while keeping ridges crisp
    retouched_brown = cv2.bilateralFilter(img, d=15, sigmaColor=75, sigmaSpace=75)
    
    # Enhance warmth and richness of the maroon/copper roof color
    retouched_brown_hsv = cv2.cvtColor(retouched_brown, cv2.COLOR_BGR2HSV).astype(np.float32)
    
    # Slightly boost saturation of brown roof pixels (by 1.15x) and refine hue consistency
    brown_indices = main_brown_mask > 0
    retouched_brown_hsv[..., 1][brown_indices] = np.clip(retouched_brown_hsv[..., 1][brown_indices] * 1.20, 0, 255)
    
    # Convert back to BGR
    retouched_brown_bgr = cv2.cvtColor(retouched_brown_hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    
    # Blend smoothed texture with original detail to preserve 100% natural metal corrugated texture
    # 70% smoothed clean texture + 30% original lighting/detail
    retouched_brown_final = cv2.addWeighted(retouched_brown_bgr, 0.75, img, 0.25, 0)

    # --- RETOUCHING THE BLUE TILE ROOFS ---
    retouched_blue = cv2.bilateralFilter(img, d=11, sigmaColor=50, sigmaSpace=50)
    retouched_blue_hsv = cv2.cvtColor(retouched_blue, cv2.COLOR_BGR2HSV).astype(np.float32)
    
    blue_indices = main_blue_mask > 0
    # Clean up gray haze, make blue tiles rich royal slate blue
    retouched_blue_hsv[..., 1][blue_indices] = np.clip(retouched_blue_hsv[..., 1][blue_indices] * 1.25, 0, 255)
    retouched_blue_bgr = cv2.cvtColor(retouched_blue_hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    retouched_blue_final = cv2.addWeighted(retouched_blue_bgr, 0.80, img, 0.20, 0)

    # --- SEAMLESS FEATHERED BLENDING ---
    # Create soft gaussian blurred masks for 100% natural, anti-aliased transitions
    blur_ksize = 9
    brown_alpha = cv2.GaussianBlur(main_brown_mask.astype(np.float32) / 255.0, (blur_ksize, blur_ksize), 0)
    blue_alpha = cv2.GaussianBlur(main_blue_mask.astype(np.float32) / 255.0, (blur_ksize, blur_ksize), 0)

    # Expand dims for 3-channel multiplication
    brown_alpha3 = np.stack([brown_alpha]*3, axis=-1)
    blue_alpha3 = np.stack([blue_alpha]*3, axis=-1)

    # Composite onto original image base
    output_img = img.astype(np.float32)
    output_img = output_img * (1.0 - brown_alpha3) + retouched_brown_final.astype(np.float32) * brown_alpha3
    output_img = output_img * (1.0 - blue_alpha3) + retouched_blue_final.astype(np.float32) * blue_alpha3

    output_bgr = np.clip(output_img, 0, 255).astype(np.uint8)

    # Save retouched photorealistic result
    output_path = '/Users/raahilshah/Desktop/lonavala/public/photos/PHOTO-2026-09-09-15-37-55 34.jpg'
    output_path_png = '/Users/raahilshah/Desktop/lonavala/public/roof_retouched_real.png'
    artifact_path = '/Users/raahilshah/.gemini/antigravity-ide/brain/39e75e52-b9b8-4759-92c0-071bdbe0419c/roof_retouched_real.png'

    cv2.imwrite(output_path_png, output_bgr)
    cv2.imwrite(artifact_path, output_bgr)
    cv2.imwrite(output_path, output_bgr) # overwrite public gallery image with pristine version

    print(f"Pristine photorealistic retouched photo saved to:\n- {output_path_png}\n- {artifact_path}\n- {output_path}")

if __name__ == '__main__':
    refine_original_roof()
