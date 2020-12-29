title: Mappings and Templates
description: Field mappings and index template supported by Sematext Cloud

To adjust structure of log events you can create templates and configure mapping via Sematext's [Elasticsearch-compatible API](/logs/index-events-via-elasticsearch-api/) as shown below.

## Index Templates
In Sematext logs are stored in indexes. Each Logs App has its own index and its own, independent log event structure. A template provides information about the structure - fields and their types - of log events in a given App and its underlying index. Every time an index is created all the defined templates are used to pre-create the fields with their types in such index. By defining a template you provide information on what fields and types you expect in your data. 

You can create a new template by running the following request:

``` code
curl -XPUT 'https://logsene-receiver.sematext.com/_template/LOGS_TOKEN_template_name' -d '{
 "order": 31,
 "mappings": {
   "properties": {
     "user_name": {
       "type": "keyword"
     }
   }
 }
}'
```

---
**Note:**
For EU location use **logsene-receiver.eu.sematext.com** instead of **logsene-receiver.sematext.com**.
---

You need to provide your [`LOGS_TOKEN`](/logs/settings/) in the URI of the request, the **order**, and the mappings definition. The **order** property needs to be greater than **20**. Values 20 and below are reserved for internal Sematext platform purposes and will result in error when being used.

### Template Structure
The main section of each template definition is the **mappings** section. It contains information about the fields and their types. Your templates may include one or more fields, but should not include fields from [Common Schema for Logs](/tags/common-schema/#logs-tags). For example:

``` code
curl -XPUT 'https://logsene-receiver.sematext.com/_template/LOGS_TOKEN_mytemplate' -d '{
 "order": 40,
 "mappings": {
   "properties": {
     "user_name": {
       "type": "keyword"
     },
     "user_score": {
       "type": "integer"
     },
     "user_active": {
       "type": "boolean"
     },
     "user_description": {
       "type": "text"
     }
   }
 }
}'
```

The template above contains the **mappings** object. Inside it is the **properties** object responsible for defining the fields and their types. Each field is a JSON object that contains a name, like **user_name**. In the example above we see the type defined using the **type** keyword.

The [field types](/logs/field-types) that can be used in Sematext Logs App are as follows:

 * keyword (non-analyzed string)
 * text (analyzed string)
 * boolean
 * integer
 * long
 * double
 * float
 * object
 
---
**NOTE:**
When adding or changing fields ensure that they are not present in the [Common Schema for Logs](/tags/common-schema/#logs-tags).
---

Once you successfully create a new template your index will be rolled over. That means that an internal mechanism will create a new index and will apply the new template for you. 

## Index Mappings
In addition to the templates mechanism Sematext Logs supports mappings, mostly to remain compatible with the Elasticsearch API. In Elasticsearch mappings are used to provide the data structure during index creation or by updating the data structure for an already created index. That wouldn't work in case of Sematext Logs App, so a mappings request is simply translated into a template creation request under the hood. 

---
**NOTE:**
The mappings API support is provided by Sematext Logs for compatibility purposes. When changing the structure of your logs use the [templates](/logs/mappings-templates/#the-templates) API.
---

For example, this command results in a mappings request:

``` code
curl -XPUT 'https://logsene-receiver.sematext.com/LOGS_TOKEN/_mapping' -d '{
  "mappings": {
    "_doc": {
      "properties": {
        "email_write": {
          "type": "keyword"
        }
      }
    }
  } 
}'
```

In the background, the mappings definition will be changed into a new template to ensure that the changes are persisted in your Sematext Logs App.
