
One of the key things when working with time based data is the timestamp
that represents the moment when the event was generated. Sematext's Logs Management App expects
the time of the event to be provided in the *@timestamp* field. The
following @timestamp value formats are currently supported by our logging management solution:

1.   ISO date with timezone information, for example:
      - *2016-06-22T10:00:00Z*
      - *2016-01-04T15:30:10.474+00:00*
      - *2016-01-04T15:30:10,474+00:00*
      - *2016-06-22T10:00:00.000Z*
      - *2016-06-22T10:00:00,000Z*
      - *2016-06-22T10:00:00Z*
      - *2016-06-22T10:00:00.298Z*
      - *2016-06-22T10:00:00.298*

2. Timezone specified by using *+/-* notation, for example:
      - *2014-03-23T22:04:23-0400*

3. Default Log4j date and time format, for example:
      - *2016-06-24 10:38:09,758*
      - *2016-06-24 10:38:09*

4. Time since epoch, for example:
      - *1466595234226*

5. Graylog date format, for example:
      - *1385053862.3072*
      - *1444128321.426*
      - *2015-11-13T09:21:45.298*

**Please note:**

  - if *@timestamp* field is not provided Logsene will set @timestamp
    to the time when the event is received by Logsene.
  - if time specified in @timestamp does not include timezone
    information, Logs Management App will assume UTC.
