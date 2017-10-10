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
allocated GB | Allocated Memory
available GB | Available Memory
num allocated containers | Number of containers allocated in this pool
containers completed | Containers Completed
containers failed | Containers Failed
containers inited | Containers Initializing
containers killed | Containers Killed
containers launched | Containers Launched
containers running | Containers Running

#### Chart: NodeManager Shuffle
Metric Name | Metric Description
--- | ---
shuffle connections | Number of current shuffle connections
shuffle outputs failed | Number of failed shuffle outputs
shuffle outputs ok | Number of succeeded shuffle outputs
containers completed | Total number of successfully completed containers



### Report: Hadoop JobTracker Queues

#### Chart: ResourceManager Queue Containers
Metric Name | Metric Description
--- | ---
containers allocated | Current number of allocated containers
containers released | Total number of released containers
containers pending | Current pending resource requests that are not yet fulfilled by the scheduler
containers reserved | Current number of reserved containers

#### Chart: JobTracker Queue Running
Metric Name | Metric Description
--- | ---
running 0 | Current number of running applications whose elapsed time are less than 60 minutes
running 60 | Current number of running applications whose elapsed time are between 60 and 300 minutes
running 300 | Current number of running applications whose elapsed time are between 300 and 1440 minutes
running 1440 | Current number of running applications elapsed time are more than 1440 minutes

#### Chart: ResourceManager Queue Applications
Metric Name | Metric Description
--- | ---
applications completed | Total number of completed applications
applications failed | Total number of failed applications
applications killed | Total number of killed applications
applications pending | Current number of applications that have not yet been assigned by any containers
applications running | Current number of running applications
applications submitted | Total number of submitted applications

#### Chart: ResourceManager Queue Status
Metric Name | Metric Description
--- | ---
active applications | Current number of active applications
active users | Current number of active users
allocated MB | Current allocated memory in MB
available MB | Current available memory in MB
pending MB | Current pending memory resource requests in MB that are not yet fulfilled by the scheduler
reserved MB | Current reserved memory in MB



### Report: Hadoop ResourceManager

#### Chart: ResourceManager NMs
Metric Name | Metric Description
--- | ---
active NMs | Current number of active NodeManagers
decom NMs | Current number of decommissioned NodeManagers
lost NMs | Current number of lost NodeManagers for not sending heartbeats
rebooted NMs | Current number of rebooted NodeManagers
unhealthy NMs | Current number of unhealthy NodeManagers



### Report: Hadoop DataNode

#### Chart: DataNode Read/Write
Metric Name | Metric Description
--- | ---
bytes read | Total number of bytes read from DataNode
bytes written | Total number of bytes written to DataNode
read from local client | Total number of read operations from local client
reads from remote client | Total number of read operations from remote clientv
writes from local client | Total number of write operations from local client
writes from remote client | Total number of write operations from remote client

#### Chart: DataNode Heartbeats
Metric Name | Metric Description
--- | ---
heartbeats avg time | Average heartbeat time in milliseconds
heartbeats num ops | Total number of heartbeats

#### Chart: DataNode Blocks
Metric Name | Metric Description
--- | ---
blocks read | Total number of blocks read from DataNode
blocks written | Total number of blocks written to DataNode
blocks removed | Total number of blocks removed
blocks replicated | Total number of blocks replicated
blocks verified | Total number of blocks verified

#### Chart: DataNode Block Ops
Metric Name | Metric Description
--- | ---
copy block op avg time | Average time of block copy operations in milliseconds
copy block num ops | Total number of block copy operations
read block op avg time | Average time of read operations in milliseconds
read block num ops | Total number of read operations
replace block op avg time | Average time of block replace operations in milliseconds
replace block num ops | Total number of block replace operations
write block op avg time | Average time of write operations in milliseconds
write block num ops | Total number of write operations



### Report: Hadoop DataNode

#### Chart: TaskTracker Tasks
Metric Name | Metric Description
--- | ---
map task slots | Total number of map task slots on the TaskTracker
reduce task slots | Total number of reduce task slots on the TaskTracker
maps running | Current number of running map tasks on the TaskTracker
reduces running | Current number of running reduce tasks on the TaskTarcker
tasks completed | Total number of completed tasks
tasks failed ping | Total number of failed tasks by child JVM failed to ping TaskTracker
tasks failed timeout | Total number of failed tasks by not reporting progress for a specific period



### Report: Hadoop JobTracker Queues

#### Chart: JobTracker Queue Maps
Metric Name | Metric Description
--- | ---
maps completed | Total number of map tasks completed
maps failed | Total number of map tasks failed
maps killled | Total number of map tasks killed
maps launched | Total number of map tasks launched
map slots | Current map slots in cluster
waiting maps | Current number of waiting map tasks

