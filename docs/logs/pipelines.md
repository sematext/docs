title: Logs Pipelines
description: Add processing steps to log ingestion

Log events are not always structured the way you want them to be. For various reasons it might be hard to set up a log shipper to transform or filter log events.  An alternative approach is to configure processing steps that are executed during log event ingestion. We call this **Pipelines**. 

Each Pipeline consists of one or more **Processors** that are executed in the order in which they are defined in a Pipeline.  Pipelines and its Processors can be used to drop unwanted log events, remove unwanted fields, enrich or transform your documents, and more.  They are easily accessible in the main menu of every Logs App. This gives you access to the Pipeline Builder.

![Pipelines Button](../images/logs/pipelines/pipeline-button.png)


## Pipeline Builder
The Pipeline Builder is, as its name implies, what you use to set up Pipelines.  Once the Pipeline Builder is opened, you'll see a dedicated page where you can configure ingestion settings.

![Pipeline Builder](../images/logs/pipelines/pipeline-builder-saved.png)

On top we have a header and subnav that can be used to pick events to preview. The page is split between a resizable preview section and a Pipeline configuration section.

The preview shows log events before and after processing. The Pipeline configuration section has a list of Processors on the left and configuration details for a selected Processor on the right.

The header and subnav let you define time and filters that will be used to load sample data for previewing the Pipeline. The logs displayed in the input section are sorted in descending order. Based on the applied filters and selected time frame, the most recent log will appear at the first page. To navigate through these logs, use the pagination at the bottom of the input/preview section to view up to the 10 most recent logs.

### How Preview Works

The order of the processors defined in the Preview section determines their sequence of application. Processors highlighted in **blue** indicate that operations within those processors are applied to the logs visible in the input section. If a processor is marked in **yellow** are **'Not Applied'**. It means that, due to filters or patterns within that processor, it hasn't affected the log displayed on the input side. When calculating the **'Not Applied'** status, we check if there is any difference between the log shown on the input side and the log shown on the preview side.

![Processor Order](../images/logs/pipelines/processor-order.png)

Processors displayed with a **gray background** are disabled, indicating they won't affect any logs.

![Disabled Processor](../images/logs/pipelines/disabled-processor.png)


To view the impact of processors up to a specific point in the Preview section, click on that processor. This action will display the effects on the log up to the selected processor in the Preview section. The blue lines or arrows between processors indicate which processors are applied and displayed in the preview section, up until a specific processor.

![Pipeline On Click](../images/logs/pipelines/processor-on-click.png)

### NOT APPLIED Behavior

The processors defined in pipelines are processed just before being inserted into the Elasticsearch database. So only the processed version of the log is stored in the database. We do not store raw logs.

If the log has been received after the processors were saved, the displayed version on the input side already reflects the applied state of the saved processors. In this case, there's no difference between the Input and Preview sections, so it's normal for that processor to appear as 'NOT APPLIED.' However, this doesn’t indicate that the operations defined in these processors won't be applied to the newly arrived records.


##### Sampling
You can do events sampling with Pipeline as well. 

Without filters sampling is applied to all events, but by using filters you can sample only a subset of events.
 
One example might be to filter by events from one specific service. The sample rate is expressed as a percentage of events that should be stored. By default, the sampling rate is 100%, meaning no events will be dropped. Setting sampling to 10% means that only 10 in 100 events will be stored and 90 will be dropped.

Below is an example where we leave only 30% of log events with severity `Information`, while events with all other severities will be processed without any sampling.

![Processor_Sampling](../images/logs/pipelines/processor-sampling.png)

##### Field Extractor
Structuring data into fields is important if you are using Sematext Logs.  Having your logs structured makes it easy to analyze logs, create charts with data from individual fields, filter log events, or group them by their field values.

By using Grok Patterns Extractor, you can extract multiple fields from other fields. 

Grok works by combining text patterns into something that matches your logs.
The syntax for a grok pattern is `%{SYNTAX:SEMANTIC}`

