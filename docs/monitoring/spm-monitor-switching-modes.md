Title Switching Agent Modes

### From In-Process to Standalone

1. Adjust your service startup scripts by removing the javaagent
definition and adding parameters described in [standalone mode](spm-monitor-standalone)

2. Edit **properties** file of your system found in
/spm/spm-monitor/conf/ directory (in case you are using Hadoop or HBase
system which has multiple nodes, adjust properties files of nodes for
which you want to change the mode). Set:

    - **SPM\_MONITOR\_IN\_PROCESS**="false"
    - **SPM\_MONITOR\_JMX\_PARAMS** should be adjusted according to
      instructions in [Java App Agent Standalone](spm-monitor-standalone)

3.  Restart SPM Monitor:

    ``` bash
    sudo /etc/init.d/spm-monitor restart
    ```

4. restart the service you are monitoring


### From Standalone to In-Process

1. Add javaagent definition to startup script of your service according
to notes on <https://apps.sematext.com/ui/monitoring> (under
in-process tab)

2. Edit **properties** file of your system found in
/spm/spm-monitor/conf/ directory (in case you are monitoring a service
with multiple nodes, adjust properties files of nodes for which you
want to change the mode). Set:

    - **SPM\_MONITOR\_IN\_PROCESS**="true"
    - **SPM\_MONITOR\_JMX\_PARAMS**=""

3. Restart SPM monitor:

    ``` bash
    sudo /etc/init.d/spm-monitor restart
    ```

4. restart the service you are monitoring
