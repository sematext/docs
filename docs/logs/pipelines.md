title: Logs Pipelines
description: Add processing steps to log ingestion

Log Pipelines provide an easy to use mechanism to optionally process logs during ingestion into Sematext before fully storing them.  Each Log Pipeline is associated with a specific Logs App, and each Logs App can have multiple Pipelines.  Each Pipeline consists of one or more [Processors](../logs/processors-overview) that are executed in the order in which they are defined in a Pipeline.

## The Use Case for Pipelines

Pipelines and its Processors can be used to drop unwanted log events, remove unwanted fields, enrich or transform your documents, and more.  Here are just a few use cases:

- Improving signal-to-noise ratio by cleaning up log event content, structure, or even dropping unwanted logs all together
- Extraction of metrics or other bits into separate fields making them suitable for charting and alerting.  See [Extracting Metrics from Logs](extracting-metrics-and-insights-from-logs/).
- Masking sensitive data or removing fields or whole events when they contain sensitive data. See [How to Handle Sensitive Data](handle-sensitive-data-with-pipelines/).
- Reducing costs by trimming heavy log events or dropping them.  See [Reducing Log Monitoring Costs](reduce-costs-with-pipelines) for more information.

These are just a few examples.  The use of Pipelines is not limited to these use cases.

### Understanding Received vs. Stored Price

Understanding the dynamics of log monitoring costs is pivotal, particularly as it directly correlates with the volume of stored logs. There are two log ingestion factors to understand as it pertains to costs:

1. The volume of logs sent to Sematext.  That's the "Received Price".  It's $0.1/GB and it's the same regardless of which plan your Logs App is on.
2. The volume of logs stored by Sematext.  That's the "Stored Price".  It differs based on plan and data retention chosen for a Logs App.

It's important to note that the Received Price is significantly lower than the Stored Price, as you can see on the [pricing page](https://sematext.com/pricing/#logs).

Any logs sent to Sematext count towards the received log volume, but only logs that end up getting stored in Sematext count towards stored log volume.  Moreover, even when some logs do end up getting stored, trimming them with Pipelines can reduce cost significantly. Put another way, any **data eliminated during the ingestion process doesn’t have additional cost** and is **free**. This unique feature allows for efficient management of log volumes without incurring unnecessary expenses.

In other words, you can transmit large amounts of logs to Sematext and, while these logs can be transmitted to Sematext, the ingestion cost won't go up if you opt to trim heavy log events or drop specific logs through [Pipelines Processors](../logs/processors-overview).

See [Reducing Log Monitoring Costs](../logs/reduce-costs-with-pipelines) for more information.

<div class="video_container">
<iframe src="https://www.youtube.com/embed/DTX33iA7iDY" 
frameborder="0" allow="autoplay; encrypted-media" 
allowfullscreen class="video"></iframe>
</div>


## Pipeline Builder

The Pipeline Builder accessible in the main menu of every Logs App, as its name implies, what you use to set up Pipelines.  Once the Pipeline Builder is opened, you'll see a dedicated page where you can configure ingestion settings.

![Pipeline Builder](../images/logs/pipelines/pipeline-builder-saved.png)

On top we have a header and subnav that can be used to pick events to preview. The page is split between a resizable preview section and a Pipeline configuration section.

The preview shows log events before and after processing. The Pipeline configuration section has a list of Processors on the left and configuration details for a selected Processor on the right.

The header and subnav let you define time and filters that will be used to load sample data for previewing the Pipeline. The logs displayed in the input section are sorted in descending order. Based on the applied filters and selected time frame, the most recent log will appear at the first page. To navigate through these logs, use the pagination at the bottom of the input/preview section to view up to the 10 most recent logs.

### Preview

The preview section is a helper tool you use to see how the Pipeline you are configuring is working. It runs loaded or manually entered input through the configured Pipeline and shows the difference between input and output log events.

The differences are presented in a way you're already used to, line by line. Since structured events can be presented as JSON objects, you can expand them and see which part of every event was changed, removed or added.

![Processor Filters](../images/logs/pipelines/pipeline-preview.png)

### Custom Input

The input is automatically loaded from the App, respecting the selected time, filters and number of events. However, the App might be empty, or log events in the App might already be processed by the Pipeline so they may not have cases that you would like to test. In such situations, you can switch to enter custom tab and enter or adjust the input.

![Edit Input](../images/logs/pipelines/edit-input.png)

At the moment, JSON is the only input format that is supported. The input editor will check each line if it is a valid JSON and report an error if it is not. If there is a specific place where an error is found, clicking on the error icon will place the cursor at the error.

After manually editing the input, click the "**Show Preview**" button at the bottom to view the result of your custom input when the processors are applied.

![Custom Input](../images/logs/pipelines/custom-input.gif)

If you switch to the "**Received**" tab while on the "**Custom**" tab, the custom logs you entered will be retained. When you switch back, you will still see the custom logs you entered before switching to the "**Received**" section.

Clicking "**Reload Data**" will prompt a warning. If you choose to reload anyway, new logs based on the selected time range will be loaded into the custom section.

![Reload Warning](../images/logs/pipelines/reload-warning.png)

### Processor Coloring

The order of the processors defined in the Preview section determines their sequence of application. Processors highlighted in **blue** indicate that operations within those processors are applied to the logs visible in the input section. If a processor is marked in **yellow** are **Not Applied**. It means that, due to filters or patterns within that processor, it hasn't affected the log displayed on the input side. When calculating the **Not Applied** status, we check if there is any difference between the log shown on the input side and the log shown on the preview side.

![Processor Order](../images/logs/pipelines/processor-order.png)

Processors displayed with a **gray background** are disabled, indicating they won't affect any logs.

![Disabled Processor](../images/logs/pipelines/disabled-processor.png)


To view the impact of processors up to a specific point in the Preview section, click on that processor. This action will display the effects on the log up to the selected processor in the Preview section. The blue lines or arrows between processors indicate which processors are applied and displayed in the preview section, up until a specific processor.

![Pipeline On Click](../images/logs/pipelines/processor-on-click.png)

### Not Applied Behavior

**Not Applied!** means that due to filters or patterns within that processor, it hasn't affected the log displayed on the input side. When calculating the **Not Applied!** status, we check if there is any difference between the log shown on the input side and the log shown on the preview side.
 
However **Not Applied!** doesn't always indicate that the operations defined in the processor won't be applied to the newly arrived records. The processors defined in pipelines are processed just before being inserted into the Elasticsearch database. So only the processed version of the log is stored in the database. We do not store raw logs.

If the log has been received after the processors were saved, the displayed version on the input side already reflects the applied state of the saved processors. In this case, there's no difference between the Input and Preview sections, so it's normal for that processor to appear as **Not Applied!**.


## Saving Pipeline
Changes made to Pipelines are not automatically saved. Once you make changes and all Processors are configured, the `Save Changes` button will be enabled and the Pipeline configuration can be saved.

![Save Pipeline](../images/logs/pipelines/save-pipeline.png)

The new configuration will not be applied immediately. It can take up to 5 minutes before your changes will take effect. If, while working with Pipelines, you discover that your fields are not quite of the right type, make sure you adjust field types using the [Field Editor](./fields/#field-editor).

## Enabling and Disabling Processors

If you are using Pipelines to drop some logs, you can have them flowing into Sematext at a moment's notice through a simple toggle using the enable/disable option within the processors.  Of course, you can also go back to dropping them just as easily.

To enable or disable a processor, simply click on the toggle next to each processor within the processors list.

![Pipeline Builder](../images/logs/pipelines/enable-disable-processors.gif)
