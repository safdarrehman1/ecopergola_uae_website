const { chromium } = require('playwright');
const fs = require('fs');

async function verify() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  console.log('Navigating to http://localhost:3000/en ...');
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });

  // Wait for 3D ribbon canvas
  await page.waitForSelector('.shader-frame canvas.gallery__canvas', { timeout: 10000 });
  console.log('Found 3D ribbon canvas!');
  await page.waitForTimeout(3000);

  fs.mkdirSync('scratch', { recursive: true });
  await page.screenshot({ path: 'scratch/minimal-hero.png' });
  console.log('Captured scratch/minimal-hero.png');

  // Capture services section
  const services = page.locator('#services');
  if (await services.isVisible()) {
    await services.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratch/minimal-services.png' });
    console.log('Captured scratch/minimal-services.png');
  }

  // Capture products section
  const products = page.locator('#products');
  if (await products.isVisible()) {
    await products.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratch/minimal-products.png' });
    console.log('Captured scratch/minimal-products.png');
  }

  // Capture pergola types section
  const pergolas = page.locator('#pergola-types');
  if (await pergolas.isVisible()) {
    await pergolas.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratch/minimal-pergolas.png' });
    console.log('Captured scratch/minimal-pergolas.png');
  }

  // Capture projects section
  const projects = page.locator('#projects');
  if (await projects.isVisible()) {
    await projects.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scratch/minimal-projects.png' });
    console.log('Captured scratch/minimal-projects.png');
  }

  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('Minimalist verification completed successfully!');
}

verify().catch(e => {
  console.error('Verification failed:', e);
  process.exit(1);
});
