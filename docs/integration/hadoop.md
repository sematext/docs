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

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Hadoop-YARN/overview](https://apps.sematext.com/ui/howto/Hadoop-YARN/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                |  Description
-----------------------------------------------------------------------------------------------------|-------------
data node bytes read<br>**hadoop.dn.io.read** <br>*(long counter)*                                   |
data node bytes written<br>**hadoop.dn.io.write** <br>*(long counter)*                               |
data node reads from local client<br>**hadoop.dn.io.read.local** <br>*(long counter)*                |
data node reads from remote client<br>**hadoop.dn.io.read.remote** <br>*(long counter)*              |
data node writes from local client<br>**hadoop.dn.io.write.local** <br>*(long counter)*              |
data node writes from remote client<br>**hadoop.dn.io.write.remote** <br>*(long counter)*            |
data node heartbeats avg time<br>**hadoop.dn.io.write.heartbeats.time** <br>*(double gauge)* *(ms)*  |
data node heartbeats ops<br>**hadoop.dn.io.write.heartbeats** <br>*(long counter)*                   |
block checksum op avg time<br>**hadoop.dn.blocks.op.checksum.time** <br>*(double gauge)* *(ms)*      |
block checksum num ops<br>**hadoop.dn.blocks.op.checksum** <br>*(long counter)*                      |
block report op avg time<br>**hadoop.dn.blocks.op.reports.time** <br>*(double gauge)* *(ms)*         |
block report ops<br>**hadoop.dn.blocks.op.reports** <br>*(long counter)*                             |
copy block op avg time<br>**hadoop.dn.blocks.op.copies.time** <br>*(double gauge)* *(ms)*            |
copy block ops<br>**hadoop.dn.blocks.op.copies** <br>*(long counter)*                                |
read block op avg time<br>**hadoop.dn.blocks.op.reads.time** <br>*(double gauge)* *(ms)*             |
read block ops<br>**hadoop.dn.blocks.op.reads** <br>*(long counter)*                                 |
replace block op avg time<br>**hadoop.dn.blocks.op.replaces.time** <br>*(double gauge)* *(ms)*       |
replace block ops<br>**hadoop.dn.blocks.op.replaces** <br>*(long counter)*                           |
write block op avg time<br>**hadoop.dn.blocks.op.writes.time** <br>*(double gauge)* *(ms)*           |
write block ops<br>**hadoop.dn.blocks.op.writes** <br>*(long counter)*                               |
blocks read<br>**hadoop.dn.blocks.read** <br>*(long counter)*                                        |
blocks removed<br>**hadoop.dn.blocks.removed** <br>*(long counter)*                                  |
blocks replicated<br>**hadoop.dn.blocks.replicated** <br>*(long counter)*                            |
blocks verified<br>**hadoop.dn.blocks.verified** <br>*(long counter)*                                |
blocks written<br>**hadoop.dn.blocks.write** <br>*(long counter)*                                    |
jobtracker heartbeats<br>**hadoop.jt.heartbeats** <br>*(long counter)*                               |
running maps<br>**hadoop.jt.maps.running** <br>*(long gauge)*                                        |
running reduces<br>**hadoop.jt.reduces.running** <br>*(long gauge)*                                  |
waiting maps<br>**hadoop.jt.maps.waiting** <br>*(long gauge)*                                        |
waiting reduces<br>**hadoop.jt.reduces.waiting** <br>*(long gauge)*                                  |
blacklisted maps<br>**hadoop.jt.maps.blacklisted** <br>*(long counter)*                              |
blacklisted reduces<br>**hadoop.jt.reduces.blacklisted** <br>*(long counter)*                        |
trackers<br>**hadoop.jt.reduces.trackers** <br>*(long counter)*                                      |
blacklisted trackers<br>**hadoop.jt.reduces.trackers.blacklisted** <br>*(long counter)*              |
decommissioned trackers<br>**hadoop.jt.reduces.trackers.decommissioned** <br>*(long counter)*        |
graylisted trackers<br>**hadoop.jt.reduces.trackers.graylisted** <br>*(long counter)*                |
reduce slots<br>**hadoop.jt.slots.reduce** <br>*(long gauge)*                                        |
map slots<br>**hadoop.jt.slots.map** <br>*(long gauge)*                                              |
occupied map slots<br>**hadoop.jt.slots.map.occupied** <br>*(long gauge)*                            |
occupied reduce slots<br>**hadoop.jt.slots.reduce.occupied** <br>*(long gauge)*                      |
jobs completed<br>**hadoop.jt.jobs.completed** <br>*(long counter)*                                  |
jobs failed<br>**hadoop.jt.jobs.failed** <br>*(long counter)*                                        |
jobs killled<br>**hadoop.jt.jobs.killed** <br>*(long counter)*                                       |
jobs preparing<br>**hadoop.jt.jobs.preparing** <br>*(long gauge)*                                    |
jobs running<br>**hadoop.jt.jobs.running** <br>*(long gauge)*                                        |
jobs submitted<br>**hadoop.jt.jobs.submitted** <br>*(long counter)*                                  |
maps completed<br>**hadoop.jt.maps.completed** <br>*(long counter)*                                  |
maps failed<br>**hadoop.jt.maps.failed** <br>*(long counter)*                                        |
maps killled<br>**hadoop.jt.maps.killed** <br>*(long counter)*                                       |
maps launched<br>**hadoop.jt.maps.launched** <br>*(long counter)*                                    |
reduces completed<br>**hadoop.jt.reduces.completed** <br>*(long counter)*                            |
reduces failed<br>**hadoop.jt.reduces.failed** <br>*(long counter)*                                  |
reduces killled<br>**hadoop.jt.reduces.killed** <br>*(long counter)*                                 |
reduces launched<br>**hadoop.jt.reduces.launched** <br>*(long counter)*                              |
map slots<br>**hadoop.jt.maps.slots** <br>*(long gauge)*                                             |
reduce slots<br>**hadoop.jt.reduces.slots** <br>*(long gauge)*                                       |
waiting maps<br>**hadoop.jt.waiting.maps** <br>*(long gauge)*                                        |
waiting reduces<br>**hadoop.jt.waiting.reduces** <br>*(long gauge)*                                  |
running 0<br>**hadoop.jt.running.0** <br>*(long gauge)*                                              |
running 60<br>**hadoop.jt.running.60** <br>*(long gauge)*                                            |
running 300<br>**hadoop.jt.running.300** <br>*(long gauge)*                                          |
running 1440<br>**hadoop.jt.running.1440** <br>*(long gauge)*                                        |
live nodes<br>**hadoop.nn.nodes.live** <br>*(long gauge)*                                            |
dead nodes<br>**hadoop.nn.nodes.dead** <br>*(long gauge)*                                            |
decom nodes<br>**hadoop.nn.nodes.decom** <br>*(long gauge)*                                          |
blocks total<br>**hadoop.nn.blocks** <br>*(long gauge)*                                              |
corrupt blocks<br>**hadoop.nn.blocks.corrupt** <br>*(long gauge)*                                    |
excess blocks<br>**hadoop.nn.blocks.excess** <br>*(long gauge)*                                      |
missing blocks<br>**hadoop.nn.blocks.missing** <br>*(long gauge)*                                    |
blocks pending deletion<br>**hadoop.nn.blocks.pending.deletion** <br>*(long gauge)*                  |
blocks pending replication<br>**hadoop.nn.blocks.pending.replication** <br>*(long gauge)*            |
scheduled replication blocks<br>**hadoop.nn.blocks.scheduled.replication** <br>*(long gauge)*        |
under replicated blocks<br>**hadoop.nn.blocks.underreplicated** <br>*(long gauge)*                   |
capacity remaining<br>**hadoop.nn.capacity.remaining** <br>*(long gauge)*                            |
capacity total<br>**hadoop.nn.capacity** <br>*(long gauge)*                                          |
capacity used<br>**hadoop.nn.capacity.used** <br>*(long gauge)*                                      |
total files<br>**hadoop.nn.files** <br>*(long gauge)*                                                |
create file ops<br>**hadoop.nn.files.ops.create** <br>*(long counter)*                               |
get listing ops<br>**hadoop.nn.files.ops.listing** <br>*(long counter)*                              |
delete file ops<br>**hadoop.nn.files.ops.delete** <br>*(long counter)*                               |
file info ops<br>**hadoop.nn.files.ops.info** <br>*(long counter)*                                   |
created files<br>**hadoop.nn.files.created** <br>*(long counter)*                                    |
appended files<br>**hadoop.nn.files.appended** <br>*(long counter)*                                  |
renamed files<br>**hadoop.nn.files.renamed** <br>*(long counter)*                                    |
deleted files<br>**hadoop.nn.files.deleted** <br>*(long counter)*                                    |
num allocated containers<br>**hadoop.nm.containers.allocated** <br>*(long gauge)*                    |
allocated GB<br>**hadoop.nm.allocated.gb** <br>*(long gauge)* *(GB)*                                 |
available GB<br>**hadoop.nm.available.gb** <br>*(long gauge)* *(GB)*                                 |
containers completed<br>**hadoop.nm.containers.completed** <br>*(long counter)*                      |
containers failed<br>**hadoop.nm.containers.failed** <br>*(long counter)*                            |
containers inited<br>**hadoop.nm.containers.initiating** <br>*(long gauge)*                          |
containers killed<br>**hadoop.nm.containers.killed** <br>*(long counter)*                            |
containers launched<br>**hadoop.nm.containers.launched** <br>*(long counter)*                        |
containers running<br>**hadoop.nm.containers.running** <br>*(long gauge)*                            |
shuffle connections<br>**hadoop.nm.shuffle.connections** <br>*(long counter)*                        |
shuffle output size<br>**hadoop.nm.shuffle.output.bytes** <br>*(long counter)* *(bytes)*             |
shuffle outputs failed<br>**hadoop.nm.shuffle.output.failed** <br>*(long counter)*                   |
shuffle outputs ok<br>**hadoop.nm.shuffle.output.ok** <br>*(long counter)*                           |
active applications<br>**hadoop.rm.apps.active** <br>*(long gauge)*                                  |
active users<br>**hadoop.rm.users.active** <br>*(long gauge)*                                        |
agg containers allocated<br>**hadoop.rm.agg.containers.alloc** <br>*(long counter)*                  |
containers released<br>**hadoop.rm.containers.released** <br>*(long counter)*                        |
containers allocated<br>**hadoop.rm.containers.alloc** <br>*(long gauge)*                            |
allocated MB<br>**hadoop.rm.memory.alloc.mb** <br>*(long gauge)* *(MB)*                              |
applications completed<br>**hadoop.rm.apps.completed** <br>*(long counter)*                          |
applications failed<br>**hadoop.rm.apps.failed** <br>*(long counter)*                                |
applications killed<br>**hadoop.rm.apps.killed** <br>*(long counter)*                                |
applications pending<br>**hadoop.rm.apps.pending** <br>*(long gauge)*                                |
applications running<br>**hadoop.rm.apps.running** <br>*(long gauge)*                                |
applications submitted<br>**hadoop.rm.apps.submitted** <br>*(long counter)*                          |
available MB<br>**hadoop.rm.memory.available.mb** <br>*(long gauge)* *(MB)*                          |
containers pending<br>**hadoop.rm.containers.pending** <br>*(long gauge)*                            |
pending MB<br>**hadoop.rm.memory.pending.mb** <br>*(long gauge)* *(MB)*                              |
containers reserved<br>**hadoop.rm.containers.reserved** <br>*(long gauge)*                          |
reserved MB<br>**hadoop.rm.memory.reserved.mb** <br>*(long gauge)* *(MB)*                            |
running 0<br>**hadoop.rm.running.0** <br>*(long gauge)*                                              |
running 60<br>**hadoop.rm.running.60** <br>*(long gauge)*                                            |
running 300<br>**hadoop.rm.running.300** <br>*(long gauge)*                                          |
running 1440<br>**hadoop.rm.running.1440** <br>*(long gauge)*                                        |
active NMs<br>**hadoop.rm.nm.active** <br>*(long gauge)*                                             |
decom NMs<br>**hadoop.rm.nm.active.decom** <br>*(long gauge)*                                        |
lost NMs<br>**hadoop.rm.nm.active.lost** <br>*(long gauge)*                                          |
rebooted NMs<br>**hadoop.rm.nm.active.rebooted** <br>*(long gauge)*                                  |
unhealthy NMs<br>**hadoop.rm.nm.active.unhealthy** <br>*(long gauge)*                                |
map task slots<br>**hadoop.tt.maps.slots** <br>*(long gauge)*                                        |
maps running<br>**hadoop.tt.maps.running** <br>*(long gauge)*                                        |
reduce task slots<br>**hadoop.tt.reduces.slots** <br>*(long gauge)*                                  |
reduces running<br>**hadoop.tt.reduces.running** <br>*(long gauge)*                                  |
tasks completed<br>**hadoop.tt.tasks.completed** <br>*(long counter)*                                |
tasks failed ping<br>**hadoop.tt.tasks.failed.ping** <br>*(long counter)*                            |
tasks failed timeout<br>**hadoop.tt.tasks.failed.timeout** <br>*(long counter)*                      |