Imagine we have a message field:
`Got document of 142 kb from 255.35.244.0`

The `SYNTAX` is the name of the pattern that will match your text. For example, `142` will be matched by the `NUMBER` pattern and `255.35.244.0` will be matched by the `IP` pattern. The syntax is how you match.

The `SEMANTIC` is the identifier you give to the piece of text being matched. For example, `142` could be the size of a document in bytes, so you could call it simply size. Further, a string `255.35.244.0` might identify the `IP` of device which sending a document.

For the above example, your grok filter would look something like this:

`Got document of %{NUMBER:sizeOfDoc} kb from %{IP:deviceIp}`

Field Extractor provides a bunch of predefined patterns you may use for your purposes. Autocompletion makes it easy to navigate through and select them.

![Processor Grok Field Extractor](../images/logs/pipelines/processor-grok.png)

##### Scripting
Scripting is supported using the Script processor. It uses [painless](https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-guide.html), a simple scripting language similar to Java. 
You can access fields using the `doc` method. Since the field value can be of any type, before using it you must cast the value to a specific type like: String, Integer, Double, etc.

The following is supported:

- Math operators: +, -, /, *, %, ^, e.g. `((Integer)doc['size.kb']).intValue()*2`
- Relational operators: ==, !=, <, <=, >, >=, e.g. `((Integer)doc['size']).intValue() > 10`
- Logical operators: &&, ||, !, e.g. `((Integer)doc['size']).intValue() > -1 && ((Integer)doc['size']).intValue() < 10`
- Ternary operator, e.g. `((Integer)doc['speed']).intValue() < 1000 ? "OK" : "SLOW"`
- String functions, e.g. `((String)doc['severity']).toUpperCase()` or `((String)doc['message']).splitOnToken('-')[3]`

Conditional block and loops are supported. The last line should result in a value that will then be stored as a field.  Here is a made up example:

```java
String[] tokens = ((String)doc['message']).splitOnToken(' '); 
if(tokens.length % 2 != 0){
  String result = "Iterator ";
  for(int i = 0; i < tokens.length; i++){
      result += i;
  }
  result;
}
else {
  tokens.length * 10;
}
```

Imagine we have a message field:
`Got document of 142 kb from 255.35.244.0`
and that we want to extract the number of kilobytes. The script might look something like:

```java
int kbIdx = ((String)doc['message']).indexOf(' kb');
((String)doc['message']).substring(17, kbIdx)
```


#### Preview
The preview section is a helper tool you use to see how the Pipeline you are configuring is working. It runs loaded or manually entered input through the configured Pipeline and shows the difference between input and output log events.

![Processor Filters](../images/logs/pipelines/pipeline-preview.png)

The differences are presented in a way you're already used to, line by line. Since structured events can be presented as JSON objects, you can expand them and see which part of every event was changed, removed or added.

The input is automatically loaded from the App, respecting the selected time, filters and number of events. However, the App might be empty, or log events in the App might already be processed by the Pipeline so they may not have cases that you would like to test. In such situations, manual editing is the way to enter or adjust the input. You can toggle between editing and preview.

![Edit Input](../images/logs/pipelines/edit-input.png)

At the moment, JSON is the only input format that is supported. The input editor will check each line if it is a valid JSON and report an error if it is not. If there is a specific place where an error is found, clicking on the error icon will place the cursor at the error.
Once the input is manually edited, a warning will be displayed if you try to reload data.

![Reload Warning](../images/logs/pipelines/reload-warning.png)

#### Saving Pipeline
Changes made to Pipelines are not automatically saved. Once you make changes and all Processors are configured, the `Save Changes` button will be enabled and the Pipeline configuration can be saved.

![Save Pipeline](../images/logs/pipelines/save-pipeline.png)

The new configuration will not be applied immediately. It can take up to 5 minutes before your changes will take effect. If, while working with Pipelines, you discover that your fields are not quite of the right type, make sure you adjust field types using the [Field Editor](./fields/#field-editor).
