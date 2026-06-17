import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequenceDir = path.join(__dirname, '..', 'public', 'sequence');

if (!fs.existsSync(sequenceDir)) {
    fs.mkdirSync(sequenceDir, { recursive: true });
}

for (let i = 1; i <= 89; i++) {
    const num = i.toString().padStart(3, '0');
    // Rotate a rect to simulate 3D rotation
    const rotation = (i / 89) * 360;
    const hue = (i / 89) * 360;
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
        <rect width="100%" height="100%" fill="#1a1a1a" />
        <g transform="translate(400, 400) rotate(${rotation})">
            <rect x="-200" y="-200" width="400" height="400" fill="hsl(${hue}, 80%, 50%)" rx="50" />
            <text x="0" y="20" font-family="sans-serif" font-size="100" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">FRAME ${num}</text>
        </g>
    </svg>`;
    
    fs.writeFileSync(path.join(sequenceDir, `frame_${num}.svg`), svg);
}

console.log('Successfully generated 89 placeholder SVGs in /public/sequence/');
