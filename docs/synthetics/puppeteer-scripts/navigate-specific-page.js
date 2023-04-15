const assert = require('assert');

async function testPage(page) {
    // visit the home page
    await page.goto('https://www.apple.com/');
    // navigate to Music page. You can use selectors to click
    // any element. For more info refer to https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
    await Promise.all([
        page.waitForNavigation(),
        page.click('[href="/music/"]'),
    ]);
    const title = await page.title();
    console.log(title);
    // verify the title
    assert.equal(title, 'Music - Apple');
    await page.screenshot({ path: 'screenshot.jpg' });
}

module.exports = testPage;