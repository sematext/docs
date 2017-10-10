## Metrics

### Report: MySQL Table Stats

#### Chart: Table Flush
Metric Name | Metric Description
--- | ---
flush commands | <b>Flush_commands</b>: The number of times the server flushes tables, whether because a user executed a FLUSH TABLES statement or due to                            internal server operation

#### Chart: Table Stats
Metric Name | Metric Description
--- | ---
created tmp disk tables | <b>Created_tmp_disk_tables</b>: The number of internal on-disk temporary tables created by the server while executing statements.                            If an internal temporary table is created initially as an in-memory table but becomes too large,                             MySQL automatically converts it to an on-disk table
created tmp tables | <b>Created_tmp_tables</b>: The number of internal temporary tables created by the server while executing statements
open table definitions | <b>Open_table_definitions</b>: The number of cached .frm files
open tables | <b>Open_tables</b>: The number of tables that are open
opened table definitions | <b>Opened_table_definitions</b>: The number of .frm files that have been cached
opened tables | <b>Opened_tables</b>: The number of tables that have been opened. If Opened_tables is big, your table_open_cache value is probably too small
table definition cache | <b>table_definition_cache</b>: The number of table definitions (from .frm files) that can be stored in the definition cache. If you                             use a large number of tables, you can create a large table definition cache to speed up opening of                             tables. This variable was added in MySQL 5.1.3
table open cache | <b>table_open_cache</b>: The number of open tables for all threads. Increasing this value increases the number of file descriptors                            that mysqld requires. You can check whether you need to increase the table cache by checking the Opened_tables                            status variable

#### Chart: Table Locks
Metric Name | Metric Description
--- | ---
table locks immediate | <b>Table_locks_immediate</b>: The number of times that a request for a table lock could be granted immediately
table locks waited | <b>Table_locks_waited</b>: The number of times that a request for a table lock could not be granted immediately and a wait was needed.                           If this is high and you have performance problems, you should first optimize your queries, and then either                           split your table or tables or use replication



### Report: MySQL InnoDB Buffer Pool

#### Chart: Read/Write
Metric Name | Metric Description
--- | ---
innodb buffer pool read ahead rnd | <b>Innodb_buffer_pool_read_ahead_rnd</b>: The number of “random” read-aheads initiated by InnoDB. This happens when a query scans a large portion of a table but in random order
innodb buffer pool read ahead seq | <b>Innodb_buffer_pool_read_ahead_seq</b>: The number of sequential read-aheads initiated by InnoDB. This happens when InnoDB does a sequential full table scan
innodb buffer pool read ahead | <b>Innodb_buffer_pool_read_ahead</b>: The number of pages read into the InnoDB buffer pool by the read-ahead background thread. This variable was added in MySQL 5.1.41
innodb buffer pool read ahead evicted | <b>Innodb_buffer_pool_read_ahead_evicted</b>: The number of pages read into the InnoDB buffer pool by the read-ahead background thread that were subsequently evicted without having been accessed by queries.                             This variable was added in MySQL 5.1.41
innodb buffer pool read requests | <b>Innodb_buffer_pool_read_requests</b>: The number of logical read requests
innodb buffer pool reads | <b>Innodb_buffer_pool_reads</b>: The number of logical reads that InnoDB could not satisfy from the buffer pool, and had to read directly from the disk
innodb buffer pool wait free | <b>Innodb_buffer_pool_wait_free</b>: Normally, writes to the InnoDB buffer pool happen in the background. However, if it is necessary to read or create a page and no clean pages are available,                            it is also necessary to wait for pages to be flushed first. This counter counts instances of these waits. If the buffer pool size has been set properly,                            this value should be small.
innodb buffer pool write requests | <b>Innodb_buffer_pool_write_requests</b>: The number writes done to the InnoDB buffer pool
innodb read ahead threshold | <b>innodb_read_ahead_threshold</b>: Controls the sensitivity of linear read-ahead that InnoDB uses to prefetch pages into the buffer pool. The permissible range of values is 0 to 64. The default                             is 56: InnoDB must read at least 56 pages sequentially from an extent to initiate an asynchronous read for the following extent

