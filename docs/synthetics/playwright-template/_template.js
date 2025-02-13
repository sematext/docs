// ------------------------ SETUP CODE ------------------------
// Don't edit this, just scroll down to the UJS CODE section
// Remember to install Playwright with `npm install` first
import { chromium } from 'playwright';

// SematextContext mocks how the real context for setting metrics works
// More info here: https://sematext.com/docs/synthetics/metrics/#custom-metrics
class SematextContext {
  setMetric(name, value) {
    if (typeof name !== "string") throw new Error("Metric name should be of type string");
    if (typeof value !== "number") throw new Error("Metric value should be of type number");
    console.log(`\n[INFO] Setting metric: 'synthetics.browser.custom.${name}' = '${value}'\n`);
  }
}

// Main function to set up and execute the script
(async () => {
  const getTimestamp = () => new Date().toLocaleString();

  console.log(`[${getTimestamp()}] Launching browser...`);
  const browser = await chromium.launch({ headless: false });
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  const startTime = new Date().getTime();

  try {
    console.log(`[${getTimestamp()}] Script started!\n`);
    await testPage(page, new SematextContext());
    console.log(`\n[${getTimestamp()}] Script finished!`);
  } catch (error) {
    console.error(`[${getTimestamp()}] Error: ${error.message}`);
    await page.screenshot({ path: 'error.png' });
    console.log(`[${getTimestamp()}] Screenshot saved as 'error.png'.`);
  } finally {
    const endTime = new Date().getTime();
    console.log(`\nExecution time: ${endTime - startTime}ms\n`);
    await new Promise(resolve => setTimeout(resolve, 60000));
    await browser.close();
  }
})();

// ------------------------ UJS CODE ------------------------
// Paste your script here and use `node THIS_FILE_NAME.js` to run it
import { expect } from '@playwright/test';

export default async function testPage(page, context) {
  await page.goto('https://example.com');
  const TARGET_TEXT = 'Example Domain';
  await expect(page.getByText(TARGET_TEXT)).toBeVisible();
  context.setMetric('exampleMetric', 12345);
  await page.screenshot({ path: 'screenshot.png' });
}
