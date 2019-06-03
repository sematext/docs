title: Logagent Release Notes
description: Features and improvements releases for Sematext Logagent

Logagent is a dynamic project with frequent releases. 
This Changelog contains only important changes, new features, and critical bug fixes. 

### New Features

- RedHat container certification
- Kubernetes audit log plugin to receive data from Kubernetes audit log webhook
  
### Improvements

- Docker images: 
    - Add health check command
    - Dockerfile for aarch64
    - Dockerfile for RedHat Enterprise
- Creation of binary executables using nexe. The executable can run without installing Node.js runtime. 
- Automated changelog and release notes


### Bugfixes

- Log patterns: Bugfix for web server log patterns
- Docker plugin: Bugfix for not collecting container logs after quick container restarts. 

### Breaking changes > 2.0.162

#### Changes in field names

Field names for container and host metadata changed. 
In case a changed field was used in dashboards or alerts, the renaming could break existing dashboards or alert rules in Sematext Cloud. 

|Original Field Name| New Field Name |
|---------|-----------|
|host        | os.host     |
|ip            | os.host_ip     |
|container_id | container.id |
|image | container.image |
|container_name | container.name|
|kubernetes.podName | kubernetes.pod.name |
|kubernetes.containerName | kubernetes.pod.container.name |
|kubernetes.containerid | kubernetes.pod.container.id |
| - | kubernetes.pod.container.host.hostname | 

The change was required to correlate container metrics and logs by those fieds.

# Version 2.0.142 - 2.0.160

## New Features

- New input plugin for Kubernetes / containerd logs (IBM Cloud)
- New input plugin to receive data from systemd-journal-upload.service
- New input plugin for the collection of Docker events
- New input plugin for Kubernetes events
- New output plugin 'output-http', pushing data in line delimited JSON format

## Improvements

- Docker plugin: support LOGS_TOKEN and LOGSENE_TOKEN for container log routing 
- Log patterns: 
    - parsing dockerd logs
    - improved zookeeper log parsing

## Breaking changes

None. 

# More information

To keep abreast of new Sematext Logagent releases and improvements, please:

  - see [logagent release notes](https://github.com/sematext/logagent-js/releases) on Github
  - see [logagent changelog](https://github.com/sematext/logagent-js/changelog.md) on Github
  - check out [Product Updates](https://sematext.com/product-updates)
  - follow [@sematext](http://twitter.com/sematext)
  - subscribe to [Sematext Newsletter](https://sematext.com/)
  - read [Sematext Blog](https://sematext.com/blog)