#### Chart: Pages/Bytes
Metric Name | Metric Description
--- | ---
innodb buffer pool pages data | <b>Innodb_buffer_pool_pages_data</b>: The number of pages in the InnoDB buffer pool containing data. The number includes both dirty and clean pages
innodb buffer pool bytes data | <b>Innodb_buffer_pool_bytes_data</b>: The total number of bytes in the InnoDB buffer pool containing data. The number includes both dirty and clean pages
innodb buffer pool pages dirty | <b>Innodb_buffer_pool_pages_dirty</b>: The current number of dirty pages in the InnoDB buffer pool
innodb buffer pool bytes dirty | <b>Innodb_buffer_pool_bytes_dirty</b>: The total current number of bytes held in dirty pages in the InnoDB buffer pool
innodb buffer pool pages flushed | <b>Innodb_buffer_pool_pages_flushed</b>: The number of requests to flush pages from the InnoDB buffer pool
innodb buffer pool pages free | <b>Innodb_buffer_pool_pages_free</b>: The number of free pages in the InnoDB buffer pool
innodb buffer pool pages misc | <b>Innodb_buffer_pool_pages_misc</b>: The number of pages in the InnoDB buffer pool that are busy because they have been allocated for administrative overhead, such as row locks or the adaptive hash index
innodb buffer pool pages total | <b>Innodb_buffer_pool_pages_total</b>: The total size of the InnoDB buffer pool, in pages
innodb buffer pool size | <b>innodb_buffer_pool_size</b>: The size in bytes of the buffer pool, the memory area where InnoDB caches table and index data



### Report: MySQL InnoDB

#### Chart: Logs
Metric Name | Metric Description
--- | ---
innodb log waits | <b>Innodb_log_waits</b>: The number of times that the log buffer was too small and a wait was required for it to be flushed before continuing
innodb log write requests | <b>Innodb_log_write_requests</b>: The number of log write requests
innodb log writes | <b>Innodb_log_writes</b>: The number of physical writes to the log file
innodb os log fsyncs | <b>Innodb_os_log_fsyncs</b>: The number of fsync() writes done to the log file
innodb os log pending fsyncs | <b>Innodb_os_log_pending_fsyncs</b>: The number of pending log file fsync() operations
innodb os log pending writes | <b>Innodb_os_log_pending_writes</b>: The number of pending log file writes
innodb os log written | <b>Innodb_os_log_written</b>: The number of bytes written to the log file
innodb log buffer size | <b>innodb_log_buffer_size</b>: The size in bytes of the buffer that InnoDB uses to write to the log files on disk. The default value is 8MB.                             A large log buffer enables large transactions to run without a need to write the log to disk before the                             transactions commit. Thus, if you have transactions that update, insert, or delete many rows, making the log                             buffer larger saves disk I/O
innodb log file size | <b>innodb_log_file_size</b>: The size in bytes of each log file in a log group

#### Chart: Row Locks
Metric Name | Metric Description
--- | ---
innodb row lock current waits | <b>Innodb_row_lock_current_waits</b>: The number of row locks currently being waited for
innodb row lock time | <b>Innodb_row_lock_time</b>: The total time spent in acquiring row locks
innodb row lock time avg | <b>Innodb_row_lock_time_avg</b>: The average time to acquire a row lock
innodb row lock time max | <b>Innodb_row_lock_time_max</b>: The maximum time to acquire a row lock
innodb row lock waits | <b>Innodb_row_lock_waits</b>: The number of times a row lock had to be waited for

#### Chart: Pages
Metric Name | Metric Description
--- | ---
innodb dblwr pages written | <b>Innodb_dblwr_pages_written</b>: The number of pages that have been written for doublewrite operations
innodb dblwr writes | <b>Innodb_dblwr_writes</b>: The number of doublewrite operations that have been performed
innodb page size | <b>Innodb_page_size</b>: The compiled-in InnoDB page size (default 16KB)
innodb pages created | <b>Innodb_pages_created</b>: The number of pages created
innodb pages read | <b>Innodb_pages_read</b>: The number of pages read
innodb pages written | <b>Innodb_pages_written</b>: The number of pages written

#### Chart: Row Ops
Metric Name | Metric Description
--- | ---
innodb rows deleted | <b>Innodb_rows_deleted</b>: The number of rows deleted from InnoDB tables
innodb rows inserted | <b>Innodb_rows_inserted</b>: The number of rows inserted into InnoDB tables
innodb rows read | <b>Innodb_rows_read</b>: The number of rows read from InnoDB tables
innodb rows updated | <b>Innodb_rows_updated</b>: The number of rows updated in InnoDB tables

