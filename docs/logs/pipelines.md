title: Log Pipelines
description: Add processing steps to log ingestion

Log events are not always structured the way you want them to be. It might be hard to set up a log shipper to transform or filter log events.

An alternative approach is to configure processing steps that are injected in the ingestion flow. We call this **pipelines**. Pipelines can be used to drop unwanted log events, remove unwanted fields, enrich or transform your documents.
Pipelines are easily accessible in the main menu of every Logs App. This gives you access to the pipeline builder.

![Pipelines Button](../../images/logs/pipelines/pipeline-button.png)


### Pipeline Builder
Once the pipeline builder is opened, you'll see a dedicated page where you can configure ingestion settings.

![Pipeline Builder](../../images/logs/pipelines/pipeline-builder-saved.png)

On top we have a header and subnav that can be used to pick documents to preview. The page is split between a resizable preview section and a pipeline configuration section.

The preview shows documents before and after processing. The pipeline configuration section has a list of processors on the left and configuration details for a selected processor on the right.

The header and subnav let you define time and filters that will be used to load sample data for previewing the pipeline.

![Pipeline Builder](../../images/logs/pipelines/pipeline-builder-header.png)

By default, we will load only 10 documents. You can also change it to 50 or 100. Note that a larger number of documents may slow the preview down a bit since documents are sent for processing on each pipeline configuration change.

#### Processors
Processors are units of processing in pipelines. They can change, drop, or even produce additional events. They are chained to form a pipeline. The output of one processor is the input for the next processor.
Configuration section will be empty in most cases when you initially open pipeline builder.

![Empty Pipeline](../../images/logs/pipelines/empty-pipeline.png)

In such cases, instead of a selected processor configuration, there will be a list of available processors. Clicking on any processor card will add a processor with default values. Processors can also be added by clicking the "Add Processor" button.

![Add Processor](../../images/logs/pipelines/add-processor.png)

When clicking the button, a modal with a searchable list of processors will appear. You can then select which processor to add.
You can also add processors by duplicating existing processors.

![Processor Actions](../../images/logs/pipelines/processor-actions.png)

The duplicate action is below the standard action button in the list of processors. Note that **the order of processors matters** since the **output of one processor is the input for the next processor**. You can reorder processors using the drag handle to the left of the processor's name.

The selected processor configuration will be displayed on the right side. Every processor has at least a name and description field, but all processors will also have additional, processor-specific configurations.

##### Errors
![Processor Errors](../../images/logs/pipelines/processor-errors.png)

In the case a processor is not configured correctly, the number of errors will be displayed next to the processor's name and the `Save Changes` button will be disabled.

##### Filters
Almost all processors have optional filters. With filters, you can select only a subset of events that the processor should be applied to. Events that do not match filters will be ignored.

![Processor Filters](../../images/logs/pipelines/processor-filters.png)

Processors use the same filtering you're already used to in Sematext. The only difference is that you can also enter fields that are not keywords or even defined yet. Another important difference is that you can use wildcards for values. It supports standard wildcards `*`, matches any number of characters, and `?`, matches a single character.
This way you can e.g. drop events that have message field `*password*`.

##### Sampling
You can do events sampling with Pipeline as well. It can be applied on all events, or by using filters you can sample only a subset of events. One example might be to filter by events from one specific service. The sample rate is expressed as a percentage of events that should be stored. By default, it is 100%, meaning no events will be dropped. Setting sampling to 10% means that only 1 in 10 events will be stored and 9 will be dropped.

##### Field Extractor
Structuring data into fields is important if you are using Logsene: there are analysis possibilities you can do later with these fields (draw charts/diagrams or use for grouping/filtering).

By using Grok patterns Extractor, you can extract multiple fields from other message fields. 

Grok works by combining text patterns into something that matches your logs.
The syntax for a grok pattern is `%{SYNTAX:SEMANTIC}`

Imagine we have a message field:
`Got document of 142 kb from 255.35.244.0`

The `SYNTAX` is the name of the pattern that will match your text. For example, `142` will be matched by the `NUMBER` pattern and `255.35.244.0` will be matched by the `IP` pattern. The syntax is how you match.

The `SEMANTIC` is the identifier you give to the piece of text being matched. For example, `142` could be the size of a document in bytes, so you could call it simply size. Further, a string `255.35.244.0` might identify the `IP` of device which sending a document.

For the above example, your grok filter would look something like this:

`Got document of %{NUMBER:sizeOfDoc} kb from %{IP:deviceIp}`

Field Extractor provides you bunch of predefined patterns you may use for your purposes, autocompletion will help you with navigation thru all of them

![Processor Grok Field Extractor](../../images/logs/pipelines/processor-grok.png)


#### Preview
The preview section is a helper tool you use to see how the pipeline you configured is working. It runs loaded or manually entered input through the configured pipeline and shows the difference between input and output log events.

![Processor Filters](../../images/logs/pipelines/pipeline-preview.png)

The differences are presented in a way you're already used to, line by line. Since our events are JSON objects, you can expand them and see which part of every event was changed, removed or added.
The input is automatically loaded from the App, respecting the selected time, filters and number of documents. However, the App might be empty, or documents in the App might already be processed by the pipeline so they do not have cases that you would like to test. In such cases, manual editing is the way to enter or adjust the input. You can toggle between editing and preview.

![Edit Input](../../images/logs/pipelines/edit-input.png)

At the moment, JSON is the only input format that is supported. The input editor will check each line if it is a valid JSON and report an error if not. If there is a specific place where the error is, clicking on the error icon will place the cursor at the error.
Once the input is manually edited, a warning will be displayed if you try to reload data.

![Reload Warning](../../images/logs/pipelines/reload-warning.png)

#### Saving Pipeline
Changes made to pipelines are not automatically saved. Once you made some changes and all processors are configured, the `Save Changes` button will be enabled and the pipeline configuration can be saved.

![Save Pipeline](../../images/logs/pipelines/save-pipeline.png)

The new configuration will not be applied immediately. It can take up to 5 minutes before your changes will take effect. Make sure you adjust field types using the [Field Editor](./fields/#field-editor).


