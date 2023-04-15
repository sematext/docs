const assert = require('assert');

async function testPage(page) {
    await page.goto('https://www.airbnb.com/');
    // select place
    await page.type('#Koan-magic-carpet-koan-search-bar__input', 'Sunnyvale, CA');
    await page.waitForSelector('#Koan-magic-carpet-koan-search-bar__option-0');
    await page.click('#Koan-magic-carpet-koan-search-bar__option-0');
    // select dates
    await page.click('[aria-roledescription="datepicker"] [aria-disabled="false"]');
    await page.click('[aria-roledescription="datepicker"] [aria-disabled="false"]');
    // select guests
    await page.click('#lp-guestpicker');
    await page.waitForSelector('#lp-guestpicker ~div [aria-label="add"]');
    await page.click('#lp-guestpicker ~div [aria-label="add"]');
    await page.click('#filter-panel-save-button');
    // submit
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('[type=submit]'),
    ]);
    await page.waitForSelector('[itemprop=itemListElement] a');
    await page.screenshot('sunnyvale.jpg');
    // select first property in the listings
    const propertyName = await page.evaluate(() => document.querySelector('[itemprop=itemListElement] a').getAttribute('aria-label'));
    console.log(propertyName);
    assert.notEqual(propertyName, null);
}

module.exports = testPage;