import os
import sys
from pathlib import Path
from PIL import Image

if sys.platform.startswith('win'):
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

src_dir = Path("images/LandingPages")
dest_dir = Path("public/images")
dest_dir.mkdir(parents=True, exist_ok=True)

mapping = {
    "Solarys_digital.png": "solarys-landing-1.webp",
    "taipa1.png": "taipa-1.webp",
    "taipa2.png": "taipa-2.webp",
    "roosevelt1.png": "roosevelt-1.webp",
    "roosevelt2.png": "roosevelt-2.webp",
    "Eletro1.png": "eletro-1.webp",
    "Eletro2.png": "eletro-2.webp",
}

for src_name, dest_name in mapping.items():
    src_file = src_dir / src_name
    if src_file.exists():
        img = Image.open(src_file)
        dest_file = dest_dir / dest_name
        img.save(dest_file, "WEBP", quality=80, optimize=True)
        print(f"[OK] {src_name} -> {dest_name} ({dest_file.stat().st_size / 1024:.1f} KB)")
    else:
        print(f"[WARN] Nao encontrado: {src_name}")

print("\nConversao das Landing Pages concluida com sucesso!")
