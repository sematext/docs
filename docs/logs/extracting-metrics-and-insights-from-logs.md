title: Extracting Metrics from Logs
description: How to extract business or DevOps/SRE metrics from logs, chart them, and alert on them.


## The Unstructured Logs Problem

Logs often include all kinds of valuable information.  When logs are nicely structured they have fields with "clean values".  

For example, they may contain a field like `price` or `size` or `count` or some other numerical values in their own fields.
Or they might have fields like `category` or `name` or `country`.  

More often than not though, logs are messy, unstructured, with valuable data "embedded" in fields that contain other text.
The `message` field is commonly used in logs and it typically carries information that it valuable to business or DevOps/SRE teams, but is
not really easily accessible because it's embedded.

### Examples
#### Business insights hidden in logs
`message`: `Customer from New York purchased 7 items totaling $99`

There are 3 nuggets of data here:

1. Customer location: New York
2. Number of items purchased: 7
3. Purchase amount: $99

If location could be extracted into its own field, it could be charted to show locations of customers.
If the quantity of items purchased were extracted and charted, one could work on incentivizing customers 
to buy more and a visualization would show how well this is working.
Same sort of thing for the purchase amount.

`message`: `Search query "Mozart Eine Cleine Nacht Music" got 0 matches`

Here we have 2 valuable bits of data:

1. The search query (which contains misspellings - should be "Mozart Eine Kleine Nachtmusik")
2. The number of search results: 0

If the search query was extracted and the number of search results were extracted, one could filter the logs and find all searches where
the number of hits is 0.  Such cases could then be handled in the search engines via synonyms and other methods.

#### DevOps/SRE insights hidden in logs
`message`: `2 out of 10 messages failed to get delivered from Foo to Bar`

There are 4 nuggets of data here:

1. The number of messages that failed to get delivered
2. The total number of messages
3. The source
4. The destination

If these were in their dedicated fields one could create a chart/dashboard based on logs with non-zero failed messages and figure out problematic source and or destination, among other things

`message`: `Couldn't store 2 objects of type Basket`

Here we see 2 bits of useful data:

1. The number of objects that had an issue
2. The type of problematic objects

Having these in separate fields would let one easily identify most problematic objects.


## The Solution

The examples above are just that - examples.  The common problem is that "messy" logs - and they often are "messy" like our examples - cannot be easily charted, you cannot create nice dashboards based on this data, 
and you cannot create alerts.

The solution?  Logs [Pipelines](pipelines).

### Examples

In [Uncovering Business Insights from Logs](https://sematext.com/blog/uncovering-business-insights-from-logs/) you will learn 
how to extract both numerical and non-numerical data from logs using Pipelines, 
resulting in a dashboard that reveals insights that one could not otherwise see in the logs.

In [How to Create Log-Based Metrics to Improve Application Observability](https://sematext.com/blog/how-to-create-log-based-metrics/) 
you will see how to use [Quick Chart](logs-table-quick-actions/#quick-chart) functionality to chart both numeric and non-numeric fields, as well as how to use Pipelines 
to extract metrics from logs and then dashboard them.

In [How Logs Pipelines Can Reduce Your Log Monitoring Costs](reduce-costs-with-pipelines/#field-extractor-processor-extract-metrics)
you will learn how to use [Field Extractor Processor](field-extractor-processor/) to extract metrics from large fields and then drop original fields in order to reduce your costs.
