#### Switching from In-Process to Standalone

1.  Adjust your server startup scripts by removing SPM javaagent
definition and adding parameters described on [SPM Monitor - Standalone](spm-monitor-standalone)

2.  Edit **properties** file of your system found in
/spm/spm-monitor/conf/ directory (in case you are using Hadoop or HBase
system which has multiple nodes, adjust properties files of nodes for
which you want to change the mode). Set:

    - **SPM\_MONITOR\_IN\_PROCESS**="false"
    - **SPM\_MONITOR\_JMX\_PARAMS** should be adjusted according to
      instructions on [SPM Monitor - Standalone](spm-monitor-standalone)

3.  Restart SPM Monitor:

    ``` bash
    sudo /etc/init.d/spm-monitor restart
    ```

4. restart your server

 

#### Switching from Standalone to In-Process

1. Add SPM javaagent definition to startup script of your server
according to notes
on [https://apps.sematext.com/ui/monitoring](https://apps.sematext.com/ui/monitoring)
(under in-process tab)

2.  Edit **properties** file of your system found in
/spm/spm-monitor/conf/ directory (in case you are using Hadoop or HBase
system which has multiple nodes, adjust properties files of nodes for
which you want to change the mode). Set:

    - **SPM\_MONITOR\_IN\_PROCESS**="true"
    - **SPM\_MONITOR\_JMX\_PARAMS**=""

3. Restart SPM monitor:

    ``` bash
    sudo /etc/init.d/spm-monitor restart
    ```

4. restart your server  
  

