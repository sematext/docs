title: Processors
description: Add or change a field using a script

Processors are units of processing in Pipelines. They can change, drop, or even produce additional events. They are chained to form a Pipeline. The output of one Processor is the input for the next Processor.

Processors available in Logs Pipelines are:

- **XML Parser**: Parse XML formatted fields into separate fields.
- **Size processor**: Estimates size of document and extracts the information into a new field.
- **Drop processor**: Drop all documents that match a specified filter.
- [**Flattener processor**](../logs/flattener-processor): Used to flatten a nested structure into separate fields.
- **User-Agent processor**: Extract OS, browser, device and other data from a User-Agent attribute using an external [library](https://yauaa.basjes.nl/expect/fieldvalues/).
- **URL Parser**: Extracts query parameters and other important parameters from a URL.
- **Rename Fields Processor**: Change the names of fields.
- **Remove Fields Processor**: Remove fields that contain [sensitive information](../logs/handle-sensitive-data-with-pipelines) or redundant data to save from costs. See [Reducing Log Monitoring Costs](../logs/reduce-costs-with-pipelines) for more information.
- [**Field Extractor Processor**](../logs/field-extractor-processor): Extract fields using a grok pattern.
- [**Field Masking Processor**](../logs/field-masking-processor): Mask fields using a regex pattern and hide sensitive data. See [Handle Sensitive Data](../logs/handle-sensitive-data-with-pipelines) for more information.
- [**Script Field Processor**](../logs/script-field-processor): Add or change a field using a script.
- [**Sampling Processor**](../logs/sampling-processor): Keep only a certain percentage of your data using random sampling.
- **Geo Processor**: Enrich documents with reverse geocoding location or IP address.

Configuration section will be empty in most cases when you initially open Pipeline Builder.

![Empty Pipeline](../images/logs/pipelines/empty-pipeline.png)

In such cases, instead of a selected Processor configuration, there will be a list of available Processors. Clicking on any Processor card will add a Processor with default values. Processors can also be added by clicking the "Add Processor" button.

![Add Processor](../images/logs/pipelines/add-processor.png)

When clicking this button, a modal with a searchable list of Processors will appear. You can then select which Processor to add.
You can also add Processors by duplicating existing Processors.

![Processor Actions](../images/logs/pipelines/processor-actions.png)

The duplicate action is below the standard action button in the list of Processors. Note that **the order of Processors matters** since the **output of one Processor is the input for the next Processor**. 

You can reorder Processors using the drag handle to the left of each Processor's name.

The selected Processor configuration will be displayed on the right side. Every Processor has at least a name and a description field, but all Processors will also have additional, Processor-specific configurations.

### Errors
![Processor Errors](../images/logs/pipelines/processor-errors.png)

If a Processor is not configured correctly, the number of errors will be displayed next to the Processor's name and the `Save Changes` button will be disabled.

### Filters
Almost all Processors have optional filters. With filters, you can select only a subset of events that the Processor should be applied to. Events that do not match filters will be ignored.

![Processor Filters](../images/logs/pipelines/processor-filters.png)

Processors use the same filtering you are already used to in Sematext. 

The only difference is that you can also enter fields that are not keywords or even defined yet. 

#### Wildcards
Another important difference is that you can use wildcards for values. There is support for standard wildcard characters: `*` matches any number of characters, and `?` matches a single character.

This way you can, for example, drop events whose message field contains `*raws*` as in example below

![Wildcards_Filtering](../images/logs/pipelines/wildcards-filtering.png)
