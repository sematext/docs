title: MongoDB Monitoring Integration
description: Monitor all key MongoDB metrics and stats, namely server state, global lock ratio, current vs. available connections, opcounters, and more. View and analyze performance reports with our infractructure monitoring and logging management platform, and let your whole devops team monitor MongoDB database deployments with multi-user RBAC and application sharing support

<div class="video_container">
<iframe class="video" src="https://www.youtube.com/embed/BIERrXzbiNM" frameborder="0" allowfullscreen ></iframe>
</div>

Sematext offers a simple, easy to install, MongoDB monitoring agent with minimal CPU and memory overhead.

## Install MongoDB Monitoring Agent

Setting up the monitoring agent takes less than 5 minutes:

1.  Create a MongoDB App in the  [Integrations / Overview](https://apps.sematext.com/ui/monitoring-create) (or  [Sematext Cloud Europe](https://apps.eu.sematext.com/ui/monitoring-create)). This will let you install the agent and control access to your monitoring and logs data. The short  [What is an App in Sematext Cloud](https://www.youtube.com/watch?v=tr_qxdr8dvk&index=14&list=plt_fd32ofypflbfzz_hiafnqjdltth1ns) video has more details.
2.  Name your MongoDB monitoring App and, if you want to collect MongoDB logs as well, create a Logs App along the way.
3.  Install the Sematext Agent according to the  [setup instructions](https://apps.sematext.com/ui/howto/MongoDB/overview) displayed in the UI.

## MongoDB Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
flushes time | mongo.flushes.time | Sum | Long | Time spend in flushes during the collection interval
flushes count | mongo.flushes | Sum | Long | Flushes in collection interval
created | mongo.network.connections.total | Sum | Long | Created provides a count of all incoming connections created to the server. This number includes connections that have since closed.
current | mongo.network.connections | Avg | Double | The value of current corresponds to the number of connections to the database server from clients.
num requests | mongo.network.requests | Sum | Long | Number of network requests
received | mongo.network.transfer.rx.rate | Sum | Long | The value of 'received' reflects the amount of network traffic, in bytes, received by this database.
transmitted | mongo.network.transfer.tx.rate | Sum | Long | The value of 'transmitted' reflects the amount of network traffic, in bytes, sent by this database.
acquire count | mongo.locks | Sum | Long | Lock count
acquire count waits | mongo.locks.wait | Sum | Long | Number of times the acquireCount lock acquisitions encountered waits because the locks were held in a conflicting mode.
wait time | mongo.locks.acquiring.time.microsec | Sum | Long | Cumulative wait time for the lock acquisitions.
deadlock count | mongo.locks.deadlock | Sum | Long | Number of times the lock acquisitions encountered deadlocks.
early commits | mongo.journal.commits.early | Sum | Long | Number of times MongoDB requested a commit before the scheduled journal group commit interval. Use this value to ensure that your journal group commit intervalis not too long for your deployment.
commits write-lock time | mongo.journal.commits.locked.time | Sum | Long | Amount of time spent for commits that occurred while a write lock was held. Commits in a write lock indicate a MongoDB node under a heavy write load and call for further diagnosis.
written files data | mongo.journal.data.written | Sum | Long | Amount of data written from journal to the data files during the last journal group commit interval.
written journal data | mongo.journal.data | Sum | Long | Amount of data written to journal during the last journal group commit interval.
commits time | mongo.journal.commits.time | Sum | Long | Amount of time spent for commits.
commits | mongo.journal.commits | Sum | Long | Number of transactions written to the journal during the last journal group commit interval.
collections count | mongo.database.collections | Avg | Long | Count of collections/tables
data size | mongo.database.data.size | Avg | Long | The total size in bytes of the data held in this database including the padding factor.
index size | mongo.database.index.size | Avg | Long | The total size in bytes of all indexes created on this database.
namespace size | mongo.database.namespace.size | Avg | Long | The total size of the namespace files (i.e. that end with .ns) for this database.
storage size | mongo.database.storage.size | Avg | Long | The total amount of space in bytes allocated to collections in this database for document storage.
objects count | mongo.database.objects | Avg | Long | Count of objects in db
file size | mongo.database.file.size | Avg | Long | The total size in bytes of the data files that hold the database. This value includes preallocated space and the padding factor.
mapped mem | mongo.memory.mapped | Avg | Long | The value of mapped provides the amount of mapped memory, in megabytes (MB), by the database. Because MongoDB uses memory-mapped files, this value is likely to be to be roughly equivalent to the total size of your database or databases.
resident mem | mongo.memory.resident | Avg | Long | The value of resident is roughly equivalent to the amount of RAM, in megabytes (MB), currently used by the database process. In normal use this value tends to grow.
virtual mem | mongo.memory.virtual | Avg | Long | Virtual displays the quantity, in megabytes (MB), of virtual memory used by the mongod process. With journaling enabled, the value of virtual is at least twice the value of mapped. If virtual value is significantly larger than mapped (e.g. 3 or more times), this may indicate a memory leak.
mapped mem with journal | mongo.memory.mapped.withjournal | Avg | Long | mappedWithJournal provides the amount of mapped memory, in megabytes (MB), including the memory used for journaling. This value will always be twice the value of mapped. This field is only included if journaling is enabled.
inserted | mongo.documents.inserted | Sum | Long | Number of inserted documents.
returned | mongo.documents.returned | Sum | Long | Total number of documents returned by queries.
updated | mongo.documents.updated | Sum | Long | Number of updated documents.
deleted | mongo.documents.deleted | Sum | Long | Number of deleted documents.
query | mongo.ops.query | Sum | Long | Query operations
commands | mongo.ops.command | Sum | Long | Commands
query | mongo.replica.ops.query | Sum | Long | Query operations
insert | mongo.ops.insert | Sum | Long | Insert operations
insert | mongo.replica.ops.insert | Sum | Long | Insert operations
update | mongo.replica.ops.update | Sum | Long | Update operations
failed | mongo.commands.failed | Sum | Long | Failed commands / operations (all DB commands/functions)
delete | mongo.replica.ops.delete | Sum | Long | Delete operations
commands | mongo.replica.ops.command | Sum | Long | Commands
update | mongo.ops.update | Sum | Long | Update operations
delete | mongo.ops.delete | Sum | Long | Delete operations
getmore | mongo.ops.getmore | Sum | Long | Getmore operations
getmore | mongo.replica.ops.getmore | Sum | Long | Getmore operations
mongo.active_reads | mongo.active_reads | Avg | long |
mongo.active_writes | mongo.active_writes | Avg | long |
mongo.aggregate_command_failed | mongo.aggregate_command_failed | Avg | long |
mongo.aggregate_command_total | mongo.aggregate_command_total | Avg | long |
mongo.assert_msg | mongo.assert_msg | Avg | long |
mongo.assert_regular | mongo.assert_regular | Avg | long |
mongo.assert_rollovers | mongo.assert_rollovers | Avg | long |
mongo.assert_user | mongo.assert_user | Avg | long |
mongo.assert_warning | mongo.assert_warning | Avg | long |
mongo.available_reads | mongo.available_reads | Avg | long |
mongo.available_writes | mongo.available_writes | Avg | long |
mongo.commands.failed | mongo.commands.failed | Avg | long |
mongo.commands.total | mongo.commands.total | Avg | long |
mongo.commands_per_sec | mongo.commands_per_sec | Avg | long |
mongo.connections_available | mongo.connections_available | Avg | long |
mongo.cursor_no_timeout | mongo.cursor_no_timeout | Avg | long |
mongo.cursor_no_timeout_count | mongo.cursor_no_timeout_count | Avg | long |
mongo.cursor_pinned | mongo.cursor_pinned | Avg | long |
mongo.cursor_pinned_count | mongo.cursor_pinned_count | Avg | long |
mongo.cursor_timed_out | mongo.cursor_timed_out | Avg | long |
mongo.cursor_timed_out_count | mongo.cursor_timed_out_count | Avg | long |
mongo.cursor_total | mongo.cursor_total | Avg | long |
mongo.cursor_total_count | mongo.cursor_total_count | Avg | long |
mongo.delete_command_failed | mongo.delete_command_failed | Avg | long |
mongo.delete_command_total | mongo.delete_command_total | Avg | long |
mongo.deletes | mongo.deletes | Avg | long |
mongo.deletes_per_sec | mongo.deletes_per_sec | Avg | long |
mongo.distinct_command_failed | mongo.distinct_command_failed | Avg | long |
mongo.distinct_command_total | mongo.distinct_command_total | Avg | long |
mongo.find_and_modify_command_failed | mongo.find_and_modify_command_failed | Avg | long |
mongo.find_and_modify_command_total | mongo.find_and_modify_command_total | Avg | long |
mongo.find_command_failed | mongo.find_command_failed | Avg | long |
mongo.find_command_total | mongo.find_command_total | Avg | long |
mongo.flushes_per_sec | mongo.flushes_per_sec | Avg | long |
mongo.get_more_command_failed | mongo.get_more_command_failed | Avg | long |
mongo.get_more_command_total | mongo.get_more_command_total | Avg | long |
mongo.getmores_per_sec | mongo.getmores_per_sec | Avg | long |
mongo.insert_command_failed | mongo.insert_command_failed | Avg | long |
mongo.insert_command_total | mongo.insert_command_total | Avg | long |
mongo.inserts_per_sec | mongo.inserts_per_sec | Avg | long |
mongo.jumbo_chunks | mongo.jumbo_chunks | Avg | long |
mongo.latency_commands | mongo.latency_commands | Avg | long |
mongo.latency_commands_count | mongo.latency_commands_count | Avg | long |
mongo.latency_reads | mongo.latency_reads | Avg | long |
mongo.latency_reads_count | mongo.latency_reads_count | Avg | long |
mongo.latency_writes | mongo.latency_writes | Avg | long |
mongo.latency_writes_count | mongo.latency_writes_count | Avg | long |
mongo.net_in_bytes_count | mongo.net_in_bytes_count | Avg | long |
mongo.net_out_bytes_count | mongo.net_out_bytes_count | Avg | long |
mongo.open_connections | mongo.open_connections | Avg | long |
mongo.operation_scan_and_order | mongo.operation_scan_and_order | Avg | long |
mongo.operation_write_conflicts | mongo.operation_write_conflicts | Avg | long |
mongo.page_faults | mongo.page_faults | Avg | long |
mongo.percent_cache_dirty | mongo.percent_cache_dirty | Avg | double |
mongo.percent_cache_used | mongo.percent_cache_used | Avg | double |
mongo.queries_per_sec | mongo.queries_per_sec | Avg | long |
mongo.queued_reads | mongo.queued_reads | Avg | long |
mongo.queued_writes | mongo.queued_writes | Avg | long |
mongo.repl_apply_batches_num | mongo.repl_apply_batches_num | Avg | long |
mongo.repl_apply_batches_total_millis | mongo.repl_apply_batches_total_millis | Avg | long |
mongo.repl_apply_ops | mongo.repl_apply_ops | Avg | long |
mongo.repl_buffer_count | mongo.repl_buffer_count | Avg | long |
mongo.repl_buffer_size_bytes | mongo.repl_buffer_size_bytes | Avg | long |
mongo.repl_commands_per_sec | mongo.repl_commands_per_sec | Avg | long |
mongo.repl_deletes_per_sec | mongo.repl_deletes_per_sec | Avg | long |
mongo.repl_executor_pool_in_progress_count | mongo.repl_executor_pool_in_progress_count | Avg | long |
mongo.repl_executor_queues_network_in_progress | mongo.repl_executor_queues_network_in_progress | Avg | long |
mongo.repl_executor_queues_sleepers | mongo.repl_executor_queues_sleepers | Avg | long |
mongo.repl_executor_unsignaled_events | mongo.repl_executor_unsignaled_events | Avg | long |
mongo.repl_getmores_per_sec | mongo.repl_getmores_per_sec | Avg | long |
mongo.repl_inserts_per_sec | mongo.repl_inserts_per_sec | Avg | long |
mongo.repl_lag | mongo.repl_lag | Avg | long |
mongo.repl_network_bytes | mongo.repl_network_bytes | Avg | long |
mongo.repl_network_getmores_num | mongo.repl_network_getmores_num | Avg | long |
mongo.repl_network_getmores_total_millis | mongo.repl_network_getmores_total_millis | Avg | long |
mongo.repl_network_ops | mongo.repl_network_ops | Avg | long |
mongo.repl_oplog_window_sec | mongo.repl_oplog_window_sec | Avg | long |
mongo.repl_queries_per_sec | mongo.repl_queries_per_sec | Avg | long |
mongo.repl_state | mongo.repl_state | Avg | long |
mongo.repl_updates_per_sec | mongo.repl_updates_per_sec | Avg | long |
mongo.storage_freelist_search_bucket_exhausted | mongo.storage_freelist_search_bucket_exhausted | Avg | long |
mongo.storage_freelist_search_requests | mongo.storage_freelist_search_requests | Avg | long |
mongo.storage_freelist_search_scanned | mongo.storage_freelist_search_scanned | Avg | long |
mongo.tcmalloc_central_cache_free_bytes | mongo.tcmalloc_central_cache_free_bytes | Avg | long |
mongo.tcmalloc_current_allocated_bytes | mongo.tcmalloc_current_allocated_bytes | Avg | long |
mongo.tcmalloc_current_total_thread_cache_bytes | mongo.tcmalloc_current_total_thread_cache_bytes | Avg | long |
mongo.tcmalloc_heap_size | mongo.tcmalloc_heap_size | Avg | long |
mongo.tcmalloc_max_total_thread_cache_bytes | mongo.tcmalloc_max_total_thread_cache_bytes | Avg | long |
mongo.tcmalloc_pageheap_commit_count | mongo.tcmalloc_pageheap_commit_count | Avg | long |
mongo.tcmalloc_pageheap_committed_bytes | mongo.tcmalloc_pageheap_committed_bytes | Avg | long |
mongo.tcmalloc_pageheap_decommit_count | mongo.tcmalloc_pageheap_decommit_count | Avg | long |
mongo.tcmalloc_pageheap_free_bytes | mongo.tcmalloc_pageheap_free_bytes | Avg | long |
mongo.tcmalloc_pageheap_reserve_count | mongo.tcmalloc_pageheap_reserve_count | Avg | long |
mongo.tcmalloc_pageheap_scavenge_count | mongo.tcmalloc_pageheap_scavenge_count | Avg | long |
mongo.tcmalloc_pageheap_total_commit_bytes | mongo.tcmalloc_pageheap_total_commit_bytes | Avg | long |
mongo.tcmalloc_pageheap_total_decommit_bytes | mongo.tcmalloc_pageheap_total_decommit_bytes | Avg | long |
mongo.tcmalloc_pageheap_total_reserve_bytes | mongo.tcmalloc_pageheap_total_reserve_bytes | Avg | long |
mongo.tcmalloc_pageheap_unmapped_bytes | mongo.tcmalloc_pageheap_unmapped_bytes | Avg | long |
mongo.tcmalloc_spinlock_total_delay_ns | mongo.tcmalloc_spinlock_total_delay_ns | Avg | long |
mongo.tcmalloc_thread_cache_free_bytes | mongo.tcmalloc_thread_cache_free_bytes | Avg | long |
mongo.tcmalloc_total_free_bytes | mongo.tcmalloc_total_free_bytes | Avg | long |
mongo.tcmalloc_transfer_cache_free_bytes | mongo.tcmalloc_transfer_cache_free_bytes | Avg | long |
mongo.total_available | mongo.total_available | Avg | long |
mongo.total_created | mongo.total_created | Avg | long |
mongo.total_docs_scanned | mongo.total_docs_scanned | Avg | long |
mongo.total_in_use | mongo.total_in_use | Avg | long |
mongo.total_keys_scanned | mongo.total_keys_scanned | Avg | long |
mongo.total_refreshing | mongo.total_refreshing | Avg | long |
mongo.total_tickets_reads | mongo.total_tickets_reads | Avg | long |
mongo.total_tickets_writes | mongo.total_tickets_writes | Avg | long |
mongo.ttl_deletes | mongo.ttl_deletes | Avg | long |
mongo.ttl_deletes_per_sec | mongo.ttl_deletes_per_sec | Avg | long |
mongo.ttl_passes | mongo.ttl_passes | Avg | long |
mongo.ttl_passes_per_sec | mongo.ttl_passes_per_sec | Avg | long |
mongo.update_command_failed | mongo.update_command_failed | Avg | long |
mongo.update_command_total | mongo.update_command_total | Avg | long |
mongo.updates_per_sec | mongo.updates_per_sec | Avg | long |
mongo.uptime_ns | mongo.uptime_ns | Avg | long |
mongo.wtcache_app_threads_page_read_count | mongo.wtcache_app_threads_page_read_count | Avg | long |
mongo.wtcache_app_threads_page_read_time | mongo.wtcache_app_threads_page_read_time | Avg | long |
mongo.wtcache_app_threads_page_write_count | mongo.wtcache_app_threads_page_write_count | Avg | long |
mongo.wtcache_bytes_read_into | mongo.wtcache_bytes_read_into | Avg | long |
mongo.wtcache_bytes_written_from | mongo.wtcache_bytes_written_from | Avg | long |
mongo.wtcache_current_bytes | mongo.wtcache_current_bytes | Avg | long |
mongo.wtcache_internal_pages_evicted | mongo.wtcache_internal_pages_evicted | Avg | long |
mongo.wtcache_max_bytes_configured | mongo.wtcache_max_bytes_configured | Avg | long |
mongo.wtcache_modified_pages_evicted | mongo.wtcache_modified_pages_evicted | Avg | long |
mongo.wtcache_pages_evicted_by_app_thread | mongo.wtcache_pages_evicted_by_app_thread | Avg | long |
mongo.wtcache_pages_queued_for_eviction | mongo.wtcache_pages_queued_for_eviction | Avg | long |
mongo.wtcache_pages_read_into | mongo.wtcache_pages_read_into | Avg | long |
mongo.wtcache_pages_requested_from | mongo.wtcache_pages_requested_from | Avg | long |
mongo.wtcache_pages_written_from | mongo.wtcache_pages_written_from | Avg | long |
mongo.wtcache_server_evicting_pages | mongo.wtcache_server_evicting_pages | Avg | long |
mongo.wtcache_tracked_dirty_bytes | mongo.wtcache_tracked_dirty_bytes | Avg | long |
mongo.wtcache_unmodified_pages_evicted | mongo.wtcache_unmodified_pages_evicted | Avg | long |
mongo.wtcache_worker_thread_evictingpages | mongo.wtcache_worker_thread_evictingpages | Avg | long |
mongo.mongodb_col_stats.avg_obj_size | mongo.mongodb_col_stats.avg_obj_size | Avg | double |
mongo.mongodb_col_stats.count | mongo.mongodb_col_stats.count | Avg | long |
mongo.mongodb_col_stats.ok | mongo.mongodb_col_stats.ok | Avg | long |
mongo.mongodb_col_stats.size | mongo.mongodb_col_stats.size | Avg | long |
mongo.mongodb_col_stats.storage_size | mongo.mongodb_col_stats.storage_size | Avg | long |
mongo.mongodb_col_stats.total_index_size | mongo.mongodb_col_stats.total_index_size | Avg | long |
mongo.mongodb_col_stats.avg_obj_size | mongo.mongodb_col_stats.avg_obj_size | Avg | double |
mongo.mongodb_col_stats.count | mongo.mongodb_col_stats.count | Avg | long |
mongo.mongodb_col_stats.ok | mongo.mongodb_col_stats.ok | Avg | long |
mongo.mongodb_col_stats.size | mongo.mongodb_col_stats.size | Avg | long |
mongo.mongodb_col_stats.storage_size | mongo.mongodb_col_stats.storage_size | Avg | long |
mongo.mongodb_col_stats.total_index_size | mongo.mongodb_col_stats.total_index_size | Avg | long |
mongo.mongodb_shard_stats.in_use | mongo.mongodb_shard_stats.in_use | Avg | long |
mongo.mongodb_shard_stats.available | mongo.mongodb_shard_stats.available | Avg | long |
mongo.mongodb_shard_stats.available | mongo.mongodb_shard_stats.available | Avg | long |
mongo.mongodb_shard_stats.refreshing | mongo.mongodb_shard_stats.refreshing | Avg | long |

## Troubleshooting

If you are having issues with Sematext Monitoring, i.e. not seeing MongoDB metrics, see
[How do I create the diagnostics package](/monitoring/spm-faq/#how-do-i-create-the-diagnostics-package).

For more troubleshooting information please look at [Troubleshooting](/monitoring/spm-faq/#troubleshooting) section.
