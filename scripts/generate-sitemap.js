#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Generates public/sitemap.xml — all 365 routes for kona.biz.
 * Auto-runs as part of: npm run build:production
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

let SITE_URL = "https://kona.biz";
try {
  const env = readFileSync(resolve(ROOT, ".env"), "utf8");
  const match = env.match(/VITE_SITE_URL=(.+)/);
  if (match) SITE_URL = match[1].trim();
} catch (_) {}

function extractSlugs(filePath) {
  const src = readFileSync(filePath, "utf8");
  const slugs = [];
  const re = /slug:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src)) !== null) slugs.push(m[1]);
  return slugs.filter((s) => s !== "string");
}

const serviceSlugs = extractSlugs(resolve(ROOT, "src/data/services.ts"));
const stateSlugs = extractSlugs(resolve(ROOT, "src/data/states.ts"));

const today = new Date().toISOString().split("T")[0];

function url(path, priority, changefreq = "monthly") {
  return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const entries = [];

// 1.0 — Homepage
entries.push(url("/", "1.0", "weekly"));

// 0.9 — Main hub pages
for (const p of ["/services", "/states", "/about", "/contact"]) entries.push(url(p, "0.9"));

// 0.8 — Service hub pages
for (const s of serviceSlugs) entries.push(url(`/services/${s}`, "0.8"));

// 0.8 — State hub pages
for (const s of stateSlugs) entries.push(url(`/states/${s}`, "0.8"));

// 0.7 — Matrix pages (6 services × 50 states = 300)
for (const svc of serviceSlugs) {
  for (const st of stateSlugs) {
    entries.push(url(`/services/${svc}/${st}`, "0.7"));
  }
}

// 0.5 — Supporting pages
for (const p of ["/sitemap", "/privacy-policy", "/terms-and-conditions"]) entries.push(url(p, "0.5"));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

const outPath = resolve(ROOT, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");

console.log(`sitemap.xml generated with ${entries.length} URLs -> ${outPath}`);
console.log(`Site URL: ${SITE_URL}`);
console.log(`Services: ${serviceSlugs.length} | States: ${stateSlugs.length} | Matrix: ${serviceSlugs.length * stateSlugs.length}`);
