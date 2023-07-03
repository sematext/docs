async function testPage(page) {
    await page.goto('https://abookapart.com/products/cross-cultural-design');
    await page.waitForSelector('.buy-option input');
    await page.click('.buy-option input');
    await page.click('.buy-options__btn');
    await page.waitForSelector('.icartCheckoutBtn');
    await page.click('.icartCheckoutBtn');
    await page.waitForSelector('#email');
    await page.type('#email', 'john@reddiff.com');
    await page.type('[name="firstName"]', 'John');
    await page.type('[name="lastName"]', 'Adams');
    await page.type('[name="address1"]', '52, Sunset Blvd');
    await page.type('[name="city"]', 'Los Angeles');
    await page.type('[name="postalCode"]', '90001');
    await page.type('[name="phone"]', '5551234567');
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);
    await page.screenshot({ path: 'shoppingcart.jpg' });
}

module.exports = testPage;