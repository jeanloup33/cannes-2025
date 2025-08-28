import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Créer un fichier CSS de base avec les styles Tailwind essentiels
const tailwindCSS = `/* Styles de base */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
}

body {
  margin: 0;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  background-color: #0b0b0d;
  color: #f5efe1;
  line-height: 1.6;
}

/* Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Grid */
.grid {
  display: grid;
  gap: 1rem;
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* Flexbox */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

/* Spacing */
.p-4 { padding: 1rem; }
.p-8 { padding: 2rem; }
.m-4 { margin: 1rem; }
.mt-4 { margin-top: 1rem; }
.mb-4 { margin-bottom: 1rem; }

/* Text */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }
.text-5xl { font-size: 3rem; }
.text-6xl { font-size: 3.75rem; }

.font-normal { font-weight: 400; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }

/* Colors */
.text-white { color: #ffffff; }
.text-gold { color: #e8c77d; }
.text-ruby { color: #b80f2f; }
.bg-night { background-color: #0b0b0d; }
.bg-noir { background-color: #111114; }
.bg-gold { background-color: #e8c77d; }
.bg-ruby { background-color: #b80f2f; }

/* Borders */
.border { border: 1px solid #e5e7eb; }
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 9999px; }

/* Shadows */
.shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }

/* Width/Height */
.w-full { width: 100%; }
.h-full { height: 100%; }
.h-screen { height: 100vh; }

/* Responsive */
@media (max-width: 768px) {
  .text-4xl { font-size: 1.875rem; }
  .text-5xl { font-size: 2.25rem; }
  .text-6xl { font-size: 3rem; }
  .grid-cols-2 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid-cols-3 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
}

/* Custom styles */
.gold-text {
  background: linear-gradient(135deg, #f7ebc2, #e8c77d, #b99243);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.glow-effect {
  box-shadow: 0 0 0 2px rgba(232,199,125,0.35), 0 20px 60px rgba(0,0,0,0.5);
}

.glam-bg {
  background: radial-gradient(1000px 600px at 80% -10%, rgba(232,199,125,0.14), transparent 60%), linear-gradient(180deg, #0b0b0d 0%, #111114 70%, #0b0b0d 100%);
}

.red-carpet {
  background: linear-gradient(180deg, rgba(184,15,47,0.85), rgba(184,15,47,0.92));
}`;

// Créer le dossier src s'il n'existe pas
const srcDir = join(__dirname, 'src');
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// Écrire le fichier CSS
fs.writeFileSync(join(srcDir, 'output.css'), tailwindCSS);
console.log('✅ Fichier CSS généré avec succès dans ./src/output.css');