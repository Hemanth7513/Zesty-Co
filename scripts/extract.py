import os
import sys

try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("rembg or Pillow not installed yet. Please wait.")
    sys.exit(1)

assets = ['buffalo_sauce.png', 'classic_ranch.png', 'chipotle_ranch.png', 'golden_dip.png']
input_dir = 'src/assets/'
output_dir = 'public/'

for asset in assets:
    input_path = os.path.join(input_dir, asset)
    output_path = os.path.join(output_dir, asset.replace('.png', '_cutout.png'))
    print(f"Processing {input_path}...")
    try:
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        output_image.save(output_path)
        print(f"Saved {output_path}")
    except Exception as e:
        print(f"Error processing {asset}: {e}")
