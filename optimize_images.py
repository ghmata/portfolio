import os
import sys
from pathlib import Path

# Ajustar encoding para Windows se necessário
if sys.platform.startswith('win'):
    import sys, io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def optimize():
    try:
        from PIL import Image
    except ImportError:
        print("[*] Pillow nao instalado. Instalando Pillow...")
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image

    public_dir = Path("public")
    images_dir = public_dir / "images"

    # Procurar todas as imagens png, jpg, jpeg
    image_paths = list(public_dir.glob("*.png")) + list(public_dir.glob("*.jpg")) + list(public_dir.glob("*.jpeg"))
    if images_dir.exists():
        image_paths += list(images_dir.glob("*.png")) + list(images_dir.glob("*.jpg")) + list(images_dir.glob("*.jpeg"))

    print(f"[*] Encontradas {len(image_paths)} imagens para processamento.")

    saved_total = 0

    for path in image_paths:
        # Pular se já for webp ou se for placeholder
        if path.suffix.lower() == '.webp' or 'placeholder' in path.name:
            continue
        
        webp_path = path.with_suffix('.webp')
        
        try:
            img = Image.open(path)
            orig_size = path.stat().st_size
            
            # Converter para WebP de alta qualidade
            img.save(webp_path, 'WEBP', quality=80, optimize=True)
            new_size = webp_path.stat().st_size
            
            saved = orig_size - new_size
            saved_total += saved
            
            print(f"[OK] {path.name} -> {webp_path.name} ({orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB) | Economizado: {saved/1024:.1f} KB ({(saved/orig_size)*100:.1f}%)")
            
        except Exception as e:
            print(f"[ERRO] Falha ao converter {path.name}: {str(e)}")

    print(f"\n[*] Otimizacao concluida! Total economizado: {saved_total/(1024*1024):.2f} MB")

if __name__ == "__main__":
    optimize()
