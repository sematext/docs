Title: Query data from Microsoft SQL 

## Input Plugin: Microsoft SQL 

Input plugin to use Microsoft SQL queries as input and stream the output into Logagent.

Features:

- run queries frequently
- choose time zone and format for query time
- use multiple SQL query statements 

Applications:

- index SQL data to Elasticsearch
- create alerts based on data from MSSQL database

### Configuration

```yaml

input:
  mssql:
    module: mssql-query
    connectioninfo: 
      server: localhost
      port: 1433
      userName: Testuser
      password: Testpassword
      database: testdatabase
      options: 
        database: testdatabase
        #encrypt: true
        #rowCollectionOnDone: true
        rowCollectionOnRequestCompletion: true
    queryTimezone: America/Los_Angeles 
    queryTimeFormat: YYYY-MM-DD HH:mm:ss
    queries: 
      - sourceName: query1
        sql:  SELECT * FROM employees
    interval: 1
    debug: true

output:
    stdout: yaml

```

Start logagent

```
logagent --config mssql.yaml
```
