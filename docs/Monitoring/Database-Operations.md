Database Operations reports provide detailed insight (details further
below) into operations about various data stores - this includes
operations executed against Solr or Elasticsearch clusters, as well as
other types of data stores.

Important:

  - To get this information **add SPM agent to the *application that is
    talking to a data store* **(e.g. Solr or Elasticsearch or any
    backend with which your application communicates using SQL - MySQL,
    Apache Cassandra (CQL), Apache Phoenix, Drill, Impala, and any other
    backend apps talk to via JDBC). This is because the *SPM agent
    captures operations at that client layer, not in the server itself*.

  - This works only for Java applications

  - To start capturing this information [enable Transaction Tracing](Transaction-Tracing) in your SPM agents

  - Requires SPM monitor running in [embedded mode](SPM-Monitor---Javaagent) 
    <iframe width="400" height="300" src="https://www.youtube.com/embed/eoZJmAJKuaQ" frameborder="0" allowfullscreen ></iframe>


Insights these reports provide:

  - Top 5 operation types across all your data stores or filtered to a
    specific data store type

  - Top 5 operation types by speed, throughput, or simply their volume

  - Time-series reports for volume, throughput, and latency broken down
    by operation type

  - Ability to view all collected operations, not just the slowest ones,
    filter by database type or by operation type, sorted by average or
    total duration, or throughput

  - Sparklines that show last 5 minute values and trends

  - Top 10 slowest individual operations and drill-in details 

  - Integration with [Transaction Tracing](http://blog.sematext.com/2015/08/03/transaction-tracing-performance-monitoring/) allows
    correlation of a specific slow operation with the actual
    transaction/request that triggered it

 

