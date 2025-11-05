#!/usr/bin/env node
import { mkdir, copyFile, stat } from "fs/promises";
import path from "path";

const root = process.cwd();
const publicDir = path.join(root, "public");

async function copyIfExists(filename) {
  const src = path.join(root, filename);
  const dest = path.join(publicDir, filename);
  try {
    await stat(src);
  } catch (err) {
    console.warn(`[copy-assets] Source not found: ${src} — skipping`);
    return;
  }
  try {
    await copyFile(src, dest);
    console.log(`[copy-assets] Copied ${filename} -> public/${filename}`);
  } catch (err) {
    console.error(`[copy-assets] Failed to copy ${filename}:`, err);
  }
}

(async () => {
  try {
    await mkdir(publicDir, { recursive: true });
    // List of files we want to ensure are available from the site root
    const files = ["Logo.png"];
    for (const f of files) {
      await copyIfExists(f);
    }
  } catch (err) {
    console.error("[copy-assets] Unexpected error:", err);
    process.exit(1);
  }
})();
