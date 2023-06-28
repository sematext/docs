const assert = require('assert');

async function testPage(page) {
    const assert = require('assert');
    await page.goto('https://en.wikipedia.org/');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#pt-login-2'),
    ]);
    const userName = 'Sematext-wiki';
    await page.type('#wpName1', userName);
    await page.type('#wpPassword1', 'semapassword');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#wpLoginAttempt'),
    ]);
    await Promise.all([
        page.waitForNavigation(),
        page.click('#pt-userpage-2'),
    ]);
    const userNameFromPage = await page.evaluate(() => document.querySelector('#firstHeading').textContent);
    console.log(userNameFromPage);
    assert.ok(userNameFromPage.split(',')[1].toLowerCase().includes(userName.toLowerCase()));
}

module.exports = testPage;