#### Chart: JobTracker Queue Reduces
Metric Name | Metric Description
--- | ---
reduces completed | Total number of reduce tasks completed
reduces failed | Total number of reduce tasks failed
reduces killled | Total number of reduce tasks killed
reduces launched | Total number of reduce tasks launched
reduce slots | Current reduce slots in cluster
waiting reduces | Current number of waiting reduce tasks

#### Chart: JobTracker Queue Jobs
Metric Name | Metric Description
--- | ---
jobs completed | Total number of jobs completed
jobs failed | Total number of failed jobs
jobs killled | Total number of killed jobs
jobs preparing | Current number of preparing jobs
jobs running | Current number of running jobs
jobs submitted | Total number of jobs submitted

#### Chart: JobTracker Queue Running
Metric Name | Metric Description
--- | ---
running 0 | Counts the number of running jobs
running 60 | Counts the number of jobs running for more than one hour
running 300 | Counts the number of jobs running for more than five hours
running 1440 | Counts the number of jobs running for more than 24 hours



### Report: Hadoop NameNode FS Blocks

#### Chart: NameNode HDFS Nodes
Metric Name | Metric Description
--- | ---
live nodes | Calculates the number of live nodes in a cluster
dead nodes | Counts the number of dead nodes that exist in a cluster
decom nodes | Counts the number of decommissioned nodes that exist in a cluster

#### Chart: NameNode Files
Metric Name | Metric Description
--- | ---
total files | Counts the total number of files in a cluster
created files | Counts the number of files created in a cluster
appended files | Counts the number of files appended in a cluster
renamed files | Counts the number of files renamed in a cluster
deleted files | Counts the number of files deleted in a cluster
create file ops | Counts the number of create file operations occurring in a cluster
get listing ops | Counts the number of get listing operations occurring in a cluster
delete file ops | Counts the number of delete file operations occurring in HDFS
file info ops | Counts the number of file access operations occurring in the cluster

#### Chart: NameNode Fs Blocks
Metric Name | Metric Description
--- | ---
blocks total | Counts the current number of blocks allocated in a cluster.
corrupt blocks | Counts the number of corrupt blocks in a cluster. Corrupt blocks can be caused by one or more datanodes being down. This value should be zero or below an acceptable threshold
excess blocks | Counts the number of excess blocks in a cluster. Excess blocks can be caused by a namenode losing heartbeats from one or more datanodes, and this causes the scheduling of extra replicas
missing blocks | Counts the number of missing blocks in a cluster. Missing blocks can be caused by datanodes being down. This value should be zero or below an acceptable threshold
blocks pending deletion | Counts the number of blocks that are waiting for deletion. Datanodes that are back online after being down reduces the number of blocks waiting for deletion
blocks pending replication | Counts the number of blocks that are waiting for replication. Datanodes that are back online after being down reduces the number of blocks waiting for replication
scheduled replication blocks | Counts the number of blocks scheduled for replication. This value varies from datanodes being online or offline, and the number of replicas being changed in the hdfs-site.xml(dfs.replication)
under replicated blocks | Counts the number of under replicated blocks in a cluster. Datanodes being down or a sudden increased load on the cluster can cause under replicated blocks

#### Chart: NameNode HDFS Capacity
Metric Name | Metric Description
--- | ---
capacity total | Calculates the total capacity remaining in HDFS and other distributed file systems in GB
capacity used | Calculates the current capacity Usage in GB
capacity remaining | Calculates the total capacity remaining in HDFS space in GB



### Report: Hadoop JobTracker

#### Chart: JobTracker Heartbeats
Metric Name | Metric Description
--- | ---
heartbeats | Counts the total number of JobTracker heartbeats

#### Chart: MapReduce Runtime
Metric Name | Metric Description
--- | ---
map slots | Counts the number of map slots
reduce slots | Counts the number of reduce slots
occupied map slots | Counts the number of occupied map slots
occupied reduce slots | Counts the number of occupied reduce slots
running maps | Counts the number of running maps
running reduces | Counts the number of running reduce
waiting maps | 
waiting reduces | 

#### Chart: JobTracker Health
Metric Name | Metric Description
--- | ---
blacklisted maps | Counts the number of blacklisted map slots in each TaskTracker
blacklisted reduces | Counts the number of blacklisted reduce slots in each TaskTracker
trackers | Counts the number of TaskTrackers
blacklisted trackers | Counts the number of blacklisted TaskTrackers
decommissioned trackers | Counts the number of decommissioned TaskTrackers
graylisted trackers | Counts the number of greylisted TaskTrackers
