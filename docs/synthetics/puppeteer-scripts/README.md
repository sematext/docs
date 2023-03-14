# User Journey Examples

This folder contains some common use-cases to get you started with writing your own scripts.

We have added these as part of our public repository so users can improve these or add their own.

## Examples List

- [Load  a web page](./load-web-page.js) 

This is a simple example of a browser script that loads a website and takes a screenshot of a page when the navigation is complete. JPEG and PNG formats are supported   for screenshot images. Only one screenshot is allowed per script. The script gets the Puppeteer `page` object as a parameter.
- [Navigate to a specific page](./navigate-specific-page.js)

This script visits a web page, navigates to a specific page and verifies the title of the page is as expected. Node.js assert API can be used for verification. When an assertion fails, the script will fail and details of the failure can be seen in logs. The example used Puppeteer click API with specific selector to navigate to a specific page. 
For more info on selectors check out https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
- [Search](./open-search-page.js)

This script loads DuckDuckGo search page, enters a search term, submit the page using Enter key (simulates keypress event) and waits for the results to load. Then it extracts the first item from the search result and verifies the value of the link.
- [Login](./login-wiki.js)

This script loads the web page, navigate to the login page, fill up the login details and submit the form. After login it navigates to the user profile page. Then it verifies the logged-in user name by extracting the value from the page content. You can read the values from page content using page.evaluate() API.
- [Use Sensitive Data](./use-sensitive-data.js)

This scripts utilizes our secrets feature to load possible sensitive data such as usernames and passwords. We navigate to our desired page and fill up the form. For sensitive data we use the secret keys instead of the actual credentials. When this script is run our script manager will automatically replace the secret key with the actual value.
- [Fetch and use a token](./fetch-use-token.js)

This script demonstrates how to fetch a token from an authentication API, then use that token in a different request to a secure endpoint. We recommend using our [Sensitive Data](./use-sensitive-data.js) feature to store the passwords and other credentials you use for performing the authentication. 
- [Shopping Cart](./shopping-cart.js)

This scripts launch Shopify based e-commerce website, adds a book to the cart, checkout, fills the checkout form (text input and selects) and proceeds to payment.
- [Single Page Application](./single-page-app.js)

In single-page apps, the page load happens only during the initial launch. Any navigation across the app does not trigger a new page load/navigation event. The script has to rely on the visibility/availability of elements for the navigation. This script launches a single-page app. The elements are loaded async, so we cannot rely on navigation event. It waits for a specific element (sign up link) to appear, clicks the element, then waits for sign up form to load and then goes back to the login page. In the whole script, there is only a single page load during the initial launch of the web page. All other navigations do not trigger any page loads.
- [Booking](./booking.js)

This script launches a booking website (AirBnB) and searches for properties in a specific location and date by filling out a form. It submits the form and waits for listings to load. Then it fetches the name of the first listing and prints it. The form filling is done by driving multiple popups.
- [Using custom metrics](./custom-metric.js)

Browser monitor supports the collection of custom metrics in the script. Custom metrics can be a value from web page element, any performance metric that is not supported out of the box in Sematext Browser monitor, or any custom measurement (e.g. time to display suggestions in autocomplete) that needs custom logic. Once the measurement is added in the script, you can use Custom Chart to build charts for this custom metric. The script uses the Performance API of the Chrome browser to fetch script duration & JavaScript Heap Size and add them as custom metrics using the `context.setMetric(name, value)` API. Note that `context` is defined as the second parameter of the `testPage` function.
- [Defining custom metrics from JSON](./custom-metric-json.js)

Custom metrics can also be collected from sources other than CDP. In this example, a JSON is grabbed from an API response and used to define custom metrics. Like in the example above, custom metrics defined this way can be used as data sources for charts. With custom metrics you can do a lot more than just monitor performance, such as keeping an eye out if it'll be rainy tomorrow from some weather report API and sending yourself an alert, or charting the number of users on the various services you offer over time to analyze trends. This example showcases invoking an endpoint which provides information about currency exchange rates, then defining custom metrics based on those values. These could then be used as a basis for charts, and alerts could be created if these exchange rates reach a certain point.
- [Request interception](./request-interception.js)

This script utilizes Puppeteer's request interception feature to intercept and then block any URLs containing a string from a pre-defined list. If a requested URL contains any of these strings, the request will be blocked and logged.
- [Text search](./text-search.js)

This script uses [waitForXpath](https://pptr.dev/api/puppeteer.page.waitforxpath) to search for the text “Troubleshooting Just Got Easier” on the page.
