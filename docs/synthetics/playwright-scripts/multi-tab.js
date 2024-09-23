export default async function testPage(page) {
  // Navigate to w3schools.com and take a screenshot
  await page.goto('https://www.w3schools.com/', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'firstTab.png' });

  // Get browser context to listen for new page
  const browserContext = page.context();

  // Get new tab that is opened after link is clicked
  const [newPage] = await Promise.all([
    browserContext.waitForEvent('page'),
    page.getByRole('link', { name: 'W3Schools Certificates' }).click()
  ]);

  // Wait for the new page to load and take a screenshot
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.screenshot({ path: 'secondTab.png' });

}
