async function testPage(page) {
    await page.goto('https://abookapart.com/products/cross-cultural-design');
    await Promise.all([
        page.waitForNavigation(),
        page.click('.product-option-paperback button'),
    ]);
    await Promise.all([
        page.waitForNavigation(),
        page.click('.cart-checkout-button'),
    ]);
    await page.type('#checkout_email', 'john@reddiff.com');
    await page.waitFor(1000);
    await page.type('#checkout_shipping_address_first_name', 'John');
    await page.type('#checkout_shipping_address_last_name', 'Adams');
    await page.type('#checkout_shipping_address_address1', '52, Sunset Blvd');
    await page.type('#checkout_shipping_address_city', 'Los Angeles');
    await page.select('#checkout_shipping_address_country', 'United States');
    await page.select('#checkout_shipping_address_province', 'CA');
    await page.type('#checkout_shipping_address_zip', '90001');
    await page.type('#checkout_shipping_address_phone', '+10011001100');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#continue_button'),
    ]);
    await page.screenshot('shoppingcart.jpg');
}

module.exports = testPage;