#### Chart: Data
Metric Name | Metric Description
--- | ---
innodb data fsyncs | <b>Innodb_data_fsyncs</b>: The number of fsync() operations
innodb data pending fsyncs | <b>Innodb_data_pending_fsyncs</b>: The current number of pending fsync() operations
innodb data pending reads | <b>Innodb_data_pending_reads</b>: The current number of pending reads
innodb data pending writes | <b>Innodb_data_pending_writes</b>: The current number of pending writes
innodb data read | <b>Innodb_data_read</b>: The amount of data read
innodb data reads | <b>Innodb_data_reads</b>: The number of data reads
innodb data writes | <b>Innodb_data_writes</b>: The number of data writes
innodb data written | <b>Innodb_data_written</b>: The amount of data written in bytes



### Report: MySQL Queries Stats

#### Chart: Prepared Stmts
Metric Name | Metric Description
--- | ---
prepared stmt count | <b>Prepared_stmt_count</b>: The current number of prepared statements. (The maximum number of statements is given by the max_prepared_stmt_count system variable)
max prepared stmt count | <b>max_prepared_stmt_count</b>: This variable limits the total number of prepared statements in the server. (The sum of the number of prepared statements across all sessions)

#### Chart: Selects Rate
Metric Name | Metric Description
--- | ---
select full join | <b>Select_full_join</b>: The number of joins that perform table scans because they do not use indexes.                             If this value is not 0, you should carefully check the indexes of your tables
select full range join | <b>Select_full_range_join</b>: The number of joins that used a range search on a reference table
select range | <b>Select_range</b>: The number of joins that used ranges on the first table. This is normally not a                            critical issue even if the value is quite large
select range check | <b>Select_range_check</b>: The number of joins without keys that check for key usage after each row. If this is not 0,                             you should carefully check the indexes of your tables
select scan | <b>Select_scan</b>: The number of joins that did a full scan of the first table

#### Chart: Sorts Rate
Metric Name | Metric Description
--- | ---
sort merge passes | <b>Sort_merge_passes</b>: The number of merge passes that the sort algorithm has had to do. If this value is large,                             you should consider increasing the value of the sort_buffer_size system variable
sort range | <b>Sort_range</b>: The number of sorts that were done using ranges
sort rows | <b>Sort_rows</b>: The number of sorted rows
sort scan | <b>Sort_scan</b>: The number of sorts that were done by scanning the table
max length for sort data | <b>max_length_for_sort_data</b>: The cutoff on the size of index values that determines which filesort algorithm to use
max sort length | <b>max_sort_length</b>: The number of bytes to use when sorting data values. Only the first max_sort_length bytes of each value are used; the rest are ignored
sort buffer size | <b>sort_buffer_size</b>: Each session that needs to do a sort allocates a buffer of this size. sort_buffer_size is not specific to any storage engine and applies                            in a general manner for optimization. If you see many Sort_merge_passes per second, you can consider increasing the sort_buffer_size value                             to speed up ORDER BY or GROUP BY operations that cannot be improved with query optimization or improved indexing

#### Chart: Queries/Questions Rate
Metric Name | Metric Description
--- | ---
queries | <b>Queries</b>: The number of statements executed by the server. This variable includes statements executed within stored programs, unlike the Questions variable.                            It does not count COM_PING or COM_STATISTICS commands. This variable was added in MySQL 5.0.76
questions | <b>Questions</b>: The number of statements executed by the server. As of MySQL 5.0.72, this includes only statements sent to the server by clients and no longer                             includes statements executed within stored programs, unlike the Queries variable. This variable does not count COM_PING, COM_STATISTICS,                             COM_STMT_PREPARE, COM_STMT_CLOSE, or COM_STMT_RESET commands
slow queries | <b>Slow_queries</b>: The number of queries that have taken more than long_query_time seconds. This counter increments regardless of whether the slow query log is enabled
long query time | <b>long_query_time</b>: If a query takes longer than this many seconds, the server increments the Slow_queries status variable. If you are using the --log-slow-queries option,                           the query is logged to the slow query log file. This value is measured in real time, not CPU time, so a query that is under the threshold on a lightly                           loaded system might be above the threshold on a heavily loaded one

#### Chart: Insert Delayed
Metric Name | Metric Description
--- | ---
delayed errors | <b>Delayed_errors</b>: The number of rows written with INSERT DELAYED for which some error occurred (probably duplicate key)
delayed insert threads | <b>Delayed_insert_threads</b>: The number of INSERT DELAYED handler threads in use
delayed writes | <b>Delayed_writes</b>: The number of INSERT DELAYED rows written
not flushed delayed rows | <b>Not_flushed_delayed_rows</b>: The number of rows waiting to be written in INSERT DELAYED queues



