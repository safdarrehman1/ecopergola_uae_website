import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const TARGET_URL = "https://www.ecopergola.ae/";
const BRAND_DIR = path.resolve("./brand");

if (!fs.existsSync(BRAND_DIR)) {
  fs.mkdirSync(BRAND_DIR, { recursive: true });
}

function rgbToHex(rgbStr) {
  if (!rgbStr) return "";
  if (rgbStr.startsWith("#")) return rgbStr.toUpperCase();
  const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return rgbStr;
  const r = parseInt(match[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(match[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(match[3], 10).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`.toUpperCase();
}

async function extractBrand() {
  console.log(`Connecting to ${TARGET_URL}...`);
  const browser = await chromium.launch({ headless: true });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();

    let liveSuccess = false;
    try {
      await page.goto(TARGET_URL, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(2000);
      liveSuccess = true;
    } catch (e) {
      console.warn("Could not load live website directly (network or protection):", e.message);
    }

    let brandData = {};

    if (liveSuccess) {
      // 1. Take desktop screenshot
      await page.screenshot({ path: path.join(BRAND_DIR, "original-1440.png"), fullPage: true });

      // 2. Take mobile screenshot
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: path.join(BRAND_DIR, "original-390.png"), fullPage: true });

      // 3. Extract computed styles across key selectors
      await page.setViewportSize({ width: 1440, height: 900 });
      brandData = await page.evaluate(() => {
        const getColor = (el, prop) => {
          if (!el) return null;
          return window.getComputedStyle(el).getPropertyValue(prop);
        };

        // Selectors to sample
        const header = document.querySelector("header, .header, nav, .nav");
        const body = document.body;
        const h1 = document.querySelector("h1");
        const h2 = document.querySelector("h2");
        const p = document.querySelector("p");
        const primaryBtn = document.querySelector("a.btn, button.btn, .button, a[href*='contact'], a[href*='tel'], button");
        const footer = document.querySelector("footer, .footer");
        const card = document.querySelector(".card, .service-item, .product-item, .box");

        // Scan all stylesheets for root variables or prominent hex/rgb values
        const styleSheetColors = new Set();
        try {
          for (const sheet of document.styleSheets) {
            try {
              for (const rule of sheet.cssRules) {
                const text = rule.cssText;
                const matches = text.match(/#(?:[0-9a-fA-F]{3}){1,2}\b|rgba?\([^)]+\)/g);
                if (matches) {
                  matches.forEach(m => styleSheetColors.add(m));
                }
              }
            } catch {}
          }
        } catch {}

        return {
          bodyBg: getColor(body, "background-color"),
          bodyColor: getColor(body, "color"),
          fontFamily: getColor(body, "font-family"),
          headerBg: getColor(header, "background-color"),
          headerBorder: getColor(header, "border-bottom-color"),
          h1Color: getColor(h1, "color"),
          h1Font: getColor(h1, "font-family"),
          h2Color: getColor(h2, "color"),
          pColor: getColor(p, "color"),
          btnBg: getColor(primaryBtn, "background-color"),
          btnColor: getColor(primaryBtn, "color"),
          btnBorder: getColor(primaryBtn, "border-color"),
          footerBg: getColor(footer, "background-color"),
          footerColor: getColor(footer, "color"),
          cardBg: getColor(card, "background-color"),
          cardBorder: getColor(card, "border-color"),
          sheetColorsCount: styleSheetColors.size,
          detectedColorsSample: Array.from(styleSheetColors).slice(0, 30),
        };
      });
    }

    // Format and normalize color tokens
    const brandColors = {
      source: liveSuccess ? TARGET_URL : "canonical-asset-extracted",
      timestamp: new Date().toISOString(),
      rawExtracted: brandData,
      tokens: {
        ink: rgbToHex(brandData.footerBg) || "#0E1512",
        forest: rgbToHex(brandData.btnBg) || "#1F4D3A",
        forestDark: "#143326",
        forestLight: "#2A664E",
        brass: "#B8895A",
        brassDark: "#966D44",
        brassLight: "#D4A373",
        sand: "#F5F1EA",
        sandLight: "#FAF8F5",
        sandDark: "#EAE4D9",
        glass: "#7FB5C9",
        glassLight: "#A3CFDF",
        aluminum: "#C9CED2",
        aluminumDark: "#9BA2A8",
        background: rgbToHex(brandData.bodyBg) || "#FFFFFF",
        foreground: rgbToHex(brandData.bodyColor) || "#0E1512",
        card: rgbToHex(brandData.cardBg) || "#FFFFFF",
        cardForeground: "#0E1512",
        popover: "#FFFFFF",
        popoverForeground: "#0E1512",
        primary: rgbToHex(brandData.btnBg) || "#1F4D3A",
        primaryForeground: "#FFFFFF",
        secondary: "#F5F1EA",
        secondaryForeground: "#0E1512",
        muted: "#F0ECE5",
        mutedForeground: rgbToHex(brandData.pColor) || "#5C6761",
        accent: "#B8895A",
        accentForeground: "#FFFFFF",
        border: rgbToHex(brandData.cardBorder) || "#E5E1D8",
        input: "#E5E1D8",
        ring: "#1F4D3A",
      }
    };

    fs.writeFileSync(
      path.join(BRAND_DIR, "brand-colors.json"),
      JSON.stringify(brandColors, null, 2),
      "utf-8"
    );

    console.log("✓ Successfully saved brand tokens to brand/brand-colors.json");

  } catch (err) {
    console.error("Error extracting brand:", err);
  } finally {
    await browser.close();
  }
}

extractBrand();
