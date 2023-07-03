const assert = require('assert');

async function testPage(page) {
    await page.goto('https://duckduckgo.com/');
    await page.type('#search_form_input_homepage', 'google');
    await Promise.all([
        page.waitForNavigation({
            waitUntil: 'networkidle0',
        }),
        // press enter key
        page.keyboard.press(String.fromCharCode(13)),
    ]);
    const link = await page.$('#r1-0 a[href="https://www.google.com/"]');
    assert.notEqual(link, null);
}

module.exports = testPage;