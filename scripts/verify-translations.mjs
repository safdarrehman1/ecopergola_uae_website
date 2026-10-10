import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function verify() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const outDir = "./qa/translations";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];

  // 1. Check English Homepage
  const page = await context.newPage();
  await page.goto("http://localhost:3000/en", { waitUntil: "networkidle" });

  const enHeroH1 = await page.textContent("h1");
  const enDir = await page.getAttribute("html", "dir");
  const enLogoText = await page.locator("header a[aria-label='Eco Pergola']").textContent();
  await page.screenshot({ path: path.join(outDir, "en-home.png"), fullPage: false });

  results.push({
    locale: "en",
    dir: enDir,
    h1: enHeroH1?.trim(),
    logoTextEmpty: enLogoText?.trim() === "",
  });

  // 2. Check Arabic Homepage
  await page.goto("http://localhost:3000/ar", { waitUntil: "networkidle" });
  const arHeroH1 = await page.textContent("h1");
  const arDir = await page.getAttribute("html", "dir");
  const arLogoText = await page.locator("header a[aria-label='Eco Pergola']").textContent();
  const arServicesHeading = await page.locator("#services h2").textContent();
  const arContactHeading = await page.locator("#contact h2").textContent();
  await page.screenshot({ path: path.join(outDir, "ar-home.png"), fullPage: false });

  results.push({
    locale: "ar",
    dir: arDir,
    h1: arHeroH1?.trim(),
    servicesHeading: arServicesHeading?.trim(),
    contactHeading: arContactHeading?.trim(),
    logoTextEmpty: arLogoText?.trim() === "",
  });

  // 3. Check French Homepage
  await page.goto("http://localhost:3000/fr", { waitUntil: "networkidle" });
  const frHeroH1 = await page.textContent("h1");
  const frDir = await page.getAttribute("html", "dir");
  const frLogoText = await page.locator("header a[aria-label='Eco Pergola']").textContent();
  const frServicesHeading = await page.locator("#services h2").textContent();
  const frContactHeading = await page.locator("#contact h2").textContent();
  await page.screenshot({ path: path.join(outDir, "fr-home.png"), fullPage: false });

  results.push({
    locale: "fr",
    dir: frDir,
    h1: frHeroH1?.trim(),
    servicesHeading: frServicesHeading?.trim(),
    contactHeading: frContactHeading?.trim(),
    logoTextEmpty: frLogoText?.trim() === "",
  });

  // 4. Check Arabic Service Detail Page
  await page.goto("http://localhost:3000/ar/services/facade-design-fabrication", { waitUntil: "networkidle" });
  const arServiceH1 = await page.textContent("h1");
  const arSpecsTitle = await page.locator("aside h3").first().textContent();
  await page.screenshot({ path: path.join(outDir, "ar-service-detail.png"), fullPage: false });

  results.push({
    page: "ar-service-detail",
    h1: arServiceH1?.trim(),
    specsTitle: arSpecsTitle?.trim(),
  });

  // 5. Check French Pergola Detail Page
  await page.goto("http://localhost:3000/fr/pergola-types/aluminum-pergola", { waitUntil: "networkidle" });
  const frPergolaH1 = await page.textContent("h1");
  const frSpecsTitle = await page.locator("aside h3").first().textContent();
  await page.screenshot({ path: path.join(outDir, "fr-pergola-detail.png"), fullPage: false });

  results.push({
    page: "fr-pergola-detail",
    h1: frPergolaH1?.trim(),
    specsTitle: frSpecsTitle?.trim(),
  });

  console.log(JSON.stringify(results, null, 2));

  await browser.close();
}

verify().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