### Report: MySQL Replication And Binlog

#### Chart: Binlog
Metric Name | Metric Description
--- | ---
binlog cache disk use | <b>Binlog_cache_disk_use</b>: The number of transactions that used the temporary binary log cache but that exceeded the value of                             binlog_cache_size and used a temporary file to store statements from the transaction
binlog cache use | <b>Binlog_cache_use</b>: The number of transactions that used the temporary binary log cache
binlog stmt cache disk use | <b>Binlog_stmt_cache_disk_use</b>: The number of nontransaction statements that used the binary log statement cache but that exceeded the                            value of binlog_stmt_cache_size and used a temporary file to store those statements
binlog stmt cache use | <b>Binlog_stmt_cache_use</b>: The number of nontransactional statements that used the binary log statement cache
binlog cache size | <b>binlog_cache_size</b>: The size of the cache to hold the SQL statements for the binary log during a transaction. A binary log                             cache is allocated for each client if the server supports any transactional storage engines and if the server                            has the binary log enabled (--log-bin option). If you often use large, multiple-statement transactions, you                             can increase this cache size to get better performance
binlog stmt cache size | <b>binlog_stmt_cache_size</b>: Beginning with MySQL 5.5.9, this variable determines the size of the cache for the binary log to hold                             nontransactional statements issued during a transaction. In MySQL 5.5.3 and later, separate binary log                             transaction and statement caches are allocated for each client if the server supports any transactional                             storage engines and if the server has the binary log enabled (--log-bin option). If you often use large                             nontransactional statements during transactions, you can increase this cache size to get more performance

#### Chart: Replication Status
Metric Name | Metric Description
--- | ---
seconds behind master | <b>Seconds_Behind_Master</b>: This field is an indication of how “late” the slave is. In essence, this field measures the time difference                             in seconds between the slave SQL thread and the slave I/O thread. If the network connection between master and                            slave is fast, the slave I/O thread is very close to the master, so this field is a good approximation of how                            late the slave SQL thread is compared to the master. If the network is slow, this is not a good approximation
slave io running | <b>Slave_IO_Running</b>: Whether the I/O thread is started and has connected successfully to the master. Value 1 means YES, value 0 means NO.                            Decimal value between 0 and 1 means that in monitored time period I/O thread was at some points running and at other points not running.
slave sql running | <b>Slave_SQL_Running</b>: Whether the SQL thread is started. Value 1 means YES, value 0 means NO.                            Decimal value between 0 and 1 means that in monitored time period SQL thread was at some points running and at other points not running.

#### Chart: Replication Runtime
Metric Name | Metric Description
--- | ---
slave open temp tables | <b>Slave_open_temp_tables</b>: The number of temporary tables that the slave SQL thread currently has open.                            If the value is greater than zero, it is not safe to shut down the slave
slave retried transactions | <b>Slave_retried_transactions</b>: The total number of times since startup that the replication slave SQL thread has retried transactions

#### Chart: Replication Heartbeat
Metric Name | Metric Description
--- | ---
slave received heartbeats | <b>Slave_received_heartbeats</b>: This counter increments with each replication heartbeat received by a replication slave since the last time that the slave was restarted or reset,                            or a CHANGE MASTER TO statement was issued
slave heartbeat period | <b>Slave_heartbeat_period</b>: Shows the replication heartbeat interval on a replication slave



### Report: MySQL Runtime

#### Chart: Files/Streams
Metric Name | Metric Description
--- | ---
created tmp files | <b>Created_tmp_files</b>: How many temporary files mysqld has created
open files | <b>Open_files</b>: The number of files that are open. This count includes regular files opened by the server
opened files | <b>Opened_files</b>: The number of files that have been opened with my_open()
open streams | <b>Open_streams</b>: The number of streams that are open (used mainly for logging)

#### Chart: Connections
Metric Name | Metric Description
--- | ---
aborted clients | <b>Aborted_clients</b>: The number of connections that were aborted because the client died without closing the connection properly
aborted connects | <b>Aborted_connects</b>: The number of failed attempts to connect to the MySQL server
max used connections | <b>Max_used_connections</b>: The maximum number of connections that have been in use simultaneously since the server started
max connections | <b>max_connections</b>: The maximum permitted number of simultaneous client connections
max user connections | <b>max_user_connections</b>: The maximum number of simultaneous connections permitted to any given MySQL user account
threads connected | <b>Threads_connected</b>: The number of currently open connections

