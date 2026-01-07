// Run this once to generate PNG icons if needed
const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [192, 512, 1024];

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#1A5F7A');
  gradient.addColorStop(1, '#57C5B6');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Draw "S" letter
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.35}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('S', size / 2, size / 2);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`icon-${size}.png`, buffer);
  console.log(`Generated icon-${size}.png`);
});

console.log('All icons generated!');
