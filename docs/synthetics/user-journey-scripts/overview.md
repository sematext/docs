title: User Journey Scripts
description: User Journey scripts for monitoring multi-page and multi-step user journeys

To monitor a single website, you can directly configure the URL of the website to be monitored. This can be accomplished with either [HTTP Monitor](./http-monitor.md) or [Browser Monitor](./browser-monitor.md). To monitor a user journey across multiple pages or perform actions on your website, you use a Browser monitor configured with a User Journey script that simulates user actions.

When you configure the URL of the website, the Browser monitor will load the URL in the Google Chrome browser and, among other things, take a screenshot of the website once the page load is complete.

The User Journey scripts are Node.js scripts that control a headless Chrome browser and use the [Google Puppeteer](https://github.com/puppeteer/puppeteer#puppeteer) framework to control the browser. They can be up to 32 KB in size.  For every run, the monitor will invoke the `testScript()` function with the Puppeteer [Page](https://pptr.dev/next/api/puppeteer.page) object as a parameter. The script content should be inside the `testScript()` function, though you can also define other helper functions which you can call inside of `testScript()`. For more information on specific use cases, check out the [examples](./examples.md) page, or refer to the **Browse Examples** section while creating or editing a Browser Monitor.

![Browse Examples](../../images/synthetics/browse-ujs-examples.png)

Use the Node.js [assert](https://nodejs.org/api/assert.html) API to check if the values in the page match your requirements. If any assertion fails, the system declares the run as a failure. The **Logs** and **Script Error** tabs , shown in the **Run Details** page, contain information about the cause of the failed run.

For examples of implementing some common use-cases in User Journey scripts, check out the [examples](./examples.md) page.