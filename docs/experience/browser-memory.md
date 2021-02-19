title: Monitoring Browser Memory Usage
description: Gathering information about web page memory usage

Browsers manage the memory used by web pages automatically without user interaction. Sematext Experience allows monitoring the memory usage for your web pages to identify issues, regressions, and give you an estimate of the memory needed by your applications. 

<img
  class="content-modal-image"
  alt="Memory Usage Overview"
  title="Memory Usage Overview"
  src="../../images/experience/memory/overview.png"
/>

## Use Cases
There are many use cases where having insight into the browser's memory usage can be crucial to identify and fix problems as soon as possible. Those include:

 * Identifying memory leaks in Single Page Applications
 * A/B testing of memory usage between different application versions
 * Measuring memory impact of new features or optimizations done to the application code
 * Statistical analysis of memory usage across the web application

<img
  class="content-modal-image"
  alt="Memory Usage Top Sessions"
  title="Memory Usage Top Sessions"
  src="../../images/experience/memory/topsessions.png"
/>

## Measurements
Sematext Experience [Browser SDK](https://sematext.com/docs/agents/browser/) uses the [Memory Measure API](https://wicg.github.io/performance-measure-memory/) to measure browser memory usage when your web application is loaded and continues to measure the memory throughout the user session. This allows for memory measurements across pages and sessions. It even shows the per-session memory usage that individual users of your applications are experiencing. 

<img
  class="content-modal-image"
  alt="Memory Usage Top Pages"
  title="Memory Usage Top Pages"
  src="../../images/experience/memory/toppages.png"
/>

## Supported Browsers
At the moment, the only web browser that supports memory usage measurements is Chrome. The memory usage measurement feature was under Chrome Origin Trials until [13th January 2021](https://web.dev/origin-trials/) and is available to all users starting with [Chrome 89](https://www.chromestatus.com/feature/5685965186138112). 
