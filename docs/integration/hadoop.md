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

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
num allocated containers | hadoop.nm.containers.allocated | Avg | Double | 
containers launched | hadoop.nm.containers.launched | Sum | Long | 
containers killed | hadoop.nm.containers.killed | Sum | Long | 
containers completed | hadoop.nm.shuffle.output.bytes | Sum | Long | 
containers completed | hadoop.nm.containers.completed | Sum | Long | 
available GB | hadoop.nm.available | Avg | Double | 
shuffle connections | hadoop.nm.shuffle.connections | Sum | Long | 
shuffle outputs failed | hadoop.nm.shuffle.output.failed | Sum | Long | 
containers running | hadoop.nm.containers.running | Avg | Double | 
containers failed | hadoop.nm.containers.failed | Sum | Long | 
containers inited | hadoop.nm.containers.initiating | Avg | Double | 
shuffle outputs ok | hadoop.nm.shuffle.output.ok | Sum | Long | 
allocated GB | hadoop.nm.allocated | Avg | Double | 
applications killed | hadoop.rm.apps.killed | Sum | Long | 
running 300 | hadoop.rm.running.300 | Avg | Double | 
available MB | hadoop.rm.memory.available | Avg | Double | 
applications failed | hadoop.rm.apps.failed | Sum | Long | 
applications submitted | hadoop.rm.apps.submitted | Sum | Long | 
running 60 | hadoop.rm.running.60 | Avg | Double | 
pending MB | hadoop.rm.memory.pending | Avg | Double | 
applications pending | hadoop.rm.apps.pending | Avg | Double | 
active applications | hadoop.rm.apps.active | Avg | Double | 
containers allocated | hadoop.rm.containers.alloc | Sum | Long | 
running 0 | hadoop.rm.running.0 | Avg | Double | 
containers pending | hadoop.rm.containers.pending | Avg | Double | 
applications completed | hadoop.rm.apps.completed | Sum | Long | 
allocated MB | hadoop.rm.memory.alloc | Avg | Double | 
containers reserved | hadoop.rm.containers.reserved | Avg | Double | 
active users | hadoop.rm.users.active | Avg | Double | 
containers released | hadoop.rm.containers.released | Sum | Long | 
reserved MB | hadoop.rm.memory.reserved | Avg | Double | 
applications running | hadoop.rm.apps.running | Avg | Double | 
running 1440 | hadoop.rm.running.1440 | Avg | Double | 
active NMs | hadoop.rm.nm.active | Avg | Double | 
decom NMs | hadoop.rm.nm.active.decom | Avg | Double | 
rebooted NMs | hadoop.rm.nm.active.rebooted | Avg | Double | 
lost NMs | hadoop.rm.nm.active.lost | Avg | Double | 
unhealthy NMs | hadoop.rm.nm.active.unhealthy | Avg | Double | 
blocks replicated | hadoop.dn.blocks.replicated | Sum | Long | 
blocks read | hadoop.dn.blocks.read | Sum | Long | 
writes from local client | hadoop.dn.io.write.local | Sum | Long | 
copy block op avg time | hadoop.dn.blocks.op.copies.time | Avg | Double | 
heartbeats num ops | hadoop.dn.io.write.hartbeats | Sum | Long | 
reads from remote client | hadoop.dn.io.read.remote | Sum | Long | 
read from local client | hadoop.dn.io.read.local | Sum | Long | 
write block num ops | hadoop.dn.blocks.op.writes | Sum | Long | 
blocks removed | hadoop.dn.blocks.removed | Sum | Long | 
blocks verified | hadoop.dn.blocks.verified | Sum | Long | 
replace block op avg time | hadoop.dn.blocks.op.replaces.time | Avg | Double | 
writes from remote client | hadoop.dn.io.write.remote | Sum | Long | 
replace block num ops | hadoop.dn.blocks.op.replaces | Sum | Long | 
copy block num ops | hadoop.dn.blocks.op.copies | Sum | Long | 
write block op avg time | hadoop.dn.blocks.op.writes.time | Avg | Double | 
blocks written | hadoop.dn.blocks.write | Sum | Long | 
read block op avg time | hadoop.dn.blocks.op.reads.time | Avg | Double | 
heartbeats avg time | hadoop.dn.io.write.hartbeats.time | Avg | Double | 
bytes read | hadoop.dn.io.read | Sum | Long | 
read block num ops | hadoop.dn.blocks.op.reads | Sum | Long | 
bytes written | hadoop.dn.io.write | Sum | Long | 
map task slots | hadoop.tt.maps.slots | Avg | Double | 
reduces running | hadoop.tt.reduces.running | Avg | Double | 
tasks failed timeout | hadoop.tt.tasks.failed.timeout | Sum | Long | 
tasks failed ping | hadoop.tt.tasks.failed.ping | Sum | Long | 
tasks completed | hadoop.tt.tasks.completed | Sum | Long | 
reduce task slots | hadoop.tt.reduces.slots | Avg | Double | 
maps running | hadoop.tt.maps.running | Avg | Double | 
waiting reduces | hadoop.jt.reduces.waiting | Avg | Double | 
waiting maps | hadoop.jt.maps.waiting | Avg | Double | 
jobs killled | hadoop.jt.jobs.killed | Sum | Long | 
jobs submitted | hadoop.jt.jobs.submitted | Sum | Long | 
maps failed | hadoop.jt.maps.failed | Sum | Long | 
running 300 | hadoop.jt.running.300 | Avg | Double | 
maps killled | hadoop.jt.maps.killed | Sum | Long | 
reduce slots | hadoop.jt.reduces.slots | Avg | Double | 
running 60 | hadoop.jt.running.60 | Avg | Double | 
maps launched | hadoop.jt.maps.launched | Sum | Long | 
jobs preparing | hadoop.jt.jobs.preparing | Avg | Double | 
reduces completed | hadoop.jt.reduces.completed | Sum | Long | 
jobs failed | hadoop.jt.jobs.failed | Sum | Long | 
running 1440 | hadoop.jt.running.1440 | Avg | Double | 
reduces launched | hadoop.jt.reduces.launched | Sum | Long | 
map slots | hadoop.jt.maps.slots | Avg | Double | 
reduces killled | hadoop.jt.reduces.killed | Sum | Long | 
maps completed | hadoop.jt.maps.completed | Sum | Long | 
jobs running | hadoop.jt.jobs.running | Avg | Double | 
reduces failed | hadoop.jt.reduces.failed | Sum | Long | 
jobs completed | hadoop.jt.jobs.completed | Sum | Long | 
running 0 | hadoop.jt.running.0 | Avg | Double | 
get listing ops | hadoop.nn.files.ops.listing | Sum | Long | 
renamed files | hadoop.nn.files.renamed | Sum | Long | 
decom nodes | hadoop.nn.nodes.decom | Avg | Double | 
dead nodes | hadoop.nn.nodes.dead | Avg | Double | 
create file ops | hadoop.nn.files.ops.create | Sum | Long | 
blocks pending replication | hadoop.nn.blocks.pending.replication | Avg | Long | 
missing blocks | hadoop.nn.blocks.missing | Avg | Long | 
under replicated blocks | hadoop.nn.blocks.underreplicated | Avg | Long | 
file info ops | hadoop.nn.files.ops.info | Sum | Long | 
blocks total | hadoop.nn.blocks | Avg | Long | 
blocks pending deletion | hadoop.nn.blocks.pending.deletion | Avg | Long | 
corrupt blocks | hadoop.nn.blocks.corrupt | Avg | Long | 
capacity remaining | hadoop.nn.capacity.remaining | Avg | Long | 
total files | hadoop.nn.files | Avg | Long | 
appended files | hadoop.nn.files.appended | Sum | Long | 
excess blocks | hadoop.nn.blocks.excess | Avg | Long | 
capacity used | hadoop.nn.capacity.used | Avg | Long | 
deleted files | hadoop.nn.files.deleted | Sum | Long | 
delete file ops | hadoop.nn.files.ops.delete | Sum | Long | 
capacity total | hadoop.nn.capacity | Avg | Long | 
created files | hadoop.nn.files.created | Sum | Long | 
live nodes | hadoop.nn.nodes.live | Avg | Double | 
scheduled replication blocks | hadoop.nn.blocks.scheduled.replication | Avg | Long | 
heartbeats | hadoop.jt.heartbeats | Sum | Long | 
blacklisted trackers | hadoop.jt.reduces.trackers.blacklisted | Sum | Long | 
running reduces | hadoop.jt.reduces.running | Avg | Double | 
occupied map slots | hadoop.jt.slots.map.occupied | Avg | Double | 
running maps | hadoop.jt.maps.running | Avg | Double | 
blacklisted maps | hadoop.jt.maps.blacklisted | Sum | Long | 
blacklisted reduces | hadoop.jt.reduces.blacklisted | Sum | Long | 
occupied reduce slots | hadoop.jt.slots.reduce.occupied | Avg | Double | 
decommissioned trackers | hadoop.jt.reduces.trackers.decommissioned | Sum | Long | 
trackers | hadoop.jt.reduces.trackers | Sum | Long | 
waiting reduces | hadoop.jt.waiting.reduces | Avg | Double | 
waiting maps | hadoop.jt.waiting.maps | Avg | Double | 
map slots | hadoop.jt.slots.map | Avg | Double | 
graylisted trackers | hadoop.jt.reduces.trackers.graylisted | Sum | Long | 
reduce slots | hadoop.jt.slots.reduce | Avg | Double | 