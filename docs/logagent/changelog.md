title: Sematext Logagent Changelog
description: Features and improvements changelog for Sematext Logagent

## Breaking changes in Logagent v3.x

### Geo IP lookups

Logagent v2.x handles Geo IP lookups in the parser module. Adjusting fields, containing IP addresses, required changes in patterns.yml 


Logagent v3.x has a new [geoip plugin](output-filter-geoip.md) the list of fields for lookups are specified via environment variable or command line flag. 

Note Logagent v3.x requires the setting for GEOIP_FIELDS (default value `client_ip`). It ignores the settings in patterns.yml. If you used custom field names make sure you set `GEOIP_FIELDS` environment variable or `--geoipFields` command line flag. 

*Backward compatible environment variables:*

  - `GEOIP_ENABLED=<true|false>` - enable Geo IP lookups 
  - `MAXMIND_DB_DIR=/tmp/` - set DB directory

*Backward compatible command line flags:*

  - `--geoipEnabled <true|false>`

*New environment variable:*

  - `GEOIP_FIELDS="client_ip,remote_address"` - list of fields

*New command line flag:*

  - `--geoipFields "client_ip,remote_address"` - list of fields






To keep abreast of new Sematext Logagent releases and improvements, please:

  - see [logagent release notes](https://github.com/sematext/logagent-js/releases) on Github
  - see [logagent changelog](https://github.com/sematext/logagent-js/blob/master/CHANGELOG.md) on Github
  - check out [Product Updates](https://sematext.com/product-updates)
  - follow [@sematext](http://twitter.com/sematext)
  - subscribe to the [Sematext Newsletter](https://sematext.com/#gamma-newsletter)
  - read tutorials on the [Sematext Blog](https://sematext.com/blog)
