title: Web Vitals
description: Overview of support for Web Vitals metrics in Synthetics

[Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web. These are set of performance metrics that they consider are essential for improving
user experience. The Core Web Vitals are:

* [Largest Contentful Paint (LCP)](https://web.dev/lcp/)
* [Total Blocking Time (TBT)](https://web.dev/tbt/) - Synthetic equivalent for [First Input Delay (FID)](https://web.dev/fid/) or
* [Cumulative Layout Shift (CLS)](https://web.dev/cls/)

The other Web Vital metrics are:

* [First Contentful Paint (FCP)](https://web.dev/fcp/)
* [Time To First Byte (TTFB)](https://web.dev/time-to-first-byte/)

Synthetics Browser monitor automatically collects all the above metrics except Total Blocking Time (TBT). All these metrics are conviniently displayed in single report under Browser monitor. For each metrics, the recommended thresholds are also displayed for guidance. Since, the Browser monitor tests the website in desktop environment, these thresholds are for desktop devices.

You can filter the metrics based on locations and aggregate the results by average, percentil, min and max.

![Synthetics Web Vitals](../images/synthetics/web-vitals.png)