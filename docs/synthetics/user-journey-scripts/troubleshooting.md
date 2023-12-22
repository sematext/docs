title: Troubleshooting
description: Tips on how to troubleshoot User Journey script issues

Since Browser monitors are a lot more complex than HTTP monitors, you may run into issues when running them. These issues may occur shortly after you create the monitors, after you introduce some changes to your User Journey scripts, or even if the scripts have been untouched for a while. This page will provide a few tips which will help you troubleshoot these issues and ensure your scripts work as expected.



## Troubleshooting tips

Consider the following points when troubleshooting User Journey script issues:


### Be mindful of when the issue first appeared

As mentioned in the introduction, an issue with your Browser monitor's User Journey scripts could appear at various points in time relative to the last time you modified it:

- Immediately after creating the monitor - there's a good chance that the monitor has some sort of syntax or logic errors. Consider using the `Test` button when creating a new monitor to see how it performs before you finalize its creation.
- Shortly after modifying it - the logic changes you recently introduced could be at fault, try reverting the script back to what it was before. We recommend storing your scripts in GitHub and [syncing them with Sematext](./syncing-with-github.md) for easy tracking of changes.
- Randomly, without any changes taking place recently.
- The website you're monitoring could have changed in the meantime. Please review the User Journey described in your script manually in your browser and check for any deviations from it. If the issue persists and pops up intermittently, consider using the *consecutive runs* feature to re-run the monitor multiple times and only mark the run as failed if all those retries fail. This helps filter out connectivity issues and similar intermittent problems.


### Double-check the element selectors manually

When your script fails to interact with a certain element on the page, it's possible that the selector you're using to target the element is incorrect. You should manually double-check the selectors by inspecting the element on the page and comparing it with the selector in your script. In certain cases class names are such that they change every time the website is built, so keep that in mind when deciding on what to use when defining selectors.


### Debug with screenshots and `console.log` statements

Add `console.log` statements to your script during development to identify which parts of the code work and which don't. This helps avoid guesswork when identifying problematic parts of the script.

Also, keep in mind that Browser monitors will try to capture a screenshot titled `error.jpg` whenever an error is encountered in the script. This can help you identify which parts of the page didn't load properly (or if you're even on the correct page).


### Note the dynamic parts of the page

Watch for dynamically changing parts of the website such as popups or forms which change depending on which options are selected. These elements might not appear immediately after the event that triggers them (such as clicking a button). To avoid potential issues with these elements, consider using a combination of manual waits (`page.waitForTimeout`) and waiting for specific selectors of those dynamic elements (`page.waitForSelector`).


### User location may matter

When viewing the website locally or testing from your own machine, check how the website renders based on the location. Things like cookie warnings and other legal notices may pop up, banners featuring special offers or some other location-based promotions could be shown, the main content could be modified due to different languages or cultural preferences etc. To ensure that the monitor will behave the way you want it to, consider using a VPN and select the same location as the one you'll use for that monitor.


### Ensure that the page elements have time to load

If the monitor behavior is inconsistent and runs fail because some elements couldn't be found, consider using `page.waitForTimeout(timeout)` to make sure that the elements on the page have time to load before the script attempts to interact with them. Alternatively, you can use the `{ waitUntil: 'networkidle2' }` option in `page.goto` or `page.waitForNavigation` to wait until there are no more than 2 network connections for at least 500 ms. However, keep in mind that this can lead to a timeout for pages which have a lot of network activity.


### Be mindful of resource load times

If there's a lot of traffic on the page, you could run into an issue where certain resources take much longer to load than others, thus potentially causing the script to time out while waiting for them. Be mindful of resource load times and check the ***Waterfall*** section of the run results for the failed runs. If there are any resources that stand out in terms of how long they took to load, consider blocking them, as seen in the next tip.

It's also possible for the website to have a lot of network activity, which prevents it from registering as fully loaded. Busy websites may cause the scripts to time out, even though the page itself looks completely fine, so try out [different lifecycle event options](https://pptr.dev/api/puppeteer.puppeteerlifecycleevent) and see how they affect your User Journey scripts.


### Block irrelevant domains

The pages you are monitoring may send network requests to other domains, such as those for third party plugins, ads, or social media. Connections to these domains might simply be unnecessary overhead for your script, and by blocking them you can speed up page load times and prevent timeouts. You may also want to block domains for your internal user tracking tools to avoid polluting their data with behavior from Synthetics monitors.

You can use `page.setRequestInterception(true)` and then listen for the `request` event to block requests to certain domains. An example of how to block domains can be seen [here](../puppeteer-scripts/request-interception.js).


### Use AI to help you write scripts

Consider using ChatGPT or some other AI model to help you write the script if you're having trouble. Make sure to describe the use case and/or issues in detail, specify selectors for the elements on the page which you want to interact with (after verifying them yourself), and request corrections or changes as needed. Remember that you only have access to the `page` object as one of the parameters of the mandatory `testPage(page)` function, so you should ignore parts of the script which deal with launching or closing the browser.
