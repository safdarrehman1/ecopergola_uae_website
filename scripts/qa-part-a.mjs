import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1024", width: 1024, height: 900 },
  { name: "desktop-1280", width: 1280, height: 900 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "wide-1920", width: 1920, height: 1080 },
];

const PAGES = [
  { name: "services-facade", path: "/services/facade-design-fabrication" },
  { name: "pergola-aluminum", path: "/pergola-types/aluminum-pergola" },
  { name: "project-dubai-hills", path: "/projects/dubai-hills-estate-villa" },
  { name: "blog-climate-guide", path: "/blog/how-to-choose-pergola-dubai-climate" },
];

const BASE_URL = "http://localhost:3000";
const QA_DIR = path.resolve("./qa/part-a");

if (!fs.existsSync(QA_DIR)) {
  fs.mkdirSync(QA_DIR, { recursive: true });
}

async function runQA() {
  console.log("=== Starting Part A Layout Verification with Playwright ===");
  const browser = await chromium.launch({ headless: true });
  let totalErrors = 0;
  let totalPassed = 0;

  for (const pageInfo of PAGES) {
    console.log(`\nTesting Page: ${pageInfo.name} (${pageInfo.path})`);
    const pageUrl = `${BASE_URL}${pageInfo.path}`;

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      try {
        await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
        await page.waitForTimeout(600);

        // 1. Check for horizontal overflow
        const overflowCheck = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = window.innerWidth;
          return {
            hasOverflow: scrollWidth > clientWidth,
            scrollWidth,
            clientWidth,
          };
        });

        if (overflowCheck.hasOverflow) {
          console.error(
            `❌ [${vp.name}] Horizontal Overflow detected! scrollWidth=${overflowCheck.scrollWidth} > clientWidth=${overflowCheck.clientWidth}`
          );
          totalErrors++;
        } else {
          console.log(
            `✓ [${vp.name}] No horizontal overflow (scrollWidth=${overflowCheck.scrollWidth}, clientWidth=${overflowCheck.clientWidth})`
          );
          totalPassed++;
        }

        // 2. Check layout column dimensions and overlap
        const layoutMetrics = await page.evaluate(() => {
          const article = document.querySelector("article");
          const aside = document.querySelector("aside");
          const h1 = document.querySelector("h1");
          const header = document.querySelector("header");

          const articleRect = article ? article.getBoundingClientRect() : null;
          const asideRect = aside ? aside.getBoundingClientRect() : null;
          const h1Rect = h1 ? h1.getBoundingClientRect() : null;
          const headerRect = header ? header.getBoundingClientRect() : null;

          return {
            article: articleRect
              ? {
                  width: articleRect.width,
                  height: articleRect.height,
                  top: articleRect.top,
                  left: articleRect.left,
                  right: articleRect.right,
                }
              : null,
            aside: asideRect
              ? {
                  width: asideRect.width,
                  height: asideRect.height,
                  top: asideRect.top,
                  left: asideRect.left,
                }
              : null,
            h1: h1Rect
              ? {
                  width: h1Rect.width,
                  top: h1Rect.top,
                  bottom: h1Rect.bottom,
                }
              : null,
            headerBottom: headerRect ? headerRect.bottom : 0,
          };
        });

        if (vp.width >= 1024) {
          if (layoutMetrics.article && layoutMetrics.aside) {
            const articleWidth = layoutMetrics.article.width;
            const asideWidth = layoutMetrics.aside.width;
            const isOverlap = layoutMetrics.article.right > layoutMetrics.aside.left + 2;

            if (articleWidth < 500) {
              console.error(`❌ [${vp.name}] Article width too narrow: ${articleWidth}px`);
              totalErrors++;
            }
            if (asideWidth < 300) {
              console.error(`❌ [${vp.name}] Aside width too narrow: ${asideWidth}px`);
              totalErrors++;
            }
            if (isOverlap) {
              console.error(
                `❌ [${vp.name}] Article & Aside OVERLAP! article.right=${layoutMetrics.article.right}, aside.left=${layoutMetrics.aside.left}`
              );
              totalErrors++;
            } else {
              console.log(
                `✓ [${vp.name}] 2-Column layout healthy: Article=${Math.round(articleWidth)}px, Aside=${Math.round(asideWidth)}px, No Overlap`
              );
              totalPassed++;
            }
          }
        }

        // 3. Check H1 spacing
        if (layoutMetrics.h1) {
          if (layoutMetrics.h1.top < layoutMetrics.headerBottom) {
            console.error(
              `❌ [${vp.name}] H1 is obscured by Header! h1.top=${layoutMetrics.h1.top} < headerBottom=${layoutMetrics.headerBottom}`
            );
            totalErrors++;
          }
        }

        // Take full screenshot
        const screenshotPath = path.join(QA_DIR, `${pageInfo.name}_${vp.name}.png`);
        const buffer = await page.screenshot({ fullPage: true });
        fs.writeFileSync(screenshotPath, buffer);

      } catch (err) {
        console.error(`❌ Error on ${pageInfo.name} at ${vp.name}:`, err.message);
        totalErrors++;
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();
  console.log(`\n=== QA Complete. Total Passed: ${totalPassed} | Total Errors: ${totalErrors} ===`);
  if (totalErrors > 0) {
    process.exit(1);
  }
}

runQA();
