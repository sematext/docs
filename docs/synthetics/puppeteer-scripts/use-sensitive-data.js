async function testPage(page) {
    await page.goto('https://en.wikipedia.org/');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#pt-login'),
    ]);
    // Uses Secret Keys instead of actual credentials
    await page.type('#wpName1', '$__username__');
    await page.type('#wpPassword1', '$__password__');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#wpLoginAttempt'),
    ]);
}

module.exports = testPage;