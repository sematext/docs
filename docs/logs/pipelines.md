title: Log Pipelines
description: Add processing steps to log ingestion

Log events are not always structured the way you want them to be. It might be hard to set up a log shipper to transform or filter log events.

An alternative approach is to configure processing steps that are injected in the ingestion flow. We call this **pipelines**. Pipelines can be used to drop unwanted log events, remove unwanted fields, enrich or transform your documents.
Pipelines are easily accessible and link to pipeline builder is available in the main menu of every log report.

![Pipelines Button](../../images/logs/pipelines/pipeline-button.png)


### Pipeline Builder
Pipeline builder is opened as a full page and has basic structure as any other page.

![Pipeline Builder](../../images/logs/pipelines/pipeline-builder-saved.png)

On top we have header and subnav that can be used to pick documents for preview. The page is split between resizable preview section and pipeline configuration section. Preview shows documents before and after processing. Pipeline configuration section has list of processors on the left and configuration details for a selected processor on the right.

Header and subnav let you define time and filters that will be used to load sample data for previewing pipeline.

![Pipeline Builder](../../images/logs/pipelines/pipeline-builder-header.png)

By default, we will load only 10 documents but you can also change it to 50 or 100. Note that larger number of documents may slow preview a bit down since documents are sent for processing on each pipeline configuration change.

#### Processors
Processors are units of processing in pipelines. They can change, drop or even produce additional events. Their are chained to form a pipeline. The output of one processor is the input for the next processor.
Configuration section will be empty in most cases when you initially open pipeline builder.

![Empty Pipeline](../../images/logs/pipelines/empty-pipeline.png)

In such cases, instead of selected processor configuration, there will be list of available processors. Click on any processor card will add processor with default values. Processors can also be added by clicking on "Add Processor" button.

![Add Processor](../../images/logs/pipelines/add-processor.png)

When clicked on the button, a modal with a searchable list of processors will appear to select processor to add.
You can also add processor by duplicating some of existing processors.

![Processor Actions](../../images/logs/pipelines/processor-actions.png)

Duplicate action is under our standard action button in the list of processors. Note that order of processors matter since the output of one processor is the input for the next processor. You can reorder processor using drag handle left from the processor's name.

Selected processor configuration will be displayed on the right side. Every processor has at least name and description fields, but all processors will also have additional, processor specific configurations.

##### Errors
![Processor Errors](../../images/logs/pipelines/processor-errors.png)

In case processor is not properly configured, nuber of errors will be displayed next to processor name and `Save Changes` button will be disabled.

##### Filters
Almost all processors have optional filters. With filters, you can select only a subset of events that the processor should be applied to. Events that do not match filters will be ignored.

![Processor Filters](../../images/logs/pipelines/processor-filters.png)

It uses our standard filter component with difference that you can also enter field that is not a keyword or even not yet defined. Another important difference is that you can use wildcards for values. It supports standard wildcards `*`, matches any number of characters, and `?`, matches a single character.
This way you can e.g. drop events that have message field `*password*`.

##### Sampling
Events sampling is possible using Pipeline. It can be applied on all events or filters can be used to sample only some subset of events, e.g. only events from some service. Sample rate is expressed as percentage of events that should be stored. By default it is 100%, meaning no events will be dropped. Setting sampling to 10% means that only 1 in 10 events will be stored and 9 will be dropped.

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
Preview section is a helper tool to see how configured pipeline is working by running loaded or manually entered input through configured pipeline and showing differences.

![Processor Filters](../../images/logs/pipelines/pipeline-preview.png)

Differences are presented in a common way, line by line. Since our events are JSON objects, you can expand it and see which part of event was changed, removed or added.
Input is automatically loaded from the App, respecting selected time, filters and number of documents. However, App might be empty, or documents in App might already be processed by pipeline so they do not have cases that you would like to test. In such cases, manual editing is the way to enter or adjust the input. You can toggle between editing and preview.

![Edit Input](../../images/logs/pipelines/edit-input.png)

At the moment, JSON is the only input format that is supported. Input editor will check each line if it is a valid JSON and report error if not. If there is a specif place where the error is, clicking on error icon will place cursor there.
Once input is manually edited, a warning will be displayed if you try to reload data.

![Reload Warning](../../images/logs/pipelines/reload-warning.png)

#### Saving Pipeline
Changes made to pipelines are not automatically saved. Once you made some changes and all processors are configured, `Save Changes` button will be enabled and pipeline configuration can be saved.

![Save Pipeline](../../images/logs/pipelines/save-pipeline.png)

The new configuration will not be applied immediatelly. It can take up to 5 min before you can see effects on your changes. Make sure you adjust field types using [Field Editor](./fields/#field-editor).



