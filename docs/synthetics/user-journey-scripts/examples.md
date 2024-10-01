title: User Journey Script Examples
description: Examples of how to write User Journey scripts to perform various tasks

Several examples of some common use-cases which can be used as a starting point are available when creating a new monitor. These can be accessed by clicking the `Browse Examples` button on the `Configure URL/Script` page when creating a new monitor.

![Browse Examples](../../images/synthetics/browse-ujs-examples.png)

These examples are also publicly available [here](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts), while a description for each of these can be found below.


## Examples List

### [Load a web page](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/load-web-page.js)

This is a simple example of a browser script that loads a website and takes a screenshot of a page when the navigation is complete. JPEG and PNG formats are supported for screenshot images. Only one screenshot is allowed per script for Pay-As-You-Go and Standard plans, while the Pro plan supports up to three screenshots per script. The `testScript()` function inside of which you write your script gets the Playwright `page` object as a parameter.



### [Navigate to a specific page](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/navigate-specific-page.js)

This script visits a web page, navigates to a specific page and verifies that the title of the page is as expected. The expect available in Playwright can be used for this. When an assertion fails, the script will fail and details of the failure can be seen in the logs.



### [Search](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/open-search-page.js)

This script loads the DuckDuckGo search page, enters a search term, submits the page using the Enter key (simulates key press event) and waits for the results to load. Then it extracts the first item from the search result and verifies the value of the link.



### [Login](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/login-wiki.js)

This script loads the web page, navigates to the login page, fills in the login details and submits the form. After logging in it navigates to the user profile page and verifies the logged-in user name by extracting the value from the page content.



### [Use Sensitive Data](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/use-sensitive-data.js)

This script utilizes our [Sensitive Data protection feature](./sensitive-data.md) to load possible user secrets such as usernames and passwords. We navigate to our desired page and fill in the form. For sensitive data we use the secret keys instead of the actual credentials. When this script is run, our script manager will automatically replace the secret key with the actual value.



### [Fetch and use a token](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/fetch-use-token.js)

This script demonstrates how to fetch a token from an authentication API, then use that token in a different request to a secure endpoint.

We recommend using our [Sensitive Data](./sensitive-data.md) feature (mentioned in the previous example) to store the passwords and other credentials you use for performing the authentication. 



### [Shopping Cart](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/shopping-cart.js)

This script navigates to an e-commerce website, adds an item to the cart and fills in the form for the checkout process.



### [Single Page Application](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/single-page-app.js)

This script goes to our own app which is a single-page application. It waits for the page to load, then clicks on a button to navigate to a different page. 

Since this is a SPA the elements are loaded asynchronously, so we cannot rely on the navigation event. It waits for a specific elements to appear, and then take screenshots once those specific elements appear. In the whole script, there is only a single page load during the initial launch of the web page. 
We can also use the `waitForURL` function to wait for a specific URL to appear instead of waiting for specific elements to appear



### [Using custom metrics](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/custom-metric.js)

Browser monitors allow you to define and collect custom metrics in the script. Custom metrics can be a value from a web page element, any performance metric that is not supported out of the box in Sematext Browser monitors, or any custom measurement (e.g. time to display suggestions in autocomplete) that needs custom logic. Once the measurement is added in the script, you can see its value in the run results and chart it in your Dashboards.

The script uses the Performance API of the Chrome browser to fetch the JavaScript script duration and heap size metrics, then adds those values as custom metrics using the `context.setMetric(name, value)` API. Note that `context` is defined as the second parameter of the `testPage()` function, so remember to include it in your script.



### [Defining custom metrics from JSON](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/custom-metric-json.js)

Custom metrics can also be collected from sources other than CDP. In this example, a JSON response is grabbed from an API response and used to define custom metrics. Like in the previous example, custom metrics defined this way can be used as data sources for charts. With custom metrics you can do a lot more than just monitor performance, such as keeping an eye out if it'll be rainy tomorrow from some weather report API and sending yourself an alert, or charting the number of users on the various services you offer over time to analyze trends.

This example showcases invoking an endpoint which provides information about currency exchange rates, then defining custom metrics based on those values. These could then be used as a basis for charts, and alerts could be created if these exchange rates reach a certain point.



### [Request interception](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/request-interception.js)

This script utilizes Playwright's route feature to intercept and then block any URLs containing a string from a pre-defined list. If a requested URL contains any of these strings, the request will be blocked and logged..


### [Extract Google Play Store metrics](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/google-play.js)

This script will scrape and extract various metrics related to an App listed on the Google Play Store, as described in [How to monitor a mobile App’s store ratings with Sematext](https://sematext.com/blog/how-to-monitor-mobile-app-store-ratings-with-sematext/).
The script navigates through the App's store page, capturing and processing data such as overall ratings, the number of reviews, and the number of downloads.



### [Extract Apple Store metrics](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/apple-store.js)

This script will scrape and extract various metrics related to an App listed on the Apple Store, as described in [How to monitor a mobile App’s store ratings with Sematext](https://sematext.com/blog/how-to-monitor-mobile-app-store-ratings-with-sematext/).
The script waits for the reviews elements to appear, and then extracts the App's rating, total reviews, and percentages of 5-star, 4-star, 3-star, 2-star, and 1-star ratings. The extracted values are then defined as custom metrics using the Sematext context.

### [Extract Page Load Timings](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/multiple-page-load-times.js)

This script visits multiple pages and records their individual load times as [custom metrics](https://sematext.com/docs/synthetics/metrics/#custom-metrics), which can then be charted using our [dashboards](https://sematext.com/docs/dashboards/).

### [Multiple Browser Tabs](https://github.com/sematext/docs/tree/master/docs/synthetics/playwright-scripts/multi-tab.js)

This script launches and interacts with multiple browser tabs. It first navigates to a specified URL and waits for it to load. Once loaded it then opens a link in the page in a new browser tab. It then gets the new tab and captures a screenshot.
