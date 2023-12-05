const assert = require('assert');

async function testPage(page) {
    await page.setViewport({ width: 1280, height: 800 });
    // Visit the home page
    await page.goto('https://www.apple.com/');

    // Navigate to Music page. You can use selectors to click any element.
    // For more info refer to https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
    await Promise.all([
        page.waitForNavigation(),
        page.click('[href="/mac/"]'),
    ]);
    const title = await page.title();
    console.log(title);

    // Verify the title
    assert.equal(title, 'Mac - Apple');
    await page.screenshot({ path: 'screenshot.jpg' });
}

module.exports = testPage;