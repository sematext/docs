title: Performance Measurements
description: Sematext Experience supports monitoring measurements made with performance.measure() API. Learn how to use and set it up here.

Measuring interaction times is critical for understanding what your users are experiencing while interacting with your website. Developers can use the native [`performance.measure()` API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) to measure any custom metrics.

Experience collects these measurements automatically and also allows you to set time thresholds for each measurement. When time thresholds are set, you will get a user satisfaction score for each measurement.

<img
  class="content-modal-image"
  alt="Measurements Page"
  src="../../images/experience/measurements/measurements.png"
  title="Measurements Page"
/>

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

This measurement will be reported back to Experience every time this code runs, where you will be able to see the average duration for all users, compute the [user satisfaction](/experience/user-satisfaction) score, filter the data and more.

### Setting a Time Threshold

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

<img
  class="content-modal-image"
  alt="Measurements Table"
  src="../../images/experience/measurements/measurements-table.png"
  title="Measurements Table"
/>

<img
  class="content-modal-image"
  alt="Measurements Events Table"
  src="../../images/experience/measurements/measurements-events.png"
  title="Measurement Events Table"
/>


## Custom Tags

By default Experience allows you to filter by browser, country, operating system and other attributes that we automatically capture for each measurement. If you would like to be able to filter by some additional attributes you can use [Custom Tags](/experience/tags).

### Overriding Tag Values

Custom Tags are set once and then applied to all events that are sent to Experience. But if you want to send a tag that applies only to a single measurement, or if you want to override a globally set tag for a single measurement then you will have to use the `startTransaction` and `endTransaction` commands from our Browser SDK.

You can attach custom tags to measurements by providing them as the second argument when calling `startTransaction`:

To start measuring call `startTransaction` with name and custom tags as arguments:

```javascript
 strum('startTransaction', 'custom-metric', { someTag: 'value' });
```

Stop measuring this interaction with `stopTransactions`:

```javascript
strum('stopTransaction', 'custom-metric', { someTag: 'value' });
```

This tag will be applied to this single event only.
