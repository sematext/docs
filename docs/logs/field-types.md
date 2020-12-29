title: Logs Field Types
description: Field Types supported by Sematext Cloud based SaaS / On-premises logging as a service platform

You can see available field types when adding or modifying a field in Field Editor.

<img src="/docs/images/logs/field-editor-logs-ui.png" alt="Field types editor" title="Field types editor">

## Float/Double

Use this type for all fields that contain floating point numerical values. For
example, a field with request latency values should use Float type.
Sematext automatically detects all floating point numbers as double precision
numbers.

**Note:**

Sometimes fields that carry measurements also include units or other
**non-numerical** data. For example, a latency field may contain
values like 200ms and a size field may contain values like 5KB.  Do
not use Float type for such fields (unless you don't extract a numeric
value inside your log shipper before sending logs to Sematext). You
can use Analyzed String or Non-Analyzed String types, but note that
this will prevent you from applying functions like min, max, avg, etc.
on such fields.  A better option is to configure your log shipper to
strip non-numeric portion and ship only numerical values. This will
allow you to use this field for aggregations and reports.


Example of a document containing a floating point number:

    curl -XPOST https://logsene-receiver.sematext.com/<token>/example/ -d '{
      "latency": 11.123
    }'

## Integer/Long

Use this type if you are sure that all values in this field will always be integers
(for example counts).  If you know that a field contains numeric values but some of them
can be floating point use type Float instead.

Example of a document containing integer:

    curl -XPOST https://logsene-receiver.sematext.com/<token>/example/ -d '{
      "count": 11
    }'


## Boolean

Use this type if you are sure that all values in this field will always
be either true or false, and never anything else.

    curl -XPOST https://logsene-receiver.sematext.com/<token>/example/ -d '{
      "debug": true
    }'

## String

### Not analyzed string

Use this type if you do not need to perform full-text searches on a field. Use this type if you
want to be able to filter on exact values and perform aggregation queries for building reports.
For example, labels, tags, and log severity levels, maybe even names of hosts,
containers, etc. if you only need to filter and group by them, and do not need partial matching.

Example of a document containing string field:

    curl -XPOST https://logsene-receiver.sematext.com/<token>/example/ -d '{
      "severity": "error"
    }'

### Analyzed string

Use this type if you need to perform full-text, non-exact searches on
a field. Note that we also make a Not Analyzed copy of this field with
.raw suffix (e.g. if the field name is message, we also create
message.raw), which you can use for aggregations and sorting.

Example of a document containing string field:

    curl -XPOST https://logsene-receiver.sematext.com/<token>/example/ -d '{
      "message": "foo bar baz"
    }'

## Date

Use this type for all date and time fields. One such field is @timestamp, which
contains log event creation time. See [examples](supported-date-formats).

## Geo

Geo data type accepts an IP address, which can be used to store
information about the geographical location. Sematext Logs will enrich
this data by fetching the country and continent of this IP address.

This can be used to search log events geographically or by distance. It's
useful on dashboards presenting maps, for example.

Example of a `geo` field:

    curl -XPOST https://logsene-receiver.sematext.com/<token>/example/ -d '{
      "geo": {
        "ip": "136.245.144.12"
      },
      "message": "Hello from Sematext!"
    }'

    curl -XPOST https://logsene-receiver.sematext.com/<token>/example/ -d '{
      "geo": {
        "location" : {
          "lat": 38.76,
          "lon": -121.28
        }
      },
      "message": "Hello from Sematext!"
    }'

In Sematext Logs it will be enriched and look like this:

    "geo": {
      "ip": "136.245.144.12",
      "country_iso_code": "US",
      "continent_name": "North America"
    }

    "geo": {
      "location" : {
        "lat": 38.76,
        "lon": -121.28
      },
      "country_iso_code": "US",
      "continent_name": "North America"
    }


**Note:**

If you want to use this field type you can send events with a field name and
data in a format presented above. Alternatively, you can use Field
Editor to manually create a field of the geo-point type.

If you want to adjust the structure of your data you can use the Field Editor 
functionality in your Logs App settings or use the [Templates and Mappings](/logs/mappings-templates) functionality.
