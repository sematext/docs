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

## Limitations
The memory measurement is enabled by default starting with Chrome 89, but only for the web pages that are **cross-origin isolated**. Your website can achieve that state by sending the following headers in the main document:

```javascript
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

You can determine if your website is cross-origin isolated by using:

```javascript
self.crossOriginIsolated
```

If the website is not cross-origin isolated the memory measurement API is not available, and the measurements will not be visible in your Experience App. 

### Identifying Resources Affected by Cross-Origin Isolation

Before enabling the cross-origin isolation headers we encourage you to check which resources your website uses will be affected by the new security policy. To do that you can include additional reporting headers you the main document of your website. Those headers are:

```
Cross-Origin-Opener-Policy-Report-Only: same-origin
Cross-Origin-Embedder-Policy-Report-Only: require-corp
```

You can either configure your webserver to save the reports or open Chrome and its developer tools and add the **Domain** column in the Network panel to see which resources may be affected. The following example shows that the **jquery-3.3.1.min.js** file is retrieved from an external domain and will be blocked:

<img
  class="content-modal-image"
  alt="External Resources"
  title="External Resources"
  src="../../images/experience/memory/external_resources.png"
/>

### Mitigating the Impact of Cross-Origin Isolation For Resources

Once the affected resources are identified you can use the **crossorigin** attribute in the HTML tags that are known to be server with the Cross-Origin-Resource-Sharing, simply CORS. You can for example do the following:

```
<img src="https://some.other.domain/sematext.png" crossorigin />
```

For iframes you can use the **allow="cross-origin-isolated"** attribute.

### Potential Problems

The current implementation of the cross-origin isolation is known to cause issues with integrations that require cross-origin window interactions such as various payment providers and OAuth authorization. There are works to mitigate that problem by relaxing the strictness of the cross-origin isolation policies and it may change in the future versions on Chrome.

Learn more about the [Cross-Origin-Embedder-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) and the [Cross-Origin-Resource-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)) headers.