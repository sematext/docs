title: PostgreSQL Monitoring Integration
description: Comprehensive view of your database’s health and performance with Sematext PostgreSQL monitoring integration. Our infrastructure monitoring tools provide real-time visibility into the performance and availability of various PostgreSQL databases metrics. Use built-in reports and dashboards, and identify and investigate PostgreSQL database server issues before they become incidents

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/postgresql/overview](https://apps.sematext.com/ui/howto/postgresql/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                                     |  Description
----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
active backends use<br>**transaction.open.count** <br>*(long gauge)*                             |  Number of backends executing a query
idle backends<br>**transaction.idle.count** <br>*(long gauge)*                             |  Number of backends in a transaction, but not currently executing a query
WAL files<br>**archiver.wal.success.count** <br>*(counter)*                             |  Number of WAL files that have been successfully archived
failed WAL files<br>**archiver.wal.failed.count** <br>*(counter)*                             |  Number of failed attempts to archive WAL files
scheduled checkpoints<br>**bgwriter.checkpoints.scheduled** <br>*(counter)*                             |  Number of scheduled checkpoints that have been performed
requested checkpoints<br>**bgwriter.checkpoints.requested** <br>*(counter)*                             |  Number of requested checkpoints that have been performed
checkpoint buffers<br>**bgwriter.buffers.written** <br>*(counter)*                             |  Number of buffers written during checkpoints
cleaned buffers<br>**bgwriter.buffers.clean** <br>*(counter)*                             |  Number of buffers written by the background writer
max written clean buffers<br>**bgwriter.buffers.cleaning.maxwritten.stopped** <br>*(counter)*                             |  Number of times the background writer stopped a cleaning scan because it had written too many buffers
backend buffers<br>**bgwriter.buffers.backend** <br>*(counter)*                             |  Number of buffers written directly by a backend
allocated buffers<br>**bgwriter.buffers.alloc** <br>*(counter)*                             |  Number of buffers allocated
active connections<br>**database.connections.active.count** <br>*(long gauge)*                             |  Number of backends currently connected to this database
committed transactions<br>**database.transactions.commit** <br>*(counter)*                             |  Number of transactions in this database that have been committed
rolled back transactions<br>**database.transactions.rollback** <br>*(counter)*                             |  Number of transactions in this database that have been rolled back
disk blocks read<br>**database.blocks.read** <br>*(counter)*                             |  Number of disk blocks read in this database
disk block cache hit<br>**database.blocks.hit** <br>*(counter)*                             |  Number of times disk blocks were found already in the buffer cache, so that a read was not necessary (this only includes hits in the PostgreSQL buffer cache, not the operating system's file system cache)
rows returned<br>**database.rows.returned** <br>*(counter)*                             |  Number of rows returned by queries in this database
rows fetched<br>**database.rows.fetched** <br>*(counter)*                             |  Number of rows fetched by queries in this database
rows inserted<br>**database.rows.inserted** <br>*(counter)*                             |  Number of rows inserted by queries in this database
rows updated<br>**database.rows.updated** <br>*(counter)*                             |  Number of rows updated by queries in this database
rows deleted<br>**database.rows.deleted** <br>*(counter)*                             |  Number of rows deleted by queries in this database
max connections<br>**database.connections.max** <br>*(double gauge)*                             |  Maximum number of concurrent connections to the database server. Parameter set at server startup
percent usage connections<br>**database.connections.usage** <br>*(double gauge)*                             |  Percentage of used connections (ratio between number of active backends and maximum allowed connections)
table count<br>**table.count** <br>*(long gauge)*                             |  Number of tables in this DB
function calls<br>**function.calls** <br>*(counter)*                             |  Number of times this function has been called
function total time<br>**function.time.total** <br>*(counter)*                             |  Total time spent in this function and all other functions called by it, in milliseconds
function self time<br>**function.time.self** <br>*(counter)*                             |  Total time spent in this function itself, not including other functions called by it, in milliseconds
index scan<br>**indexes.scan** <br>*(counter)*                             |  Number of index scans initiated on this index
returned index entries<br>**indexes.rows.read** <br>*(counter)*                             |   Number of index entries returned by scans on this index
fetched rows<br>**indexes.rows.feched** <br>*(counter)*                             |  Number of live rows fetched by index scans
lock count<br>**lock.count** <br>*(long gauge)*                             |  Number of active lockable objects
sequential scans<br>**tables.scan.sequential** <br>*(counter)*                             |  Number of sequential scans initiated on a table
sequential rows fetched<br>**tables.rows.fetched.sequential** <br>*(counter)*                             |  Number of live rows fetched by sequential scans
index rows fetched<br>**tables.rows.fetched.index** <br>*(counter)*                             |  Number of live rows fetched by index scans
inserted rows<br>**tables.rows.inserted** <br>*(counter)*                             |  Number of rows inserted
updated rows<br>**tables.rows.updated** <br>*(counter)*                             |  Number of rows updated
deleted rows<br>**tables.rows.deleted** <br>*(counter)*                             |  Number of rows deleted
hot updated rows<br>**tables.rows.hot.updated** <br>*(counter)*                             |  Number of rows hot updated (i.e., with no separate index update required)
live rows<br>**tables.rows.live** <br>*(long gauge)*                             |  Estimated number of live rows
dead rows<br>**tables.rows.dead** <br>*(long gauge)*                             |  Estimated number of dead rows
replication delay<br>**replication.delay.time** <br>*(long gauge)*                             |  Replication delay in milliseconds
replication delay bytes<br>**replication.delay.bytes** <br>*(long gauge)*                             |  Replication delay in bytes
table size<br>**table.disk.size** <br>*(long gauge)*                             |  Disk space used by the a table, excluding indexes (but including TOAST, free space map, and visibility map)
index size<br>**index.disk.size** <br>*(long gauge)*                             |  Total disk space used by indexes attached to the a table
total size<br>**table.total.disk.size** <br>*(long gauge)*                             |  Total disk space used by the a table, including all indexes and TOAST data
read disk blocks<br>**statio.heap.blocks.read** <br>*(counter)*                             |  Number of disk blocks read from a table
hit disk blocks<br>**statio.heap.blocks.hit** <br>*(counter)*                             |  Number of buffer hits in a table
read index blocks<br>**statio.index.blocks.read** <br>*(tttttt)*                             |  Number of disk blocks read from all indexes on a table
hit index blocks<br>**statio.index.blocks.hit** <br>*(counter)*                             |  Number of buffer hits in all indexes on a table
read TOAST blocks<br>**statio.toast.blocks.read** <br>*(counter)*                             |  Number of disk blocks read from a table's TOAST table (if any)
hit TOAST buffers<br>**statio.toast.blocks.hit** <br>*(counter)*                             |  Number of buffer hits in a table's TOAST table (if any)
read TOAST index<br>**statio.tidx.blocks.read** <br>*(counter)*                             |  Number of disk blocks read from a table's TOAST table index (if any)
hit TOAST buffer<br>**statio.tidx.blocks.hit** <br>*(counter)*                             |  Number of buffer hits in a table's TOAST table index (if any)


## Troubleshooting

If you are having issues with Sematext Monitoring, i.e. not seeing PostgreSQL metrics, see
[How do I create the diagnostics package](/monitoring/spm-faq/#how-do-i-create-the-diagnostics-package).

For more troubleshooting information please look at the [Troubleshooting](/monitoring/spm-faq/#troubleshooting) section.
