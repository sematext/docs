title: Network Map
description: Use NetMap to visualize the network topology and to discover and collect various data information on your hosts

You can visualize the network topology of a system monitored by Sematext monitoring and logging service. It
can discover hosts and collect information about communication between
them, such as the amount of received/transmitted data on each port. In
order to build this NetMap the Network Monitoring Agent needs to be
started on each host in the system. This can be done by setting `netmon.enabled` property to `true` in
`/opt/spm/properties/sta.yml`. By default this property is disabled.

The following properties can be changed:

  - **netmon.interfaces** (default value: "**eth0,eth1**" - the
    list of network interfaces that will be used for packets capture.
    By default packets capture will be enabled on all interfaces except loopback.

SPM monitor should be restarted to apply any changes in YAML file:

``` bash
sudo service spm-monitor restart
```
