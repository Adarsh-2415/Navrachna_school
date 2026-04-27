import re
import os

# Read Gallery.jsx to get image filenames
with open(r"c:\Users\Dell\Desktop\School\src\components\Gallery.jsx", "r") as f:
    content = f.read()

# Match imageFiles array content
match = re.search(r'const imageFiles = \[(.*?)\];', content, re.DOTALL)
if not match:
    print("Could not find imageFiles array")
    exit(1)

array_content = match.group(1)
filenames = [f.strip().strip('"').strip("'") for f in array_content.split(',') if f.strip()]

html = """
<!DOCTYPE html>
<html>
<head>
    <style>
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 20px; }
        .item { border: 1px solid #ccc; text-align: center; padding: 10px; }
        img { max-width: 100%; height: 200px; object-fit: cover; }
    </style>
</head>
<body>
    <div class="grid">
"""

for i, f in enumerate(filenames):
    html += f"""
        <div class="item">
            <p>Index: {i}</p>
            <p style="font-size: 10px;">{f}</p>
            <img src="public/images/{f}" alt="{f}">
        </div>
    """

html += """
    </div>
</body>
</html>
"""

output_path = r"c:\Users\Dell\Desktop\School\test_images.html"
with open(output_path, "w") as f:
    f.write(html)

print(f"Generated {output_path} with {len(filenames)} images")
