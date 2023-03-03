const assert = require('assert');

async function testPage(page) {
    await page.goto('https://en.wikipedia.org/');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#pt-login'),
    ]);
    const userName = '<username>';
    await page.type('#wpName1', userName);
    await page.type('#wpPassword1', '<password>');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#wpLoginAttempt'),
    ]);
    await Promise.all([
        page.waitForNavigation(),
        page.click('#pt-userpage'),
    ]);
    const userNameFromPage = await page.evaluate(() => document.querySelector('#firstHeading').textContent);
    console.log(userNameFromPage);
    assert.equal(userNameFromPage.split(':')[1].toLowerCase(), userName.toLowerCase());
}

module.exports = testPage;