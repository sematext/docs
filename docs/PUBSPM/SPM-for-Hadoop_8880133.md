SPM supports monitoring of both **MRv1** (0.22 and earlier, 1.0, 1.1)
and **YARN** (0.23, 2.\*) based Hadoop versions. Since the architecture
is different, SPM uses different application types for them and
different reports are available.

Common reports for all Hadoop types:

  - Overview
  - NameNode
  - DataNode
  - CPU & Mem
  - Disk
  - Network
  - JVM
  - GC

In addition to that, MRv1 versions also get the following reports:

  - JobTracker
  - JobTracker Queues
  - TaskTracker

While reports specific for YARN versions are:

  - ResourceManager
  - ResourceManager Queues
  - NodeManager

 

In some cases, some reports will be empty because particular Hadoop
version doesn't expose some metrics over JMX. For instance, 0.20, 0.21,
0.22 **MRv1** versions of Hadoop will not have data in **JobTracker**,
**JobTracker Queues** and **TaskTracker** reports (while 1.0 and 1.1
will have all reports populated). **NOTE**: regardless of this, you can
monitor JVM stats of **JobTracker** and **TaskTracker** processes under
JVM report for all **MRv1** versions (0.20, 0.21, 0.22 included). Also,
since **SecondaryNameNode** doesn't expose specific metrics, it doesn't
have a special report, but it can also be monitored under JVM report
(for instance, you can create an alert to notify you when its heap size
reaches some limit or drops to 0, meaning the process likely died).

 

All **YARN** versions (0.23, 2.\*) will display all available reports
and we expect all new Hadoop versions to continue behaving like that.

**YARN** versions don't have separate reports for the following
components (since they don't expose specific metrics):

  - **HistoryServer**
  - **WebAppProxy**

However, you can still monitor these processes under JVM report, in the
same way as **SecondaryNameNode** can be monitored in **MRv1** setups.
You can also define any alerts which are based on JVM metrics which
should be good enough for most situations.

