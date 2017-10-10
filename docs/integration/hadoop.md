## Overview

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

## Metrics

### Report: Hadoop ResourceManager

#### Chart: NodeManager Containers
Metric Name | Metric Description
--- | ---
allocated GB | 
available GB | 
num allocated containers | 
containers completed | 
containers failed | 
containers inited | 
containers killed | 
containers launched | 
containers running | 

#### Chart: NodeManager Shuffle
Metric Name | Metric Description
--- | ---
shuffle connections | 
shuffle outputs failed | 
shuffle outputs ok | 
containers completed | 



### Report: Hadoop JobTracker Queues

#### Chart: ResourceManager Queue Containers
Metric Name | Metric Description
--- | ---
containers allocated | 
containers released | 
containers pending | 
containers reserved | 

#### Chart: JobTracker Queue Running
Metric Name | Metric Description
--- | ---
running 0 | 
running 60 | 
running 300 | 
running 1440 | 

#### Chart: ResourceManager Queue Applications
Metric Name | Metric Description
--- | ---
applications completed | 
applications failed | 
applications killed | 
applications pending | 
applications running | 
applications submitted | 

#### Chart: ResourceManager Queue Status
Metric Name | Metric Description
--- | ---
active applications | 
active users | 
allocated MB | 
available MB | 
pending MB | 
reserved MB | 



### Report: Hadoop ResourceManager

#### Chart: ResourceManager NMs
Metric Name | Metric Description
--- | ---
active NMs | 
decom NMs | 
lost NMs | 
rebooted NMs | 
unhealthy NMs | 



### Report: Hadoop DataNode

#### Chart: DataNode Read/Write
Metric Name | Metric Description
--- | ---
bytes read | 
bytes written | 
read from local client | 
reads from remote client | 
writes from local client | 
writes from remote client | 

#### Chart: DataNode Heartbeats
Metric Name | Metric Description
--- | ---
heartbeats avg time | 
heartbeats num ops | 

#### Chart: DataNode Blocks
Metric Name | Metric Description
--- | ---
blocks read | 
blocks written | 
blocks removed | 
blocks replicated | 
blocks verified | 

#### Chart: DataNode Block Ops
Metric Name | Metric Description
--- | ---
copy block op avg time | 
copy block num ops | 
read block op avg time | 
read block num ops | 
replace block op avg time | 
replace block num ops | 
write block op avg time | 
write block num ops | 



### Report: Hadoop DataNode

#### Chart: TaskTracker Tasks
Metric Name | Metric Description
--- | ---
map task slots | 
reduce task slots | 
maps running | 
reduces running | 
tasks completed | 
tasks failed ping | 
tasks failed timeout | 



### Report: Hadoop JobTracker Queues

#### Chart: JobTracker Queue Maps
Metric Name | Metric Description
--- | ---
maps completed | 
maps failed | 
maps killled | 
maps launched | 
map slots | 
waiting maps | 

#### Chart: JobTracker Queue Reduces
Metric Name | Metric Description
--- | ---
reduces completed | 
reduces failed | 
reduces killled | 
reduces launched | 
reduce slots | 
waiting reduces | 

#### Chart: JobTracker Queue Jobs
Metric Name | Metric Description
--- | ---
jobs completed | 
jobs failed | 
jobs killled | 
jobs preparing | 
jobs running | 
jobs submitted | 

#### Chart: JobTracker Queue Running
Metric Name | Metric Description
--- | ---
running 0 | 
running 60 | 
running 300 | 
running 1440 | 



### Report: Hadoop NameNode FS Blocks

#### Chart: NameNode HDFS Nodes
Metric Name | Metric Description
--- | ---
live nodes | 
dead nodes | 
decom nodes | 

#### Chart: NameNode Files
Metric Name | Metric Description
--- | ---
total files | 
created files | 
appended files | 
renamed files | 
deleted files | 
create file ops | 
get listing ops | 
delete file ops | 
file info ops | 

#### Chart: NameNode Fs Blocks
Metric Name | Metric Description
--- | ---
blocks total | 
corrupt blocks | 
excess blocks | 
missing blocks | 
blocks pending deletion | 
blocks pending replication | 
scheduled replication blocks | 
under replicated blocks | 

#### Chart: NameNode HDFS Capacity
Metric Name | Metric Description
--- | ---
capacity total | 
capacity used | 
capacity remaining | 



### Report: Hadoop JobTracker

#### Chart: JobTracker Heartbeats
Metric Name | Metric Description
--- | ---
heartbeats | 

#### Chart: MapReduce Runtime
Metric Name | Metric Description
--- | ---
map slots | 
reduce slots | 
occupied map slots | 
occupied reduce slots | 
running maps | 
running reduces | 
waiting maps | 
waiting reduces | 

#### Chart: JobTracker Health
Metric Name | Metric Description
--- | ---
blacklisted maps | 
blacklisted reduces | 
trackers | 
blacklisted trackers | 
decommissioned trackers | 
graylisted trackers | 
