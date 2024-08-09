// This script loads multiple pages and records their individual page load times as custom metrics
async function testPage(page, context) {
  // Setup work - set viewport and define a helper function to calculate load time
  await page.setViewport({ width: 1400, height: 800 })
  const calculateLoadTimeInSeconds = (startTime, endTime) => 
    Number(((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2));

  // Go to the Sematext homepage and record the page load time
	let startTime = new Date();
  await page.goto("https://www.sematext.com/");
  let endTime = new Date();
	let sematextHomePageLoadTime = calculateLoadTimeInSeconds(startTime, endTime);
  console.log('Home Page Load Time:', sematextHomePageLoadTime);
  context.setMetric('sematextHomePageLoadTime', sematextHomePageLoadTime);

  // Hover over dropdown to expand it
  const RESOURCES_DROPDOWN_SELECTOR = '[title="Resources"]';
  await findSelector(page, RESOURCES_DROPDOWN_SELECTOR, 'Resources dropdown');
  await page.hover(RESOURCES_DROPDOWN_SELECTOR);
  await page.waitForTimeout(500); // Wait for the dropdown to expand

  // Simulate clicking the demo button, but don't actually click because it opens a new tab, copy the link instead
  const SYNTHETICS_DOCS_SELECTOR = '[title="Synthetics"]';
  await findSelector(page, SYNTHETICS_DOCS_SELECTOR, 'Synthetics docs button');
  const docsUrl = await page.$eval(SYNTHETICS_DOCS_SELECTOR, element => element.getAttribute('href'));
  console.log('Synthetics docs URL:', docsUrl); // https://sematext.com/docs/synthetics/
  await page.screenshot({ path: '1_homePage.png' });
  
  // Navigate to the Sematext Cloud docs page and record the page load time
  startTime = new Date();
  await page.goto(docsUrl, { waitUntil: 'networkidle2' }); // Using networkidle2 to load all the content
  endTime = new Date();
  let sematextDocsPageLoadTime = calculateLoadTimeInSeconds(startTime, endTime);
  console.log('Docs Page Load Time:', sematextDocsPageLoadTime);
  context.setMetric('sematextDocsPageLoadTime', sematextDocsPageLoadTime);
  await page.screenshot({ path: '2_docsPage.png' });
}
module.exports = testPage;



// ------------------ Helper Functions ------------------

// Keep trying to find the selector for a certain number of attempts
async function findSelector(page, selector, elementName, softWait = false, timeout = 3000, maxRetryCount = 5) {
  // Waits a short amount of time for some tricky elements that may not show up immediately
  if (softWait) await page.waitForTimeout(250);
  let attempts = 0;
  while (attempts++ < maxRetryCount) {
    try {
      await page.waitForSelector(selector, { timeout: timeout });
      console.log(`---Element '${elementName}' found`);
      break;
    } catch (err) {
      console.log(`---Element '${elementName}' not found, retrying...`);
    }
  }
}

// Retries finding a button, then clicks it once it's found
async function findAndClickButton(page, selector, elementName, softWait = false, timeout = 3000, maxRetryCount = 5) {
  await findSelector(page, selector, elementName, softWait, timeout, maxRetryCount);
  await page.click(selector);
}