async function testPage(page) {
  // Set the screen resolution, as things render differently on different screen widths
  await page.setViewport({
    width: 1200,
    height: 800,
  })

  await page.goto('https://digital-strategy.ec.europa.eu/en/policies/plan-ai');
  await page.screenshot({ path: 'firstTab.png' });

  // Use XPath to select the link based on its text content
  const LINK_TEXT = "plan’s latest update was published in 2021";
  const linkXPath = `//a[text()="${LINK_TEXT}"]`;
  await page.waitForXPath(linkXPath);
  const [linkElement] = await page.$x(linkXPath);

  if (linkElement) {
    await linkElement.click();
    console.log('Link clicked successfully!');
  } else {
    console.error('Link not found');
  }

  // Wait for the new tab to open and switch to it
  await page.waitForTimeout(2500);

  // Get all pages within the same browser context
  const pages = await page.browserContext().pages();

  // The newly opened page should be the last one in the array
  const newPage = pages[pages.length - 1];
  await newPage.waitForTimeout(2500);
  await newPage.screenshot({ path: 'newTab.png' });

  // Log the title of the new tab
  console.log(await newPage.title());
}
module.exports = testPage;