#### Chart: Uptime
Metric Name | Metric Description
--- | ---
uptime | <b>Uptime</b>: The number of seconds that the server has been up
uptime since flush | <b>Uptime_since_flush_status</b>: The number of seconds since the most recent FLUSH STATUS statement

#### Chart: Threads
Metric Name | Metric Description
--- | ---
threads cached | <b>Threads_cached</b>: The number of threads in the thread cache
threads connected | <b>Threads_connected</b>: The number of currently open connections
threads created | <b>Threads_created</b>: The number of threads created to handle connections. If Threads_created is big, you may want to increase the thread_cache_size value
threads running | <b>Threads_running</b>: The number of threads that are not sleeping
thread cache size | <b>thread_cache_size</b>: How many threads the server should cache for reuse
thread stack | <b>thread_stack</b>: The stack size for each thread
slow launch threads | <b>Slow_launch_threads</b>: The number of threads that have taken more than slow_launch_time seconds to create



### Report: MySQL Commands

#### Chart: Create/Drop Commands
Metric Name | Metric Description
--- | ---
create DB | <b>Com_create_db</b>: The number of times CREATE DATABASE command has been executed
create table | <b>Com_create_table</b>: The number of times CREATE TABLE command has been executed
create user | <b>Com_create_user</b>: The number of times CREATE USER command has been executed
drop DB | <b>Com_drop_db</b>: The number of times DROP DATABASE command has been executed
drop table | <b>Com_drop_table</b>: The number of times DROP TABLE command has been executed
drop user | <b>Com_drop_user</b>: The number of times DROP USER command has been executed

#### Chart: Commit/Rollback Commands
Metric Name | Metric Description
--- | ---
commit | <b>Com_commit</b>: The number of times COMMIT command has been executed
rollback | <b>Com_rollback</b>: The number of times ROLLBACK command has been executed
rollback to savepoint | <b>Com_rollback_to_savepoint</b>: The number of times ROLLBACK TO SAVEPOINT command has been executed

#### Chart: Commands
Metric Name | Metric Description
--- | ---
delete | <b>Com_delete</b>: The number of times DELETE command has been executed
delete multi | <b>Com_delete_multi</b>: The number of times DELETE command with multiple-table syntax has been executed
insert | <b>Com_insert</b>: The number of times INSERT command has been executed
insert select | <b>Com_insert_select</b>: The number of times INSERT with SELECT command has been executed
select | <b>Com_select</b>: The number of times SELECT command has been executed
update | <b>Com_update</b>: The number of times UPDATE command has been executed
update multi | <b>Com_update_multi</b>: The number of times UPDATE command with multiple-table syntax has been executed
load | <b>Com_load</b>: The number of times LOAD command has been executed
replace | <b>Com_replace</b>: The number of times REPLACE command has been executed
replace select | <b>Com_replace_select</b>: The number of times REPLACE with SELECT command has been executed



### Report: MySQL Query Cache

#### Chart: Cache Size
Metric Name | Metric Description
--- | ---
free blocks | <b>Qcache_free_blocks</b>: The number of free memory blocks in the query cache
total blocks | <b>Qcache_total_blocks</b>: The total number of blocks in the query cache
free cache memory | <b>Qcache_free_memory</b>: The amount of free memory for the query cache
query cache size | <b>query_cache_size</b>: The amount of memory allocated for caching query results. The default value is 0, which disables the query cache

#### Chart: Cache Usage
Metric Name | Metric Description
--- | ---
queries in cache | <b>Qcache_queries_in_cache</b>: The number of queries registered in the query cache
queries not cached | <b>Qcache_not_cached</b>: The number of noncached queries (not cacheable, or not cached due to the query_cache_type setting)
lowmem prunes | <b>Qcache_lowmem_prunes</b>: The number of queries that were deleted from the query cache because of low memory
hits | <b>Qcache_hits</b>: The number of query cache hits
inserts | <b>Qcache_inserts</b>: The number of queries added to the query cache



### Report: MySQL Traffic

#### Chart: Traffic
Metric Name | Metric Description
--- | ---
bytes sent | <b>Bytes_sent</b>: The number of bytes sent to all clients
bytes received | <b>Bytes_received</b>: The number of bytes received from all clients



