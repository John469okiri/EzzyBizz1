const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function createProjectZip() {
  const zip = new JSZip();
  const rootDir = path.resolve(__dirname, '..');

  const includeFiles = [
    'index.html',
    'netlify.toml',
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'README.md',
    '.gitignore',
  ];

  for (const file of includeFiles) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      zip.file(file, fs.readFileSync(filePath, 'utf-8'));
    }
  }

  // Add src directory recursively
  function addDir(dirPath, zipFolder) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        addDir(fullPath, zipFolder.folder(entry.name));
      } else {
        // Binary files like jpg
        if (entry.name.endsWith('.jpg') || entry.name.endsWith('.png')) {
          zipFolder.file(entry.name, fs.readFileSync(fullPath));
        } else {
          zipFolder.file(entry.name, fs.readFileSync(fullPath, 'utf-8'));
        }
      }
    }
  }

  const srcDir = path.join(rootDir, 'src');
  if (fs.existsSync(srcDir)) {
    addDir(srcDir, zip.folder('src'));
  }

  // Ensure public folder exists
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Generating ZIP buffer...');
  const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  fs.writeFileSync(path.join(publicDir, 'ezzybizz-project.zip'), content);
  fs.writeFileSync(path.join(rootDir, 'ezzybizz-project.zip'), content);
  console.log('Created ezzybizz-project.zip successfully in root and public directory!');
}

createProjectZip().catch((err) => {
  console.error(err);
  process.exit(1);
});
