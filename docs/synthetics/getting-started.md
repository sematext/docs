title: Getting Started with Sematext Synthetics
description: Getting started with Sematext Synthetics monitoring

To start monitoring your website or API, create a Sematext Cloud account in either EU or US and then:

 * [Click here](https://apps.sematext.com/ui/synthetics-create/app/Synthetics) to create the App in the US data center; or
 * [Click here](https://apps.eu.sematext.com/ui/synthetics-create/app/Synthetics) to create the App in the EU data center

## Create a Synthetics App

- Enter a name for your Synthetics App. Using the domain or API endpoint you want to monitor works well here.
- After naming your App, choose the type of monitor you want to create.

<img
  class="content-modal-image"
  alt="Choose Monitor Type - HTTP or Browser"
  src="/docs/images/synthetics/create-first-monitor.png"
  title="Choose Monitor Type - HTTP or Browser"
/>

### HTTP Monitor

The [HTTP monitor](/docs/synthetics/http-monitor/) sends a single HTTP request to the specified URL and records the response — status code, headers, body, and timing metrics. Use it to monitor APIs, endpoints, or any URL where you want to verify availability and response correctness.

### Browser Monitor

The [Browser monitor](/docs/synthetics/browser-monitor/) loads a URL or executes a script in a real Chrome browser. It records performance metrics, screenshots, and Web Vitals. Use it to monitor web pages or simulate user journeys across multiple pages.
