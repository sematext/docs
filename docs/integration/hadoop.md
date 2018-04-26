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

Metric Name                          |  Key                                        |  Metric Type  |  Numeric Type  |  Unit   |  Description
-------------------------------------|---------------------------------------------|---------------|----------------|---------|-------------
copy block ops                       |  hadoop.dn.blocks.op.copies                 |  counter      |  long          |         |
copy block op avg time               |  hadoop.dn.blocks.op.copies.time            |  gauge        |  double        |  ms     |
block checksum op avg time           |  hadoop.dn.blocks.op.checksum.time          |  gauge        |  double        |  ms     |
block checksum num ops               |  hadoop.dn.blocks.op.checksum               |  counter      |  long          |         |
block report op avg time             |  hadoop.dn.blocks.op.reports.time           |  gauge        |  double        |  ms     |
block report ops                     |  hadoop.dn.blocks.op.reports                |  counter      |  long          |         |
read block ops                       |  hadoop.dn.blocks.op.reads                  |  counter      |  long          |         |
read block op avg time               |  hadoop.dn.blocks.op.reads.time             |  gauge        |  double        |  ms     |
replace block ops                    |  hadoop.dn.blocks.op.replaces               |  counter      |  long          |         |
replace block op avg time            |  hadoop.dn.blocks.op.replaces.time          |  gauge        |  double        |  ms     |
write block ops                      |  hadoop.dn.blocks.op.writes                 |  counter      |  long          |         |
write block op avg time              |  hadoop.dn.blocks.op.writes.time            |  gauge        |  double        |  ms     |
blocks read                          |  hadoop.dn.blocks.read                      |  counter      |  long          |         |
blocks removed                       |  hadoop.dn.blocks.removed                   |  counter      |  long          |         |
blocks replicated                    |  hadoop.dn.blocks.replicated                |  counter      |  long          |         |
blocks verified                      |  hadoop.dn.blocks.verified                  |  counter      |  long          |         |
blocks written                       |  hadoop.dn.blocks.write                     |  counter      |  long          |         |
data node bytes read                 |  hadoop.dn.io.read                          |  counter      |  long          |         |
data node reads from local client    |  hadoop.dn.io.read.local                    |  counter      |  long          |         |
data node reads from remote client   |  hadoop.dn.io.read.remote                   |  counter      |  long          |         |
data node bytes written              |  hadoop.dn.io.write                         |  counter      |  long          |         |
data node heartbeats ops             |  hadoop.dn.io.write.heartbeats              |  counter      |  long          |         |
data node heartbeats avg time        |  hadoop.dn.io.write.heartbeats.time         |  gauge        |  double        |  ms     |
data node writes from local client   |  hadoop.dn.io.write.local                   |  counter      |  long          |         |
data node writes from remote client  |  hadoop.dn.io.write.remote                  |  counter      |  long          |         |
jobtracker heartbeats                |  hadoop.jt.heartbeats                       |  counter      |  long          |         |
jobs completed                       |  hadoop.jt.jobs.completed                   |  counter      |  long          |         |
jobs failed                          |  hadoop.jt.jobs.failed                      |  counter      |  long          |         |
jobs killled                         |  hadoop.jt.jobs.killed                      |  counter      |  long          |         |
jobs preparing                       |  hadoop.jt.jobs.preparing                   |  gauge        |  long          |         |
jobs running                         |  hadoop.jt.jobs.running                     |  gauge        |  long          |         |
jobs submitted                       |  hadoop.jt.jobs.submitted                   |  counter      |  long          |         |
blacklisted maps                     |  hadoop.jt.maps.blacklisted                 |  counter      |  long          |         |
maps completed                       |  hadoop.jt.maps.completed                   |  counter      |  long          |         |
maps failed                          |  hadoop.jt.maps.failed                      |  counter      |  long          |         |
maps killled                         |  hadoop.jt.maps.killed                      |  counter      |  long          |         |
maps launched                        |  hadoop.jt.maps.launched                    |  counter      |  long          |         |
running maps                         |  hadoop.jt.maps.running                     |  gauge        |  long          |         |
map slots                            |  hadoop.jt.maps.slots                       |  gauge        |  long          |         |
waiting maps                         |  hadoop.jt.maps.waiting                     |  gauge        |  long          |         |
blacklisted reduces                  |  hadoop.jt.reduces.blacklisted              |  counter      |  long          |         |
reduces completed                    |  hadoop.jt.reduces.completed                |  counter      |  long          |         |
reduces failed                       |  hadoop.jt.reduces.failed                   |  counter      |  long          |         |
reduces killled                      |  hadoop.jt.reduces.killed                   |  counter      |  long          |         |
reduces launched                     |  hadoop.jt.reduces.launched                 |  counter      |  long          |         |
running reduces                      |  hadoop.jt.reduces.running                  |  gauge        |  long          |         |
reduce slots                         |  hadoop.jt.reduces.slots                    |  gauge        |  long          |         |
trackers                             |  hadoop.jt.reduces.trackers                 |  counter      |  long          |         |
blacklisted trackers                 |  hadoop.jt.reduces.trackers.blacklisted     |  counter      |  long          |         |
decommissioned trackers              |  hadoop.jt.reduces.trackers.decommissioned  |  counter      |  long          |         |
graylisted trackers                  |  hadoop.jt.reduces.trackers.graylisted      |  counter      |  long          |         |
waiting reduces                      |  hadoop.jt.reduces.waiting                  |  gauge        |  long          |         |
running 0                            |  hadoop.jt.running.0                        |  gauge        |  long          |         |
running 1440                         |  hadoop.jt.running.1440                     |  gauge        |  long          |         |
running 300                          |  hadoop.jt.running.300                      |  gauge        |  long          |         |
running 60                           |  hadoop.jt.running.60                       |  gauge        |  long          |         |
map slots                            |  hadoop.jt.slots.map                        |  gauge        |  long          |         |
occupied map slots                   |  hadoop.jt.slots.map.occupied               |  gauge        |  long          |         |
reduce slots                         |  hadoop.jt.slots.reduce                     |  gauge        |  long          |         |
occupied reduce slots                |  hadoop.jt.slots.reduce.occupied            |  gauge        |  long          |         |
waiting maps                         |  hadoop.jt.waiting.maps                     |  gauge        |  long          |         |
waiting reduces                      |  hadoop.jt.waiting.reduces                  |  gauge        |  long          |         |
allocated GB                         |  hadoop.nm.allocated.gb                     |  gauge        |  long          |  GB     |
available GB                         |  hadoop.nm.available.gb                     |  gauge        |  long          |  GB     |
num allocated containers             |  hadoop.nm.containers.allocated             |  gauge        |  long          |         |
containers completed                 |  hadoop.nm.containers.completed             |  counter      |  long          |         |
containers failed                    |  hadoop.nm.containers.failed                |  counter      |  long          |         |
containers inited                    |  hadoop.nm.containers.initiating            |  gauge        |  long          |         |
containers killed                    |  hadoop.nm.containers.killed                |  counter      |  long          |         |
containers launched                  |  hadoop.nm.containers.launched              |  counter      |  long          |         |
containers running                   |  hadoop.nm.containers.running               |  gauge        |  long          |         |
shuffle connections                  |  hadoop.nm.shuffle.connections              |  counter      |  long          |         |
shuffle output size                  |  hadoop.nm.shuffle.output.bytes             |  counter      |  long          |  bytes  |
shuffle outputs failed               |  hadoop.nm.shuffle.output.failed            |  counter      |  long          |         |
shuffle outputs ok                   |  hadoop.nm.shuffle.output.ok                |  counter      |  long          |         |
blocks total                         |  hadoop.nn.blocks                           |  gauge        |  long          |         |
corrupt blocks                       |  hadoop.nn.blocks.corrupt                   |  gauge        |  long          |         |
excess blocks                        |  hadoop.nn.blocks.excess                    |  gauge        |  long          |         |
missing blocks                       |  hadoop.nn.blocks.missing                   |  gauge        |  long          |         |
blocks pending deletion              |  hadoop.nn.blocks.pending.deletion          |  gauge        |  long          |         |
blocks pending replication           |  hadoop.nn.blocks.pending.replication       |  gauge        |  long          |         |
scheduled replication blocks         |  hadoop.nn.blocks.scheduled.replication     |  gauge        |  long          |         |
under replicated blocks              |  hadoop.nn.blocks.underreplicated           |  gauge        |  long          |         |
capacity total                       |  hadoop.nn.capacity                         |  gauge        |  long          |         |
capacity remaining                   |  hadoop.nn.capacity.remaining               |  gauge        |  long          |         |
capacity used                        |  hadoop.nn.capacity.used                    |  gauge        |  long          |         |
total files                          |  hadoop.nn.files                            |  gauge        |  long          |         |
appended files                       |  hadoop.nn.files.appended                   |  counter      |  long          |         |
created files                        |  hadoop.nn.files.created                    |  counter      |  long          |         |
deleted files                        |  hadoop.nn.files.deleted                    |  counter      |  long          |         |
create file ops                      |  hadoop.nn.files.ops.create                 |  counter      |  long          |         |
delete file ops                      |  hadoop.nn.files.ops.delete                 |  counter      |  long          |         |
file info ops                        |  hadoop.nn.files.ops.info                   |  counter      |  long          |         |
get listing ops                      |  hadoop.nn.files.ops.listing                |  counter      |  long          |         |
renamed files                        |  hadoop.nn.files.renamed                    |  counter      |  long          |         |
dead nodes                           |  hadoop.nn.nodes.dead                       |  gauge        |  long          |         |
decom nodes                          |  hadoop.nn.nodes.decom                      |  gauge        |  long          |         |
live nodes                           |  hadoop.nn.nodes.live                       |  gauge        |  long          |         |
active applications                  |  hadoop.rm.apps.active                      |  gauge        |  long          |         |
applications completed               |  hadoop.rm.apps.completed                   |  counter      |  long          |         |
applications failed                  |  hadoop.rm.apps.failed                      |  counter      |  long          |         |
applications killed                  |  hadoop.rm.apps.killed                      |  counter      |  long          |         |
applications pending                 |  hadoop.rm.apps.pending                     |  gauge        |  long          |         |
applications running                 |  hadoop.rm.apps.running                     |  gauge        |  long          |         |
applications submitted               |  hadoop.rm.apps.submitted                   |  counter      |  long          |         |
containers allocated                 |  hadoop.rm.containers.alloc                 |  gauge        |  long          |         |
containers pending                   |  hadoop.rm.containers.pending               |  gauge        |  long          |         |
containers released                  |  hadoop.rm.containers.released              |  counter      |  long          |         |
agg containers allocated             |  hadoop.rm.agg.containers.alloc             |  counter      |  long          |         |
containers reserved                  |  hadoop.rm.containers.reserved              |  gauge        |  long          |         |
allocated MB                         |  hadoop.rm.memory.alloc.mb                  |  gauge        |  long          |  MB     |
available MB                         |  hadoop.rm.memory.available.mb              |  gauge        |  long          |  MB     |
pending MB                           |  hadoop.rm.memory.pending.mb                |  gauge        |  long          |  MB     |
reserved MB                          |  hadoop.rm.memory.reserved.mb               |  gauge        |  long          |  MB     |
active NMs                           |  hadoop.rm.nm.active                        |  gauge        |  long          |         |
decom NMs                            |  hadoop.rm.nm.active.decom                  |  gauge        |  long          |         |
lost NMs                             |  hadoop.rm.nm.active.lost                   |  gauge        |  long          |         |
rebooted NMs                         |  hadoop.rm.nm.active.rebooted               |  gauge        |  long          |         |
unhealthy NMs                        |  hadoop.rm.nm.active.unhealthy              |  gauge        |  long          |         |
running 0                            |  hadoop.rm.running.0                        |  gauge        |  long          |         |
running 1440                         |  hadoop.rm.running.1440                     |  gauge        |  long          |         |
running 300                          |  hadoop.rm.running.300                      |  gauge        |  long          |         |
running 60                           |  hadoop.rm.running.60                       |  gauge        |  long          |         |
active users                         |  hadoop.rm.users.active                     |  gauge        |  long          |         |
maps running                         |  hadoop.tt.maps.running                     |  gauge        |  long          |         |
map task slots                       |  hadoop.tt.maps.slots                       |  gauge        |  long          |         |
reduces running                      |  hadoop.tt.reduces.running                  |  gauge        |  long          |         |
reduce task slots                    |  hadoop.tt.reduces.slots                    |  gauge        |  long          |         |
tasks completed                      |  hadoop.tt.tasks.completed                  |  counter      |  long          |         |
tasks failed ping                    |  hadoop.tt.tasks.failed.ping                |  counter      |  long          |         |
tasks failed timeout                 |  hadoop.tt.tasks.failed.timeout             |  counter      |  long          |         |