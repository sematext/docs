Geo-point datatype accept latitude-longitude pairs, which can be used to store
information about the geographical location of a point. This can be used to
search log events geographically or by distance from a central point. This
can be useful for example on dashboards presenting maps.

Usage example of a `geo` field which has geo-point type is demonstrated below:

    curl -XPOST https://logsene-receiver.sematext.com/<token>/example/ -d '{
      "geo" : {
        "lat": 52.40,
        "lon": 16.93
      },
      "message": "Hello, Logsene!"
    }'


**Please note:**

If you want to use this field type you can either send documents with a field in a format presented above. Data in such a format will be automatically detected as geo-point. Alternatively you can go to
[Field Editor](https://apps.sematext.com/ui/integrations/apps/6938/wizard)
to manually create a field of geo-point type.