// This script uses Playwright to authenticate and take a screenshot of the page
export default async function testPage(page) {
  // Create a new browser context with HTTP credentials
  const browser = page.context().browser();
  const browserContext = await browser.newContext({
    httpCredentials: {
      username: 'user',
      password: 'pass'
    }
  });
  
  // Override the page by creating a new page in the new context
  page = await browserContext.newPage();
  await page.goto('https://authenticationtest.com/HTTPAuth/');

  // take a screenshot
  await page.screenshot({ path: 'screenshot.jpg' });
}