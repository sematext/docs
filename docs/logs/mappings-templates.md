title: Mappings and Templates
description: Field mappings and indices templates supported by Sematext Cloud based SaaS / On-premises logging as a service platform

Every log event that you ship to Sematext Logs has its structure - it is divided into fields. Each field can have a [type](/logs/field-types/), for example [String](/logs/field-types/#string), [Date](/logs/field-types/#date), or [Integer](/logs/field-types/#floatdouble). It can even be an object holding structured data. We do everything we can to ensure that the fields of your logs have the correct types. However, there are situations where you know better what kind of fields you need and which types of data you want to use. 

In such cases, Sematext Logs provide mechanism for handling the data structure - the templates and the mappings. The mentioned functionality comes from Elasticsearch and its compatible with its API, however, because of the nature of the Sematext platform it works differently.

## The Templates
The templates mechanism works by providing guidance for Elasticsearch on the structure of the data. Every time an index is created all the defined templates are used to pre-create the fields with their types in such index. It is no different in Sematext Logs. By defining a template you provide information on what fields and types you expect in your data. 

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

You need to provide your [write token](/logs/settings/) in the URI of the request and the mappings definition. The **order** property needs to be higher than **20**. The ones below that value are reserved for internal Sematext platform purposes. 

Once you successfully create a new template your index will be rolled over. That means that an internal mechanism will create a new index and will apply the new template for you. 

## The Mappings
The mappings mechanism in Elasticsearch works by providing the data structure during index creation or by updating the data structure for an already created index. It wouldn't work well in the case of the Sematext Logs platform, because we try to provide you with the best indexing and searching experience possible, and thus we continuously create new indices in the background. 

Because of that, the mappings functionality in Sematext Logs works differently. When you send the mappings request it is translated into a template creation request. 

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

You can find your [API key](/api) in the Settings section of Sematext platform and your Logs write token can be found in the token section of your Logs App. 

In the background, the mappings definition will be changed into a new template. Sematext Logs does that to ensure that your mapping will be moved when we create a new, internal index for your Logs App. 