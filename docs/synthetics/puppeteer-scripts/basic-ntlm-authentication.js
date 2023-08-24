// This script uses Puppeteer to authenticate and take a screenshot of the page
async function testPage(page) {
  // provide credentials and authenticate
  page.authenticate({username: 'user', password: 'pass'});

  // visit the page that requires authentication
  await page.goto('https://authenticationtest.com/HTTPAuth/');

  // take a screenshot
  await page.screenshot({ path: 'screenshot.jpg' });
}

module.exports = testPage;