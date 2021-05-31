title: Log Pipelines
description: Add processing steps to log ingestion

Sometimes raw log events are not exactly the way you want them to be and it might be hard to set up log shipper that is able to transform or filter log events. An alternative approach is to configure processing steps that are injected in ingestion flow. We call that pipelines. Pielines can be used to drop unwanted log events, remove unwanted fields, enrich or transform your documents.
Pipelines are easily accessible and link to pipeline builder is available in the main menu of every log report.

![Pipelines Button](../../images/logs/pipelines/pipeline-button.png)


### Upgrade to PRO
Pipelines is the feature that is not available in all plans. In case your App is not on plan that supports pipelines, you'll be prompted to upgrade your plan.

![Upgrade Plan](../../images/logs/pipelines/upgrade-plan.png)

Once app is on the right plan you can start configuring the pipeline.

### Pipeline Builder
Pipeline builder is opened as a full page and has basic structure as any other page.

![Pipeline Builder](../../images/logs/pipelines/pipeline-builder-unsaved.png)

On top we have header and subnav that can be used to pick documents for preview. The paga is split between resizable preview section and pipeline configuration section. Preview shows documents before and after processing. Pipeline configuration section has list of processors on the left and configuration details for a selected processor on the right.

Header and subnav let you define time and filters that will be used to load sample data for previewing pipeline.

![Pipeline Builder](../../images/logs/pipelines/pipeline-builder-unsaved.png)

By default, we will load only 10 documents but you can also change it to 50 or 100. Note that larger number of documents may slow preview a bit down since documents are sent for processing on each pipeline configuration change.

#### Processors Configuration
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




