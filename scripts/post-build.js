#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Copy dist/public to server/public for production serving
const sourceDir = path.join(projectRoot, 'dist', 'public');
const targetDir = path.join(projectRoot, 'server', 'public');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory ${src} does not exist`);
    process.exit(1);
  }

  // Remove target directory if it exists
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }

  // Create target directory
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying build files for production deployment...');
copyRecursive(sourceDir, targetDir);
console.log(`Successfully copied ${sourceDir} to ${targetDir}`);