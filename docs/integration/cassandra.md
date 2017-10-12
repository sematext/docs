## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
hinted handoff pending | casandra.cluster.tasks.handoff.pending | Avg | Long | 
migrations pending | casandra.cluster.tasks.migration.pending | Avg | Long | 
misc tasks pending | casandra.cluster.tasks.misc.pending | Avg | Long | 
manual repair tasks pending | casandra.cluster.tasks.repair.pending | Avg | Long | 
gossip tasks pending | casandra.cluster.tasks.gossip.pending | Avg | Long | 
internal responses pending | casandra.cluster.tasks.response.internal.pending | Avg | Long | 
request responses pending | casandra.cluster.tasks.response.pending | Avg | Long | 
compactions count | casandra.compaction.completed | Sum | Long | 
bytes compacted | casandra.compaction.bytes | Sum | Long | 
read repair tasks pending | casandra.read.repair.pending | Avg | Long | 
read requests pending | casandra.read.requests.pending | Avg | Long | 
compactions pending | casandra.compaction.pending | Avg | Long | 
writes count | casandra.local.write.requests | Sum | Long | 
false positives | casandra.bloom.falsepositives | Sum | Long | 
space used | casandra.bloom.disk.space | Avg | Long | 
false positive ratio | casandra.bloom.falsepositives.ratio | Avg | Double | 
'joining nodes' | casandra.cluster.nodes.joining | Max | Long | 
'moving nodes' | casandra.cluster.nodes.moving | Max | Long | 
'live nodes' | casandra.cluster.nodes.live | Max | Long | 
'leaving nodes' | casandra.cluster.nodes.leaving | Max | Long | 
'unreachable nodes' | casandra.cluster.nodes.unreachable | Avg | Double | 
tables count | casandra.sstable.count | Avg | Long | 
tables size | casandra.sstable.size | Avg | Long | 
reads count | casandra.local.read.requests | Sum | Long | 
reads count | casandra.number.of.sstables.per.read | Avg | Long | 
requests | casandra.cache.row.requests | Sum | Long | 
hits | casandra.cache.key.hits | Sum | Long | 
requests | casandra.cache.key.requests | Sum | Long | 
hits | casandra.cache.row.hits | Sum | Long | 
post flushes pending | casandra.write.postflushes.pending | Avg | Long | 
repl. on write pending | casandra.write.replications.pending | Avg | Long | 
flushes pending | casandra.write.flushes.pending | Avg | Long | 
write requests pending | casandra.write.pending | Avg | Long | 
requests count | casandra.read.requests | Sum | Long | 
requests count | casandra.write.requests | Sum | Long | 
