import sys
import subprocess
try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def remove_white_bg(img_path, out_path, tolerance=40):
    img = Image.open(img_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size

    # BFS from corners
    visited = set()
    # Adding more edge points just in case corners aren't perfectly white but slightly off
    queue = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    for i in range(width):
        queue.append((i, 0))
        queue.append((i, height - 1))
    for i in range(height):
        queue.append((0, i))
        queue.append((width - 1, i))

    def is_white(c):
        # Allow near-white with some tolerance
        return c[0] >= 255 - tolerance and c[1] >= 255 - tolerance and c[2] >= 255 - tolerance

    idx = 0
    while idx < len(queue):
        x, y = queue[idx]
        idx += 1
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        c = pixels[x, y]
        if is_white(c):
            pixels[x, y] = (255, 255, 255, 0)
            # Add neighbors
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    queue.append((nx, ny))

    img.save(out_path, "PNG")
    print("Saved!")

remove_white_bg(r"c:\Users\Dell\Desktop\School\public\images\school-logo.jpg", r"c:\Users\Dell\Desktop\School\public\images\school-logo-transparent.png", tolerance=50)
