import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '..', 'public');

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makePngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function generatePng(width, height) {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makePngChunk('IHDR', ihdrData);

  // Raw scanlines
  const rowStride = width * 4 + 1; // 1 filter byte per row
  const rawData = Buffer.alloc(height * rowStride);

  const cx = width / 2;
  const cy = height / 2;
  const r = (width / 2) * 0.88;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowStride;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Squircle distance formula: (dx/r)^4 + (dy/r)^4 <= 1
      const nx = Math.abs(dx) / (r * 0.95);
      const ny = Math.abs(dy) / (r * 0.95);
      const inSquircle = (Math.pow(nx, 4) + Math.pow(ny, 4)) <= 1;

      if (inSquircle) {
        // Gradient from top-left blue to bottom-right violet
        const gradT = (x + y) / (width + height);
        const red = Math.round(14 + (90 - 14) * gradT);
        const green = Math.round(116 + (40 - 116) * gradT);
        const blue = Math.round(244 + (210 - 244) * gradT);

        // Subtle specular highlight at top
        const highlight = y < height * 0.35 ? 40 : 0;

        // Windows 4-quadrant logo inside
        const winMargin = width * 0.28;
        const winGap = Math.max(1, Math.round(width * 0.05));
        const inWindowBounds = x >= winMargin && x <= width - winMargin && y >= winMargin && y <= height - winMargin;
        const inGapX = Math.abs(x - cx) < winGap / 2;
        const inGapY = Math.abs(y - cy) < winGap / 2;

        if (inWindowBounds && !inGapX && !inGapY) {
          // White window pane
          rawData[pxOffset] = 255;
          rawData[pxOffset + 1] = 255;
          rawData[pxOffset + 2] = 255;
          rawData[pxOffset + 3] = 240;
        } else {
          rawData[pxOffset] = Math.min(255, red + highlight);
          rawData[pxOffset + 1] = Math.min(255, green + highlight);
          rawData[pxOffset + 2] = Math.min(255, blue + highlight);
          rawData[pxOffset + 3] = 255;
        }
      } else {
        // Transparent
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makePngChunk('IDAT', compressed);
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate all required icon sizes
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

for (const { name, size } of sizes) {
  const buf = generatePng(size, size);
  fs.writeFileSync(path.join(publicDir, name), buf);
  console.log(`Generated public/${name} (${size}x${size}, ${buf.length} bytes)`);
}

// Write favicon.ico as a copy of 32x32 PNG (modern browsers support PNG inside ICO)
const icoBuf = generatePng(32, 32);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
console.log('Generated public/favicon.ico');
