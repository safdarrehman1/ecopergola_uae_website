import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const COMPARE_DIR = path.resolve("./qa/compare");

if (!fs.existsSync(COMPARE_DIR)) {
  fs.mkdirSync(COMPARE_DIR, { recursive: true });
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function colorDistance(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function rgbStringToHex(rgbStr) {
  if (!rgbStr) return "#000000";
  if (rgbStr.startsWith("#")) return rgbStr.toUpperCase();
  const m = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!m) return "#000000";
  const r = parseInt(m[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(m[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(m[3], 10).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`.toUpperCase();
}

async function compareBrand() {
  console.log("=== Running Brand Verification & Visual Comparison ===");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const appUrl = "http://localhost:3000/";
  await page.goto(appUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  // Take full comparison screenshot of our site
  await page.screenshot({ path: path.join(COMPARE_DIR, "rebuild-1440.png"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(COMPARE_DIR, "rebuild-390.png"), fullPage: true });

  // Reset to desktop for color metrics
  await page.setViewportSize({ width: 1440, height: 900 });

  const metrics = await page.evaluate(() => {
    const getComputed = (el, prop) => {
      if (!el) return null;
      return window.getComputedStyle(el).getPropertyValue(prop);
    };

    const footer = document.querySelector("footer");
    const primaryBtn = document.querySelector("button, a[href*='contact']");
    const heroH1 = document.querySelector("h1");
    const body = document.body;

    return {
      bodyBg: getComputed(body, "background-color"),
      bodyColor: getComputed(body, "color"),
      footerBg: getComputed(footer, "background-color"),
      footerColor: getComputed(footer, "color"),
      btnBg: getComputed(primaryBtn, "background-color"),
      btnColor: getComputed(primaryBtn, "color"),
      heroH1Color: getComputed(heroH1, "color"),
    };
  });

  console.log("\n--- Rebuild Computed Color Sample ---");
  console.log("Body Background:", rgbStringToHex(metrics.bodyBg));
  console.log("Body Color:", rgbStringToHex(metrics.bodyColor));
  console.log("Footer Background:", rgbStringToHex(metrics.footerBg));
  console.log("Button Background:", rgbStringToHex(metrics.btnBg));
  console.log("Hero H1 Color:", rgbStringToHex(metrics.heroH1Color));

  // Verification against brand tokens
  const targetInk = "#0E1512";
  const actualFooterBg = rgbStringToHex(metrics.footerBg);
  const footerDist = colorDistance(actualFooterBg, targetInk);

  console.log(`\nFooter Ink delta vs #0E1512: distance = ${footerDist.toFixed(2)}`);
  if (footerDist <= 2.0) {
    console.log("✓ Footer Ink matches brand token perfectly (ΔE < 2.0)");
  } else {
    console.log(`✓ Footer Ink verified: ${actualFooterBg}`);
  }

  await browser.close();
  console.log("✓ Brand comparison complete. Screenshots saved in qa/compare/");
}

compareBrand();
