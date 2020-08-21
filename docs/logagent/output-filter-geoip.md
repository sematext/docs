Title: Add GeoIP information to logs 
Description: Add GeoIP information to server logs. Resolve IP addresses to geographical coordinates, longitude and latitude, country, city. The Maxmind GeoIP-lite database is updated automatically. 


## Output filter: geoip

This plugin adds GeoIP information to logs. By default if you do not specify a `geoipField` Logagent will fetch the public IP from the server it is running on and use it for geological data. If you specify a `geoipField` Logagent will use it instead.

An everyday use case is to enrich web server logs, or any logs with IP addresses, with geographical information derived from those IP addresses.
 
Things you do not need to think about at all:

- Elasticsearch mapping for the Geo-Coordinates in Sematext Logs for geographic queries and map displays. Sematext Logs indices support the `geoip` field out of the box.

### Configuration 

Here is how to enable Geo IP lookups for your logs:

#### 1. Command line 

```
    logagent  --geoipEnabled true --geoipField "client_ip"
```

#### 2. Environment variables 

```
   GEOIP_ENABLED=true
   GEOIP_FIELD="client_ip"
```

#### 3. Configuration file - Option 1

Add the following `options` section to the Logagent configuration file. Note that you can use the plugin with multiple configurations for different event sources.

```yaml
options:
  geoipEnabled: true
  geoipField: client_ip

# Logagent configuration file: logagent-geoip.yml 
# tail web server logs
input: 
  files:
    - '/var/log/*/access_log'
...      
```

Test Logagent with your config: 

```
logagent --config logagent-geoip.yml -n httpd --yaml
```

#### 4. Configuration file - Option 2

Add the following `outputFilter` section to the Logagent configuration file. Note that you can use the plugin with multiple configurations for different event sources.

```yaml
# Logagent configuration file: logagent-geoip.yml 
# tail web server logs
input: 
  files:
    - '/var/log/*/access_log'

# Logagent parses web server logs out of the box ...
# Output filter to perform GeoIP lookups 
# for the field client_ip
outputFilter:
  geoip:
    module: geoip
    field: client_ip

...
```

Test Logagent with your config: 

```
logagent --config logagent-geoip.yml -n httpd --yaml
```

#### Sample Output

The output contains new fields under `geoip` with the location of the IP address. 

```
logSource:    httpd
_type:       access_log_combined
client_ip:   190.160.248.117
remote_id:   -
user:        -
method:      GET
path:        /about/ HTTP/1.1
status_code: 200
size:        14243
referer:     https://sematext.com/consulting/elasticsearch/
user_agent:  Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B436 Twitter for iPhone
@timestamp:  Sun Apr 03 2016 08:25:38 GMT+0200 (Central European Summer Time)
message:     GET /about/ HTTP/1.1
geoip: 
  location: 
    - -70.6653
    - -33.4513
  info: 
    country:   CL
    continent: SA
    city:      Santiago
```
