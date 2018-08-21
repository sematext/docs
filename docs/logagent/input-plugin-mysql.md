title: Logagent input plugin for MySQL
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Use MySQL queries as input and stream the output into Logagent. Query data from MySQL, choose time zone and format for query time, use multiple SQL query statements features, index SQL data to Elasticsearch and create alerts based on data from MySQL database

## Input Plugin: MySQL

Input plugin to use MySQL queries as input and stream the output into Logagent.

Features:

- run queries frequently
- choose time zone and format for query time
- use multiple SQL query statements 

Applications:

- index SQL data to elasticsearch
- create alerts based on data in MySQL database

### Configuration

```yaml

input:
  mysql-json:
    module: mysql-query
    server: 
      host: 'localhost'
      user: 'root'
      password: ''
      database: 'test'
    queries: 
      - sourceName: query1
        sql: SELECT * FROM potluck where signup_date < '$queryTime'
      - sourceName: query2      
        sql: SELECT * FROM potluck where name = 'Tina' and signup_date < '$queryTime'
      - sourceName: query3
        sql: SELECT * FROM potluck where name = 'Sandy' and signup_date < '$queryTime'
    interval: 1
    debug: true

output:
    stdout: yaml

```

Start Logagent

```
logagent --config mysql.yaml
```
