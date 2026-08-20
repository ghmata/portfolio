import os
import sys
from pathlib import Path
from PIL import Image

if sys.platform.startswith('win'):
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

dest_dir = Path("public/images")
dest_dir.mkdir(parents=True, exist_ok=True)

# 1. Smart Dispatcher
sd_dir = Path("images/Smart_Dispatcher")
if sd_dir.exists():
    sd_files = sorted(list(sd_dir.glob("*.png")) + list(sd_dir.glob("*.jpg")) + list(sd_dir.glob("*.jpeg")))
    for idx, f in enumerate(sd_files, 1):
        img = Image.open(f)
        out = dest_dir / f"smart-dispatcher-{idx}.webp"
        img.save(out, "WEBP", quality=80, optimize=True)
        print(f"[OK] {f.name} -> {out.name} ({out.stat().st_size / 1024:.1f} KB)")

# 2. Comrec (Stockflow)
comrec_dir = Path("images/Comrec")
if comrec_dir.exists():
    comrec_files = sorted(list(comrec_dir.glob("*.png")) + list(comrec_dir.glob("*.jpg")) + list(comrec_dir.glob("*.jpeg")))
    for idx, f in enumerate(comrec_files, 1):
        img = Image.open(f)
        out = dest_dir / f"stockflow-{idx}.webp"
        img.save(out, "WEBP", quality=80, optimize=True)
        print(f"[OK] {f.name} -> {out.name} ({out.stat().st_size / 1024:.1f} KB)")

# 3. Concan (CargoSync FAB)
concan_dir = Path("images/Concan")
if concan_dir.exists():
    concan_files = sorted(list(concan_dir.glob("*.png")) + list(concan_dir.glob("*.jpg")) + list(concan_dir.glob("*.jpeg")))
    for idx, f in enumerate(concan_files, 1):
        img = Image.open(f)
        out = dest_dir / f"cargosync-{idx}.webp"
        img.save(out, "WEBP", quality=80, optimize=True)
        print(f"[OK] {f.name} -> {out.name} ({out.stat().st_size / 1024:.1f} KB)")

# 4. Docmind
docmind_dir = Path("images/Docmind")
if docmind_dir.exists():
    docmind_files = sorted(list(docmind_dir.glob("*.png")) + list(docmind_dir.glob("*.jpg")) + list(docmind_dir.glob("*.jpeg")))
    for idx, f in enumerate(docmind_files, 1):
        img = Image.open(f)
        out = dest_dir / f"docmind-{idx}.webp"
        img.save(out, "WEBP", quality=80, optimize=True)
        print(f"[OK] {f.name} -> {out.name} ({out.stat().st_size / 1024:.1f} KB)")

# 5. Locamil
locamil_dir = Path("images/Locamil")
if locamil_dir.exists():
    locamil_files = sorted(list(locamil_dir.glob("*.png")) + list(locamil_dir.glob("*.jpg")) + list(locamil_dir.glob("*.jpeg")))
    for idx, f in enumerate(locamil_files, 1):
        img = Image.open(f)
        out = dest_dir / f"locamil-{idx}.webp"
        img.save(out, "WEBP", quality=80, optimize=True)
        print(f"[OK] {f.name} -> {out.name} ({out.stat().st_size / 1024:.1f} KB)")

# 6. Planbel
planbel_dir = Path("images/Planbel")
if planbel_dir.exists():
    planbel_files = sorted(list(planbel_dir.glob("*.png")) + list(planbel_dir.glob("*.jpg")) + list(planbel_dir.glob("*.jpeg")))
    for idx, f in enumerate(planbel_files, 1):
        img = Image.open(f)
        out = dest_dir / f"planbel-{idx}.webp"
        img.save(out, "WEBP", quality=80, optimize=True)
        print(f"[OK] {f.name} -> {out.name} ({out.stat().st_size / 1024:.1f} KB)")

# 7. Vaulti
vaulti_dir = Path("images/Vaulti")
if vaulti_dir.exists():
    vaulti_files = sorted(list(vaulti_dir.glob("*.png")) + list(vaulti_dir.glob("*.jpg")) + list(vaulti_dir.glob("*.jpeg")))
    for idx, f in enumerate(vaulti_files, 1):
        img = Image.open(f)
        out = dest_dir / f"vaultis-{idx}.webp"
        img.save(out, "WEBP", quality=80, optimize=True)
        print(f"[OK] {f.name} -> {out.name} ({out.stat().st_size / 1024:.1f} KB)")

print("\nProcessamento concluido com sucesso!")
