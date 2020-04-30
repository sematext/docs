title: Monitoring Browser Long Tasks
description: Gathering information about long tasks during hard and soft page loads

Experience collects information about long tasks that happen during page loads. According to the [RAIL](https://developers.google.com/web/fundamentals/performance/rail) Model, tasks that are running for longer than **50ms** and blocking the main thread are considered long and are recorded by Sematext Cloud. 

Long tasks can cause issues such as:

* Clunky animations and scrolling affecting user experience
* High input latency
* Long delay in events handling
* Delayed time when your application becomes interactive

Thus, it is critical to monitor long tasks executed as part of your application's handling of user requests.

## Page Load Overview
The aggregated data about long tasks are visible on the page loads overview of your Experience App. You can check the number of long tasks and their average duration:

<img
  class="content-modal-image"
  alt="Page Loads Overview"
  src="../../images/experience/longtasks/overview.png"
  title="Page Loads Overview"
  width=778
/>


## Page-Load Details
In addition to the charts showing long tasks on the page-loads overview, each individual page-load details screen also contains information about long tasks detected during both hard and soft page loads. Each long task is described by its **timestamp**, and **duration**.

<img
  class="content-modal-image"
  alt="Page Load Details"
  src="../../images/experience/longtasks/details.png"
  title="Page Load Details"
  width=778
/>

To learn more about various terms discussed here, please head to:

* [browsing context](https://html.spec.whatwg.org/multipage/browsers.html#browsing-context)
* [same-origin](https://html.spec.whatwg.org/multipage/origin.html#same-origin)
* [ancestor browsing context](https://html.spec.whatwg.org/multipage/browsers.html#ancestor-browsing-context)
* [descendant browsing context](https://html.spec.whatwg.org/multipage/browsers.html#list-of-the-descendant-browsing-contexts)

## Browser Support
The following browsers support the Long Tasks API allowing Sematext Experience to gather the data about long tasks:

* Google Chrome starting from version 58,
* Microsoft Edge starting from version 79,
* Opera,
* Samsung Internet starting from version 7.0.
