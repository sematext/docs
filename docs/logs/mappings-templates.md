title: Mappings and Templates
description: Field mappings and index template supported by Sematext Cloud

Every log event that you ship to Sematext Logs has its structure - it is divided into fields. Each field can have a [type](/logs/field-types/), for example [string](/logs/field-types/#string), [date](/logs/field-types/#date), or [integer](/logs/field-types/#integerlong). It can even be an object holding structured data. We do everything we can to ensure that your log event field types are inferred correctly. However, you may also want to set field types explicitly. 

To do that you can create templates and configure mapping via Sematext's [Elasticsearch-compatible API](/logs/index-events-via-elasticsearch-api/) as shown below.

## The Templates
Logs are stored in an index in Sematext. Each Logs App has its own index and its own, independent log event structure. A template provides information about the structure - fields and their types - of log events in a given App and its underlying index. Every time an index is created all the defined templates are used to pre-create the fields with their types in such index. It is no different in Sematext Logs. By defining a template you provide information on what fields and types you expect in your data. 

You can easily create a new template by running the following request:

``` code
curl -XPUT 'https://logsene-receiver.sematext.com/_template/YOUR_WRITE_TOKEN_template_name' -d '{
 "order": 31,
 "mappings": {
   "properties": {
     "host_name": {
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

You need to provide your [write token](/logs/settings/) in the URI of the request, the **order**, and the mappings definition. The **order** property needs to be higher than **20**. The ones below that value are reserved for internal Sematext platform purposes and result in error when being used.

### Template Structure
The main section of each template definition is the **mappings** section which contains information about the fields and their types. Your templates may include one or more fields fields that are not considered special (more information in the [fields](/logs/fields)). For example:

``` code
curl -XPUT 'https://logsene-receiver.sematext.com/_template/YOUR_WRITE_TOKEN_mytemplate' -d '{
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

The above template contains the **mappings** object. Inside it we fine the **properties** object which is responsible for defining the fields and their types. Each field is a JSON object that contains a name, like **user_name** in the above example and the type defined by using the **type** keyword. 

The field types that can be used in Sematext Logs App are as follows ([learn more about the field types](/logs/field-types)):

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
Before adding new fields to your templates ensure that they are not present in the [special fields](/logs/fields) or in the [common schema](/tags/common-schema/).
---

Once you successfully create a new template your index will be rolled over. That means that an internal mechanism will create a new index and will apply the new template for you. 

## The Mappings
In addition to the templates mechanism Sematext Logs supports mappings, mostly for compatibility purposes. The mappings mechanism in Elasticsearch works by providing the data structure during index creation or by updating the data structure for an already created index. That wouldn't work in case of Sematext Logs App. When you send the mappings request it is translated into a template creation request. 

---
**NOTE:**
The mappings API support is provided by Sematext Logs for compatibility purposes and when changing the structure of your data you should use the [templates](/logs/mappings-templates/#the-templates) functionality.
---

For example this command results in a mappings request made to Sematext Cloud:

``` code
curl -H 'Authorization: apiKey YOUR_API_KEY' -XPUT 'https://logsene-receiver.sematext.com/YOUR_WRITE_TOKEN/_mapping' -d '{
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

You can find your [API key](/api) in your [Account settings](https://apps.sematext.com/ui/account/api) ([EU](https://apps.eu.sematext.com/ui/account/api)) and your Logs write token in each Logs App's Settings.

In the background, the mappings definition will be changed into a new template to ensure that the changes are persisted in your Sematext Logs App.