title: Browser Monitor
description: Browser monitor can monitor website performance and user journey.

The browser monitor executes the configured script in a Chrome browser. It records various performance metrics during the execution. The script can extract & verify the page content using `assert` API during the execution. It can optionally collect screenshots.

## Configuration

### General

* **Name** - Name of the monitor. Max length is 255 characters.
* **Frequency** - Monitor execution frequency.
* **Locations** - List of locations to run the monitor.

### Script

The browser monitor scripts are Node.js scripts that control a headless Chrome browser and use [Google Puppeteer](https://github.com/puppeteer/puppeteer#puppeteer) framework to drive the browser. For every run, the monitor will invoke the `testScript()` method with Puppeteer [Page](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-page) object as a parameter. The script content should be inside the `testScript()` method. For more information on specific use cases, refer to the `Browser Examples` section while creating a browser monitor. Use Node.js [assert](https://nodejs.org/api/assert.html) API to check if the values in the page match your requirements. If any assertion fails, the system declares the run as a failure. Monitor run logs, shown in Sematext Run details page, contain failure details.

## Conditions

Condition types supported in the browser monitor are:

* **Error** - During each run, if there are any errors like navigation timeout, assertion failed, etc., it will be recorded in the error field of the response. This does not include the error returned as part of the response body. 
* **Metric** - Used to make sure the metrics are within the expected range. 

By default, the UI adds the below conditions while creating a browser monitor. You can change them during the creation:

* Error equals empty
* Response Time metric Less Than 20000 ms

## Metrics

### Run Metrics

For every browser run, the monitor collects the below run-level metrics:

| Name  | Label  | Description  | Unit  |
|---|---|---|---|
| synthetics.time.response  | Response time  | Total time taken for the script to finish | ms  |
| synthetics.browser.request.count | Request count | Total number of HTTP requests sent during the execution of the script | |
| synthetics.browser.transfer.size | Transfer size | Total number of network bytes downloaded during the execution of the script | bytes |

### Page Load Metrics

The browser monitor collects the below page load (navigation) metrics for every run. If there are multiple page loads during the execution of the script, the last page-load metrics are collected.

| Name  | Label  | Description  | Unit  |
|---|---|---|---|
| synthetics.browser.time.frontend | Frontend time | Time taken for the browser to parse and create the page | ms |
| synthetics.browser.time.backend | Backend time |  Time taken for the network and the server to generate and start sending the HTML | | ms |
| synthetics.browser.time.pageload | Page load time | Time taken for the page to load, from initiation of the page load (e.g., click on a page link) to load completion in the browser | ms |
| synthetics.browser.time.dns | DNS time | DNS resolution time for the URL of the page | ms |
| synthetics.browser.time.connection | Connection time | Time taken to connect to server | ms |
| synthetics.browser.time.response | Server response time | Time taken for the server to send the response | ms |
| synthetics.browser.time.download | Page download time | Time taken to download the page contents | ms |
| synthetics.browser.time.dom.interactive | DOM interactive time | Time taken by the browser to parse the document, including the network time from the user's location to your server | ms |
| synthetics.browser.time.dom.contentload | DOM content load time | Time taken by the browser to parse the document and execute deferred and parser-inserted scripts including the network time from the user's location to your server | ms |
| synthetics.browser.time.paint.first | First paint time | The time from navigation to the time when the first paint happens on the screen | ms |
| synthetics.browser.time.paint.firstcontentful | First contentful paint time |  The time from navigation to the time when the browser renders the first bit of content from the DOM | ms |

### Resource Metrics

Browser monitor collects the below metrics for every resource loaded during the execution of the script:

| Name  | Label  | Description  | Unit  |
|---|---|---|---|
| synthetics.browser.resource.transfer.size | Transfer size | Network size of the resource content | bytes |
| synthetics.browser.resource.time | Resource time | Total time taken to fetch the resource | ms |

## Screenshots

The browser monitor script allows the collection page screenshots at any point during the execution. This can be collected using [page.screenshot()](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pagescreenshotoptions) Puppeteer API. JPEG and PNG image types are supported. Currently, the number of screenshots per run is limited to 1. On failure of the script due to errors like navigation timeout, assertion failed, etc., a screenshot `error.png` will be collected for analysis.

## Waterfall chart

For every run, the browser monitor collects all the resources fetched during the run. These resources are shown in a graphical waterfall chart in the individual run details page. The metrics shown for each resource are:

* **Total Time** - Total elapsed time of the request to fetch the resource in ms.
* **Started At** - Relative time when the fetch started in ms.
* **Blocked** - Time the request spent waiting before it could be sent in ms.
* **DNS** - Time taken for DNS resolution in ms.
* **Connect** - Socket connection time in ms.
* **SSL** - SSL handshake time in ms.
* **Send** - Time taken to send the request in ms.
* **Wait** - Time taken to receive the first byte of response from server in ms.
* **Receive** - Time taken to download the resource in ms.
* **Transfer Size** - Network size of the resource in bytes.
* **Content Size** - Actual uncompressed size of the resource.

<image of waterfall chart>

## Run environment

Each browser monitor run is executed in an isolated environment using the Google Chrome browser in a Node.js environment. Each run is allocated 1024MB of memory. Versions of various dependencies are:

* **Node.js** - 10.x
* **Google Chrome** - 77.0.3844
* **Puppeteer** - 1.19.0

Default runtime configuration values are:

* Chrome browser environment - Desktop
* Resolution - `1920x1080`
* Navigation timeout - 20 seconds
* Timeout for script execution - 1 minute