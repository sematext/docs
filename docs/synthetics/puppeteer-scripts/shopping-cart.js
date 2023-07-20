async function testPage(page) {  
    await page.goto('https://abookapart.com/products/cross-cultural-design');
    await page.waitForSelector('.buy-option input');
    await page.click('.buy-option input');
    await page.click('.buy-options__btn');
    await page.waitForSelector('.icartCheckoutBtn');
    await page.click('.icartCheckoutBtn');

    // Fill out the form
    await page.waitForSelector('#email');
    await page.type('#email', 'john@example.com');
    await page.type('[name="firstName"]', 'John');
    await page.type('[name="lastName"]', 'Smith');
    await page.type('[name="address1"]', '52, Sunset Blvd');
    await page.type('[name="city"]', 'Los Angeles');
    await page.select('[id="Select1"]', 'CA');
    await page.type('[name="postalCode"]', '90001');
    await page.type('[name="phone"]', '16468955093');
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);
    await page.screenshot({ path: 'shoppingCart.jpg' });
}

module.exports = testPage;