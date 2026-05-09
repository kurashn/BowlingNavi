import collections
from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=50):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    target_color = (255, 255, 255, 255)
    
    q = collections.deque()
    visited = set()

    # Seed the edges
    for x in range(width):
        q.append((x, 0))
        q.append((x, height-1))
        visited.add((x, 0))
        visited.add((x, height-1))
    for y in range(height):
        q.append((0, y))
        q.append((width-1, y))
        visited.add((0, y))
        visited.add((width-1, y))

    def is_similar(c1, c2, tol):
        return abs(c1[0]-c2[0]) <= tol and abs(c1[1]-c2[1]) <= tol and abs(c1[2]-c2[2]) <= tol

    while q:
        x, y = q.popleft()
        current_color = pixels[x, y]
        
        if current_color[3] == 0:
            continue
            
        if is_similar(current_color, target_color, tolerance):
            pixels[x, y] = (current_color[0], current_color[1], current_color[2], 0)
            
            for nx, ny in [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]:
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        visited.add((nx, ny))
                        q.append((nx, ny))

    img.save(output_path)
    print("Done floodfill")

remove_white_bg('public/images/bownavikun.jpg', 'public/images/bownavi-mascot-v3.png')
