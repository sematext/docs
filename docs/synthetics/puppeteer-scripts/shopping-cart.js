const assert = require('assert');

async function testPage(page) {
  await page.goto('https://abookapart.com/products/practical-pair-programming');

  // Set the screen resolution, as things render differently on different screen widths
  await page.setViewport({
    width: 1200,
    height: 800,
  })

  // Choose paperback book and click buy
  const PAPERBACK_VERSION_SELECTOR = '.buy-option';
  await page.waitForSelector(PAPERBACK_VERSION_SELECTOR);
  await page.click(PAPERBACK_VERSION_SELECTOR);

  const PURCHASE_BUTTON_SELECTOR = '.buy-options__btn';
  await page.click(PURCHASE_BUTTON_SELECTOR);

  // The display of the checkout button can vary (perhaps A/B testing), this picks the correct one
  await page.waitForTimeout(2000);
  let CHECKOUT_SELECTOR = '[name="icartCheckout"]'
  let checkoutExists = await page.$(CHECKOUT_SELECTOR);
  if (checkoutExists === null) CHECKOUT_SELECTOR = '[name="checkout"]';
  await page.waitForSelector(CHECKOUT_SELECTOR);
  await page.click(CHECKOUT_SELECTOR);

  // Fill out the form
  await page.waitForSelector('#email');
  await page.type('#email', 'john@example.com');

  const COUNTRY_SELECTOR = '[name="countryCode"]';
  await page.waitForSelector(COUNTRY_SELECTOR);
  await page.select(COUNTRY_SELECTOR, 'United States');

  // Slight delay for the form to adjust to the country selection
  await page.waitForTimeout(1000);

  await page.type('[name="firstName"]', 'John');
  await page.type('[name="lastName"]', 'Smith');
  await page.type('[name="address1"]', '42, Example Rd');
  await page.type('[name="city"]', 'Montgomery');

  const STATE_SELECTOR = '[name="zone"]';
  await page.waitForSelector(STATE_SELECTOR);
  await page.select(STATE_SELECTOR, 'Alabama');
  await page.type('[name="postalCode"]', '35004');
  await page.type('[name="phone"]', '+19517654321');

  // Choose PayPal and wait a bit for the credit card section to be fully collapsed before taking a screenshot
  await page.click('[for="basic-PAYPAL_EXPRESS"]')
  await page.waitForTimeout(300);

  // Make sure that the button for finalizing the purchase has rendered
  const PAY_BUTTON_SELECTOR = await page.$('[id="pay-button-container"]');
  assert(PAY_BUTTON_SELECTOR !== null);
  
  await page.screenshot({ path: 'shoppingCart.jpg', fullPage: true });
}

module.exports = testPage;