async function testPage(page) {
    // visit the home page
    await page.goto('https://www.apple.com/');
    // take screenshot of the home page
    await page.screenshot({ path: 'screenshot.jpg' });
}

module.exports = testPage;