### Report: MySQL MyISAM Key

#### Chart: Key Cache Settings
Metric Name | Metric Description
--- | ---
key cache age threshold | <b>key_cache_age_threshold</b>: This value controls the demotion of buffers from the hot sublist of a key cache to the warm sublist.                             Lower values cause demotion to happen more quickly
key cache block size | <b>key_cache_block_size</b>: The size in bytes of blocks in the key cache

#### Chart: Key Blocks
Metric Name | Metric Description
--- | ---
key blocks not flushed | <b>Key_blocks_not_flushed</b>: The number of key blocks in the key cache that have changed but have not yet been flushed to disk
key blocks unused | <b>Key_blocks_unused</b>: The number of unused blocks in the key cache. You can use this value to determine how much of the key cache is in use
key blocks used | <b>Key_blocks_used</b>: The number of used blocks in the key cache. This value is a high-water mark that indicates the maximum number of blocks that have ever been in use at one time

#### Chart: Key Read/Write
Metric Name | Metric Description
--- | ---
key read requests | <b>Key_read_requests</b>: The number of requests to read a key block from the cache
key reads | <b>Key_reads</b>: The number of physical reads of a key block from disk. If Key_reads is large, then your key_buffer_size value is probably too small
key write requests | <b>Key_write_requests</b>: The number of requests to write a key block to the cache
key writes | <b>Key_writes</b>: The number of physical writes of a key block to disk
key buffer size | <b>key_buffer_size</b>: Index blocks for MyISAM tables are buffered and are shared by all threads. key_buffer_size is the size of the buffer used for index blocks.                             The key buffer is also known as the key cache.  The value of this variable indicates the amount of memory requested. Internally, the server                             allocates as much memory as possible up to this amount, but the actual allocation might be less.



### Report: MySQL Handler

#### Chart: Handler Other
Metric Name | Metric Description
--- | ---
handler commit | <b>Handler_commit</b>: The number of internal COMMIT statements
handler delete | <b>Handler_delete</b>: The number of times that rows have been deleted from tables
handler discover | <b>Handler_discover</b>: The MySQL server can ask the NDBCLUSTER storage engine if it knows about a table with a                             given name. This is called discovery. Handler_discover indicates the number of times that                            tables have been discovered using this mechanism
handler prepare | <b>Handler_prepare</b>: A counter for the prepare phase of two-phase commit operations
handler rollback | <b>Handler_rollback</b>: The number of requests for a storage engine to perform a rollback operation
handler savepoint | <b>Handler_savepoint</b>: The number of requests for a storage engine to place a savepoint
handler savepoint rollback | <b>Handler_savepoint_rollback</b>: The number of requests for a storage engine to roll back to a savepoint
handler update | <b>Handler_update</b>: The number of requests to update a row in a table
handler write | <b>Handler_write</b>: The number of requests to insert a row in a table

#### Chart: Handler Read
Metric Name | Metric Description
--- | ---
handler read first | <b>Handler_read_first</b>: The number of times the first entry in an index was read. If this value is high, it                             suggests that the server is doing a lot of full index scans; for example, SELECT col1 FROM foo, assuming that col1 is indexed
handler read key | <b>Handler_read_key</b>: The number of requests to read a row based on a key. If this value is high, it is a                             good indication that your tables are properly indexed for your queries
handler read last | <b>Handler_read_last</b>: The number of requests to read the last key in an index. With ORDER BY, the server will                             issue a first-key request followed by several next-key requests, whereas with With ORDER BY DESC,                             the server will issue a last-key request followed by several previous-key requests. This variable was added in MySQL 5.6.1
handler read next | <b>Handler_read_next</b>: The number of requests to read the next row in key order. This value is incremented if                            you are querying an index column with a range constraint or if you are doing an index scan
handler read prev | <b>Handler_read_prev</b>: The number of requests to read the previous row in key order. This read method is mainly used to optimize ORDER BY ... DESC
handler read rnd | <b>Handler_read_rnd</b>: The number of requests to read a row based on a fixed position. This value is high if you are doing a lot of                             queries that require sorting of the result. You probably have a lot of queries that require MySQL to scan                             entire tables or you have joins that do not use keys properly
handler read rnd next | <b>Handler_read_rnd_next</b>: The number of requests to read the next row in the data file. This value is high if you are doing a lot of                             table scans. Generally this suggests that your tables are not properly indexed or that your queries are not                            written to take advantage of the indexes you have



