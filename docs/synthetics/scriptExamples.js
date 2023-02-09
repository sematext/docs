/* eslint-disable max-len */
export const SCRIPT_EXAMPLES = [
  {
    name: 'Load a web page',
    description: `This is a simple example of a browser script that loads a website
    and takes a screenshot of a page when the navigation is complete.
    JPEG and PNG formats are supported for screenshot images.
    Only one screenshot is allowed per script.
    The script gets the Puppeteer \`page\` object as a parameter.`,
    script: `async function testPage(page) {
  // visit the home page
  await page.goto('https://www.apple.com/');
  // take screenshot of the home page
  await page.screenshot({ path: 'screenshot.jpg' });
}
    
module.exports = testPage;`,
  },
  {
    name: 'Navigate to a specific page',
    descriptionWithLink: () => (<span>This script visits a web page, navigates to a specific page
      and verifies the title of the page is as expected. Node.js assert API can
      be used for verification. When an assertion fails, the script will fail and details of
      the failure can be seen in logs. The below example used Puppeteer click API with
      specific selector to navigate to a specific page. For more info on selectors check out&nbsp;
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors" target="_blank">
        https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
      </a>
    </span>),
    hasLlinks: true,
    script: `const assert = require('assert');

async function testPage(page) {
  // visit the home page
  await page.goto('https://www.apple.com/');
  // navigate to Music page. You can use selectors to click
  // any element. For more info refer to https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
  await Promise.all([
    page.waitForNavigation(),
    page.click('[href="/music/"]'),
  ]);
  const title = await page.title();
  console.log(title);
  // verify the title
  assert.equal(title, 'Music - Apple');
  await page.screenshot({ path: 'screenshot.jpg' });
}

module.exports = testPage;`,
  },
  {
    name: 'Search',
    description: `This script loads DuckDuckGo search page, enters a search term,
    submit the page using Enter key (simulates keypress event) and waits
    for the results to load. Then it extracts the first item from the search result
    and verifies the value of the link.`,
    script: `const assert = require('assert');

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

module.exports = testPage;`,
  },
  {
    name: 'Login',
    description: `This script loads the web page, navigate to the login page,
    fill up the login details and submit the form. After login
    it navigates to the user profile page. Then it verifies
    the logged-in user name by extracting the value from the page content.
    You can read the values from page content using page.evaluate() API.`,
    script: `const assert = require('assert');

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
    
module.exports = testPage;`,
  },
  {
    name: 'Use Sensitive Data',
    description: `This scripts utilizes our secrets feature to load possible sensitive data such as usernames and passwords.
    We navigate to our desired page and fill up the form. For sensitive data we use the secret keys instead of the actual credentials.
    When this script is run our script manager will automatically replace the secret key with the actual value.`,
    script: `async function testPage(page) {
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
    
module.exports = testPage;`,
  },
  {
    name: 'Fetch and use a token',
    descriptionWithLink: () => (<span>This script demonstrates how to fetch a token from an authentication
      API, then use that token in a different request to a secure endpoint. We recommend using our&nbsp;
      <a href="https://sematext.com/docs/synthetics/user-journey-scripts/#storing-your-user-journey-script-credentials-securely">
        Sensitive Data
      </a> feature to store the passwords and other credentials you use for performing the authentication.&nbsp;</span>),
    hasLlinks: true,
    script: `async function testPage(page) {
  await page.setRequestInterception(true);
  // Intercept the next request, change its method to POST and add the request body
  page.once("request", async interceptedRequest => {
    interceptedRequest.continue({
      method: "POST",
      postData: '{"username": "exampleUser","password": "examplePassword"}',
      headers: { ...interceptedRequest.headers(), "content-type": "application/json" }
    });
  });

  // Sending first request to get token
  const response = await page.goto("https://private-xxxxx.apiary-mock.com/authenticate");
  bodyJSON = await response.json();
  // response.text() prints out the response body as a string, useful if you're not using JSON
  // response.json() parses the response body JSON and throws an error if it isn't valid JSON
  console.log({
    url: response.url(),
    statusCode: response.status(),
    body: await response.text(),
    bodyJSON
  });

  // Intercept the next request, change its method to POST and add the request body using the response we got from the first request
  page.once("request", async interceptedRequest => {
    interceptedRequest.continue({
      method: "POST",
      postData: \`{ "token": "\${bodyJSON.token}" }\`,
      headers: { ...interceptedRequest.headers(), "content-type": "application/json" }
    });
  });

  // Sending second request using info from the first response
  const result = await page.goto("https://private-xxxxx.apiary-mock.com/exampleSecureEndpoint");
  console.log({
    url: result.url(),
    statusCode: result.status(),
    body: await result.text()
  });
}
    
module.exports = testPage;`,
  },
  {
    name: 'Shopping Cart',
    description: `This scripts launch Shopify based e-commerce website, adds a book to the cart,
    checkout, fills the checkout form (text input and selects) and proceeds to payment.`,
    script: `async function testPage(page) {
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
    
module.exports = testPage;`,
  },
  {
    name: 'Single Page Application',
    description: `In single-page apps, the page load happens only during the initial launch.
    Any navigation across the app does not trigger a new page load/navigation event.
    The script has to rely on the visibility/availability of elements for the navigation.
    This script launches a single-page app. The elements are loaded async, so we cannot
    rely on navigation event. It waits for a specific element (sign up link) to appear,
    clicks the element, then waits for sign up form to load and then goes back to the login page.
    In the whole script, there is only a single page load during the initial launch of the web page.
    All other navigations do not trigger any page loads.`,
    script: `async function testPage(page) {
  await page.goto('https://www.instagram.com/');
  // wait for sign up link element to appear, since it is loaded asynchronously
  await page.waitForSelector('a[href="/accounts/emailsignup/"]');
  await page.click('a[href="/accounts/emailsignup/"]');
  // again wait for login link to appear
  await page.waitForSelector('a[href="/accounts/login/?source=auth_switcher"]');
  await page.click('a[href="/accounts/login/?source=auth_switcher"]');
  await page.waitForSelector('a[href="/accounts/password/reset/"]');
}
    
module.exports = testPage;`,
  },
  {
    name: 'Booking',
    description: `This script launches a booking website (AirBnB) and searches for properties 
    in a specific location and date by filling out a form.
    It submits the form and waits for listings to load.
    Then it fetches the name of the first listing and prints it.
    The form filling is done by driving multiple popups.`,
    script: `const assert = require('assert');

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
    
module.exports = testPage;`,
  },
  {
    name: 'Using Custom metrics',
    description: `Browser monitor supports the collection of custom metrics in the script.
    Custom metrics can be a value from web page element, any performance metric
    that is not supported out of the box in Sematext Browser monitor, or any custom
    measurement (e.g. time to display suggestions in autocomplete) that needs custom logic.
    Once the measurement is added in the script, you can use Custom Chart
    to build charts for this custom metric.
    
    The script uses the Performance API of the Chrome browser to fetch script duration &
    JavaScript Heap Size and add them as custom metrics using the \`context.setMetric(name, value)\` API.
    Note that \`context\` is defined as the second parameter of the \`testPage\` function.`,
    script: `async function testPage(page, context) {
  // Create a Chrome DevTools Protocol (CDP) session and start measuring performance metrics
  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');
  await page.goto('https://youtube.com/');
  
  // Fetch all the performance metrics and choose the ones we want
  const performanceMetrics = await client.send('Performance.getMetrics');
  const scriptDuration = performanceMetrics.metrics.find((x) => x.name === 'ScriptDuration').value;
  const usedHeap = performanceMetrics.metrics.find((x) => x.name === 'JSHeapUsedSize').value;
  
  // Define the chosen metrics as custom metrics in Sematext Synthetics
  // The metric names should be unique for this Synthetics application
  context.setMetric('heap.size', usedHeap);
  context.setMetric('script.time', scriptDuration);

  // Log out the values at the start to make sure you're getting the metrics
  console.log(usedHeap);
  console.log(scriptDuration);
}

module.exports = testPage;`,
  },
  {
    name: 'Defining Custom metrics from a JSON Response',
    description: `Custom metrics can also be collected from sources other than CDP.
    In this example, a JSON is grabbed from an API response and used to define custom
    metrics. Like in the example above, custom metrics defined this way can be used
    as data sources for charts. With custom metrics you can do a lot more than just
    monitor performance, such as keeping an eye out if it'll be rainy tomorrow from
    some weather report API and sending yourself an alert, or charting the number of
    users on the various services you offer over time to analyze trends.

    This example showcases invoking an endpoint which provides information about currency
    exchange rates, then defining custom metrics based on those values. These could then
    be used as a basis for charts, and alerts could be created if these exchange rates
    reach a certain point.`,
    script: `// This script gets the exchange rates of various currencies and defines the results as custom metrics
async function testPage(page, context) {
  const response = await page.goto("https://api.exchangerate.host/latest");
  bodyJSON = await response.json();
  
  // Extract the values from the response JSON and define them as custom metrics
  const USD = bodyJSON.rates.USD;
  const AUD = bodyJSON.rates.AUD;
  const CNY = bodyJSON.rates.CNY;
  context.setMetric('currency.EUR-USD', USD);
  context.setMetric('currency.EUR-AUD', AUD);
  context.setMetric('currency.EUR-CNY', CNY);

  // Log out the values at the start to make sure you're getting the metrics
  console.log(USD);
  console.log(AUD);
  console.log(CNY);
}

module.exports = testPage;`,
  },
  {
    name: 'Request interception',
    description: `This script utilizes Puppeteer's request interception feature to intercept and 
    then block any URLs containing a string from a pre-defined list.
    If a requested URL contains any of these strings, the request will be blocked and logged.`,
    script: `// Block requests to certain URLs
const blockList = [
  'google-analytics',
  'googleadservices.com',
  'googlesyndication',
];

async function testPage(page) {
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (blockList.some(resource => request.url().includes(resource))) {
      // Remove this log statement once you verify that the requests are being blocked
      console.log("Blocked:", request.url());
      request.abort();
    }
    else request.continue();
  });
  await page.goto('https://sematext.com/');
  await page.screenshot({ path: 'screenshot.jpg' });
}
    
module.exports = testPage;`,
  },
  {
    name: 'Text Search',
    descriptionWithLink: () => (
      <span>
        This script uses <a target="_blank" href="https://pptr.dev/api/puppeteer.page.waitforxpath">waitForXpath</a> to
        search for the text “Troubleshooting Just Got Easier” on the page.
      </span>
    ),
    script: `
async function testPage(page) {
  await page.goto('https://sematext.com/');
  await page.waitForXPath('//*[contains(., "Troubleshooting Just Got Easier")]');
  await page.screenshot({ path: 'screenshot.jpg' });
}
    
module.exports = testPage;`,
  },
];
