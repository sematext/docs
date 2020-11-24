title: Measurements
description: Sematext Experience supports monitoring measurements made with performance.measure() API. Learn how to use and set it up here.

Measuring interaction times is critical for understanding what your users are experiencing while interacting with your website. Developers can use the native [`performance.measure()` API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) to measure any custom metrics.

Experience collects these measurements automatically and also allows you to set time thresholds for each measurement. When time thresholds are set, you will get a user satisfaction score for each measurement.

### Getting Started

If you call the native `performance.measure()` browser API anywhere on your website, Experience will automatically collect those measurements and show them under the "Measurements" page.

For example you could use the API like this:

```javascript
performance.mark('custom-metric-start');
doSomePotentiallyLongWork();
performance.mark('custom-metric-end');

performance.measure('custom-metric', 'custom-metric-start', 'custom-metric-end');
```

This will record a measurement with name `custom-metric` and the duration will be equal to the time it took for `doSomePotentiallyLongWork()` function to return.

This measurement will be reported back to Experience every time this code runs, where you will be able to see the average duration for all users, compute the user satisfaction score, filter the data and more.

### Setting The Time Threshold

You can set a time threshold for a measurement and Experience will compute the user satisfaction score that will be easier to interpret than looking at each measurement individually or the average duration times.

To define the time threshold go to the Measurements page and click the "New Measurements" button.

<img
  class="content-modal-image"
  alt="New Measurement button pointer"
  src="../../images/experience/measurements/new.png"
  title="New Measurement button pointer"
/>

Enter the Name and Target Time in milliseconds and click the Save button. That's it. You should now use the same name when using the performance.measure() API.

## Collected Data

To see the collected data go to the Measurements page.

The user satisfaction score (Apdex) shown on the this page includes all the measurements that have a time threshold defined.

Click on a measurement in the table to see data related to that measurement only.


## Custom Tags

If you wish to apply custom tags to all measurements, then please check out [Tags](/experience/tags).

If you want to add a specific custom tag to a single measurement, then you will have to use our custom commands for recording measurements instead of using the `performance.measure()` API.

You can attach custom tags to measurements by providing them as another argument when calling `startTransaction`:

To start measuring call `startTransaction` with name and custom tags as arguments:

```javascript
 strum('startTransaction', 'ExampleTransaction', { someTag: 'value' });
```

This tag will be applied to this single event only.

Stop measuring this interaction with `stopTransactions`:

```javascript
strum('stopTransaction', 'ExampleTransaction', { someTag: 'value' });
```
