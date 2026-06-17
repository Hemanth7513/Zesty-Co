import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequenceDir = path.join(__dirname, '..', 'public', 'sequence');
const bottlePath = path.join(__dirname, '..', 'src', 'assets', 'buffalo_sauce.png');

if (!fs.existsSync(sequenceDir)) {
    fs.mkdirSync(sequenceDir, { recursive: true });
}

// Read the bottle image and convert to base64
let base64Image = '';
try {
    const imageBuffer = fs.readFileSync(bottlePath);
    base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
} catch (e) {
    console.error("Could not find buffalo_sauce.png", e);
    process.exit(1);
}

const numFrames = 89;

for (let i = 1; i <= numFrames; i++) {
    const num = i.toString().padStart(3, '0');
    
    // Calculate a faux 3D spin by scaling X from 1 to -1 to 1
    // A full rotation across 89 frames: angle goes from 0 to 2*PI
    const angle = (i / numFrames) * Math.PI * 2;
    // scaleX will be cos(angle). This creates a 3D spinning effect for a 2D image.
    const scaleX = Math.cos(angle).toFixed(3);
    
    // Also let's add a slight bobbing effect (y translation)
    const bobY = (Math.sin(angle * 2) * 20).toFixed(1);
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
        <rect width="100%" height="100%" fill="#1a1a1a" />
        <g transform="translate(400, ${400 + parseFloat(bobY)}) scale(${scaleX}, 1)">
            <image href="${base64Image}" x="-200" y="-300" width="400" height="600" preserveAspectRatio="xMidYMid meet" />
        </g>
    </svg>`;
    
    fs.writeFileSync(path.join(sequenceDir, `frame_${num}.svg`), svg);
}

console.log('Successfully generated 89 spinning bottle SVGs in /public/sequence/');
