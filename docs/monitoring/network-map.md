title: Network Map
description: Use NetMap to visualize the network topology and to discover and collect various data information on your hosts

You can visualize the network topology of a system monitored by Sematext. The Sematext Agent
can discover hosts and collect information about communication between
them, such as the amount of received/transmitted data on each port. In
order to build the Network Map the Sematext Monitoring Agent needs to be
started on each host in the system. This can be done by setting `netmon.enabled` property to `true` in
`/opt/spm/properties/st-agent.yml`. This property is disabled by default.

The following properties can be changed:

  - **netmon.interfaces** (default value: **eth0,eth1**) - the
    list of network interfaces that will be used for packets capture.

Sematext Agent needs to be restarted after any `st-agent.yml`changes:

``` bash
sudo service spm-monitor restart
```
