SPM can visualize the network topology of a system monitored by SPM.  It
can discover hosts and collect information about communication between
them, such as the amount of received/transmitted data on each port. In
order to build this NetMap the Network Monitoring Agent needs to be
started on each host in the system. This can be done using the
spm-client-setup-conf.sh
script:

``` syntaxhighlighter-pre
sudo bash /opt/spm/bin/spm-client-setup-conf.sh {token} network standalone network
```

Then you can tweak monitor
properties:

``` syntaxhighlighter-pre
sudo vim /opt/spm/spm-monitor/conf/spm-monitor-network-config-{token}-default.properties
```

The following properties can be changed:

  - **SPM\_MONITOR\_USER** (default value: "**root**") - the user that
    will be used to start Network Monitor. It requires packet sniffing
    capabilities.

  - **N****ETWORK\_INTERFACES** (default value: "**eth0, eth1**") - the
    list of network interfaces that will be used for packets capture

  - **ENABLE\_TRAFFIC\_MONITORING** (default value: "**true**") -
    whether to capture **each** packet. This can be turned off ("false")
    if you experience high CPU usage due to high traffic rate. When set
    to "false" no rx/tx information will be displayed on NetMap, but the
    map will still show all discovered nodes and connections between
    them.

To disable network monitor add the following property:

  - **SPM\_MONITOR\_ENABLED=false**

  

Network Monitor should be restarted to apply any change in properties
file:

  

``` syntaxhighlighter-pre
sudo service spm-monitor restart
```

  

