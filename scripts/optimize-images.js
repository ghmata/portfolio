const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Script para otimizar imagens do portfólio
 * Converte PNG/JPG para WebP com qualidade otimizada
 * 
 * Uso: node scripts/optimize-images.js
 */

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');
const QUALITY = 85; // Qualidade WebP (0-100)

// Criar pasta de output se não existir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const inputSizeKB = (stats.size / 1024).toFixed(2);

    await sharp(inputPath)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(2);
    const reduction = ((1 - outputStats.size / stats.size) * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)}`);
    console.log(`  ${inputSizeKB}KB → ${outputSizeKB}KB (${reduction}% menor)\n`);
  } catch (error) {
    console.error(`✗ Erro ao processar ${inputPath}:`, error.message);
  }
}

async function processDirectory() {
  console.log('🖼️  Otimizando imagens...\n');

  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file)
  );

  if (imageFiles.length === 0) {
    console.log('Nenhuma imagem PNG/JPG encontrada para otimizar.');
    return;
  }

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    
    await optimizeImage(inputPath, outputPath);
  }

  console.log(`\n✅ ${imageFiles.length} imagens otimizadas!`);
  console.log(`📁 Salvas em: ${OUTPUT_DIR}`);
}

processDirectory().catch(console.error);
