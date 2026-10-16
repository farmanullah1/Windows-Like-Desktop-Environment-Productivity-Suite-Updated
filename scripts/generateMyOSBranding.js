import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsBrandingDir = path.resolve(rootDir, 'assets', 'branding');
const publicBrandingDir = path.resolve(rootDir, 'public', 'assets', 'branding');
const publicDir = path.resolve(rootDir, 'public');

fs.mkdirSync(assetsBrandingDir, { recursive: true });
fs.mkdirSync(publicBrandingDir, { recursive: true });

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

function generateMyOSPng(width, height) {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makePngChunk('IHDR', ihdrData);

  const rowStride = width * 4 + 1;
  const rawData = Buffer.alloc(height * rowStride);

  const cx = width / 2;
  const cy = height / 2;
  const squircleRadius = (width / 2) * 0.88;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowStride;
    rawData[rowOffset] = 0; // Filter: none

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Distance from center for squircle: (dx^4 + dy^4)^(1/4)
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const sqDist = Math.pow(Math.pow(dx, 4) + Math.pow(dy, 4), 0.25);

      if (sqDist <= squircleRadius) {
        // Gradient from top-left (electric blue #3b82f6) to bottom-right (deep violet #8b5cf6)
        const t = (x + y) / (width + height);
        let r = Math.round(59 + t * (139 - 59));
        let g = Math.round(130 + t * (92 - 130));
        let b = Math.round(246 + t * (246 - 246));

        // Inner glowing M mark pattern in center 60%
        const nx = (x - cx) / (width * 0.35);
        const ny = (y - cy) / (height * 0.35);

        // Check if inside "M" coordinates
        const isLeftPillar = nx >= -0.7 && nx <= -0.3 && ny >= -0.6 && ny <= 0.6;
        const isRightPillar = nx >= 0.3 && nx <= 0.7 && ny >= -0.6 && ny <= 0.6;
        const isLeftDiagonal = ny >= (nx * 1.2 - 0.2) && ny <= (nx * 1.2 + 0.3) && nx >= -0.5 && nx <= 0.05;
        const isRightDiagonal = ny >= (-nx * 1.2 - 0.2) && ny <= (-nx * 1.2 + 0.3) && nx >= -0.05 && nx <= 0.5;

        // Orbital ring ring: ellipse (nx/1.1)^2 + (ny/0.5)^2 approx 1.0
        const orbDist = Math.sqrt(Math.pow(nx / 1.05, 2) + Math.pow(ny / 0.45, 2));
        const isOrbit = orbDist >= 0.85 && orbDist <= 1.05 && (nx > 0.1 || ny < -0.1);

        if (isLeftPillar || isRightPillar || isLeftDiagonal || isRightDiagonal) {
          // Bright white-cyan core for M
          r = Math.min(255, r + 160);
          g = Math.min(255, g + 160);
          b = 255;
        } else if (isOrbit) {
          // Cyan glow accent
          r = 56;
          g = 189;
          b = 248;
        }

        // Anti-aliasing at the squircle border
        const edgeDist = squircleRadius - sqDist;
        const alpha = edgeDist < 1.5 ? Math.round(Math.max(0, edgeDist / 1.5) * 255) : 255;

        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = alpha;
      } else {
        // Transparent
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
      }
    }
  }

  const idatChunk = makePngChunk('IDAT', zlib.deflateSync(rawData));
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeIco(png16, png32, png48) {
  const images = [
    { w: 16, h: 16, buf: png16 },
    { w: 32, h: 32, buf: png32 },
    { w: 48, h: 48, buf: png48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const dirEntries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.w === 256 ? 0 : img.w, 0);
    entry.writeUInt8(img.h === 256 ? 0 : img.h, 1);
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buf.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    offset += img.buf.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(i => i.buf)]);
}

// Generate all sizes
console.log('Generating MyOS PNG icons...');
const png16 = generateMyOSPng(16, 16);
const png32 = generateMyOSPng(32, 32);
const png48 = generateMyOSPng(48, 48);
const png180 = generateMyOSPng(180, 180);
const png192 = generateMyOSPng(192, 192);
const png512 = generateMyOSPng(512, 512);
const ico = makeIco(png16, png32, png48);

const outputs = [
  { name: 'favicon-16.png', buf: png16 },
  { name: 'favicon-32.png', buf: png32 },
  { name: 'favicon-48.png', buf: png48 },
  { name: 'apple-touch-icon.png', buf: png180 },
  { name: 'favicon-192.png', buf: png192 },
  { name: 'favicon-512.png', buf: png512 },
  { name: 'favicon.ico', buf: ico },
];

for (const out of outputs) {
  // Write to assets/branding/
  fs.writeFileSync(path.join(assetsBrandingDir, out.name), out.buf);
  // Write to public/assets/branding/
  fs.writeFileSync(path.join(publicBrandingDir, out.name), out.buf);
  // Write key icons to public/ root as well
  if (out.name === 'favicon.ico' || out.name === 'apple-touch-icon.png') {
    fs.writeFileSync(path.join(publicDir, out.name), out.buf);
  }
}

// Copy SVGs to public/assets/branding/ as well
const svgs = ['logo.svg', 'logo-mono.svg', 'mask-icon.svg', 'wordmark.svg', 'splash.svg'];
for (const svg of svgs) {
  const src = path.join(assetsBrandingDir, svg);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(publicBrandingDir, svg));
  }
}

console.log('✔ All MyOS branding assets successfully created and synchronized.');
