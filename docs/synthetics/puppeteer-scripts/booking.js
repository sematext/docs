const assert = require('assert');

async function testPage(page) {
    await page.goto('https://www.airbnb.com/');
    // open search bar
    page.waitForNavigation();
    await page.waitForSelector('label[for="bigsearch-query-location-input"]');
    await page.click('label[for="bigsearch-query-location-input"]');
    // enter date
    await page.$eval('[data-testid="structured-search-input-field-split-dates-0"]', el => el.click());
    await page.click('td[aria-disabled="false"]');
    await page.click('td[aria-disabled="false"] + td');
    // select guests
    await page.click('[data-testid="structured-search-input-field-guests-button"]');
    await page.click('[data-testid="stepper-adults-increase-button"]');
    // search
    await page.click('[data-testid="structured-search-input-search-button"]');
    // select first property in the listings
    await page.waitForSelector('[itemprop=itemListElement] a');
    await page.screenshot({ path: 'bookings.jpg' });
    // select first property in the listings
    const propertyName = await page.evaluate(() => document.querySelector('[data-testid="listing-card-title"]').textContent);
    console.log(propertyName);
    assert.notEqual(propertyName, null);
}

module.exports = testPage;