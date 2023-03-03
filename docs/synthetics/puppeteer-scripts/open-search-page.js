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
    const link = await page.evaluate(() => document.querySelector('#r1-0 a').getAttribute('href'));
    assert.equal(link, 'https://www.google.com/');
}

module.exports = testPage;