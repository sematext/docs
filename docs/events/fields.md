title: Fields and Types
describe: Event fields let user store metadata which later help to find interesting events when troubleshooting, post-moretem analysis or simply to correlate with metrics.

### Fields

When you create an event you can send a ```JSON``` document which consists of multiple
fields. Each field can contain event main information or metadata. Even though there is
no strict format of such a ```JSON``` document we recommend to some of fields. An event
can contain the following set of fields, most of which are optional:

Field Name | Field Type | Required | Notes 
-----------|------------|----------|-------
```timestamp``` | date       | no       | Time when event happened (if not specified,current time will be assumed). The format is [dateOptionalTime](http://joda-time.sourceforge.netapi-release/org/joda/time/format/ISODateTimeFormat.html#dateOptionalTimeParser) e.g.: ```2014-02-17T21:37:04+0100``` or```  2014-02-17T14:15:01.534471+02:00```.
```type``` | string | yes | Event type which could be e.g. ```alert```, ```deployment```, etc. Events are later grouped in timeline based on event type which significantly improves visibility.
```message``` | string       | yes       | Short description of event, e.g. ```Elasticsearch node03 onhost somehost06 restarted```. This is a default search field in Sematext UI, so it is good to keep it concise, but search-friendly. Data in this field can be stored in Markdown format to make your messages more pretty and easier to read. For more details [see](#markdown-in-events).
```title``` | string       | no       | Event title, can be used as a short label for event, e.g. ```Elasticsearch restart```.
```tags``` | string array     | no       | Multivalued field. Each tag should be specified as aseparate array element e.g., <br> ```"tags":[ "elasticsearch", "restart", "emergency fix"]```
```severity``` | string | no | A single-valued field which says what kind of an event it is. It should have such values as ```error```,  ```info``` or ```warning``` and let's you easily navigate through important and less important events.
```creator``` | string       | no       | Person, application, or component that created an event. E.g. ```John Smith```, ```Elasticsearch```, ```Some Batch Job```
```data``` | string       | no       | Additional event data. It can be anything you may find useful to have along inside of event object. E.g., it could be  stacktrace in case of ```app_error``` event, base64 encoded content of file, etc.

### Types

[Sematext Cloud](http://sematext.com/cloud/) helps you manage your events better and
distinguish between different kinds of events when you provide event type as a ```JSON```
field. There are no limitations to the number of possible values of ```type``` field. 
To get the most value out of typed events we strongly suggest using a
smaller number of distinct event types (1-10) to keep things manageable.
Keeping the list of unique types concise help with faster navigation. Examples of
recommended types: ```alert```, ```server-info```, ```deployment```, ```infra```,
```outage```.


Note: when using curl to call the Events API, you may experience **"SSL certificate
problem"** errors. The reason is that curl doesn't bundle any CA certs
any more.  For more info see
[this](http://curl.haxx.se/docs/sslcerts.html). Regardless of curl
errors, HTTPS communication should be successful.


### Example of well defined event

```json
{
  "timestamp": "2019-05-30T09:58:43.455Z",
  "creator": "Jenkins",
  "host": "jenkins-host",
  "title": "Starting deployment",
  "message": "Started deployment of Test v1.23 to production",
  "severity": "info",
  "type": "deployment",
  "tags": ["version:1.23", "env:prod"],
}
```


### Markdown in events

Event message supports [markdown](https://daringfireball.net/projects/markdown/syntax).

An example below. Notice message field which contains a text formatted with Markdown.

```json
{
  "title": "Hello Sematext",
  "message": "### Hello Sematext\nClick [link](http://sematext.com/ \"Sematext\") \n",
  "tags": ["msg", "env:dev"],
  "severity": "info"
}
```

![Markdown](../images/events/markdown.png "Markdown")