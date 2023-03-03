async function testPage(page) {
    await page.goto('https://sematext.com/');
    await page.waitForXPath('//*[contains(., "Troubleshooting Just Got Easier")]');
    await page.screenshot({ path: 'screenshot.jpg' });
}

module.exports = testPage;