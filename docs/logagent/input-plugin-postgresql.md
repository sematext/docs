## Input Plugin: PostgreSQL 

Input plugin to use PostgreSQL queries as input and stream the output into Logagent.

- run queries frequently
- choose time zone and format for query time
- use multiple SQL query statements 

Applications:

- index SQL data to Elasticsearch
- create alerts based on data in PostgreSQL database

### Configuration

```yaml

input:
  postgresql:
    module: postgresql-query
    server: 
      user: 'postgres'
      database: 'test'
      password: '$Demo123'
      host: 'localhost'
      port: '5432'
    queryTimezone: America/Los_Angeles 
    queryTimeFormat: YYYY-MM-DD HH:mm:ss
    queries: 
      - sourceName: query1
        sql: SELECT name, age FROM company where join_date < '$queryTime'
      - sourceName: query2      
        sql: SELECT name, salary FROM company where join_date < '$queryTime'
    interval: 1
    debug: true

output:
    stdout: yaml

```

Start Logagent

```
logagent --config postgresql.yaml
```
