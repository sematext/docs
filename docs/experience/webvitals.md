title: Web Vitals
description: Gathering information about web vitals - essential site health metrics

Supported by Chrome, the [Web Vitals](https://web.dev/vitals/) is a Google initiative to provide unified guidance for metrics that are crucial for delivering the best user experience for websites and webapps. 

<img
  class="content-modal-image"
  alt="Web Vitals Overview"
  src="../../images/experience/webvitals/webvitals.png"
  title="Web Vitals Overview"
/>

### Core Web Vitals

Both [Sematext Experience](/experience/) and [Sematext Synthetics](/synthetics/browser-monitor/#web-vitals) support the Core Web Vitals out of the box and include the following metrics:

 * **Largest Contentful Paint (LCP)** - measures *page loading* performance. Google suggests that **LCP** should be **below 2500 milliseconds**, which means that to provide good user experience, the largest contentful paint should occur within 2.5 seconds of when the page first starts loading.
 * **First Input Delay (FID)** - measures *interactivity* of the web application. Google suggests that to provide good user experience, pages should have a first input delay of **less than 100 milliseconds**.
 * **Cumulative Layout Shift (CLS)** - measures *visual* stability of the web page. To provide a good user experience Google suggests that the pages should maintain a cumulative layout shift of **less than 0.1**.

### Other Web Vitals Metrics

In addition to the Core Web Vitals, both [Sematext Experience](/experience/) and [Sematext Synthetics](/synthetics/browser-monitor/#web-vitals) support the supplemental Web Vitals metrics often used to help in diagnostics of specific issues on the web page. Those metrics are:

 * **Time to First Byte (TTFB)** - measures the time at which the server sends a response for the request. It is suggested that to provide a great user experience the time to the first byte should be **below 600 milliseconds**. Higher values may discourage users from interacting with the site and are usually cause application performance issues such as long page loads.
 * **First Contentful Paint (FCP)** - measures the time from when the page starts loading to when any part of the page's content is rendered on the screen. Unlike the largest contentful paint, the first contentful paint tells the site owner when the initial page element is rendered on the user screen. It is said that the first contentful paint should be kept **below 1000 milliseconds** to achieve a good user experience.

### Web Vitals in Experience

The information about Web Vitals in Experience is present as a set of numbers and graphs. 

The main panel of the Web Vitals presents information about the 75th percentile of both the Core and Other Web Vitals:  

<img
  class="content-modal-image"
  alt="Core Web Vitals Panel"
  src="../../images/experience/webvitals/webvitals_corepanel.png"
  title="Core Web Vitals Panel"
/>

In addition to metrics panel, the information is presented in an easy to read graphs that visualize the data for the selected time period:

<img
  class="content-modal-image"
  alt="Core Web Vitals Graphs"
  src="../../images/experience/webvitals/webvitals_coregraphs.png"
  title="Core Web Vitals Graphs"
/>

<img
  class="content-modal-image"
  alt="Other Web Vitals"
  src="../../images/experience/webvitals/webvitals_other.png"
  title="Other Web Vitals"
/>