## Integration

- Instructions: https://apps.sematext.com/ui/howto/Redis/overview

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
Connected clients | redis.clients.connected | Avg | Long | 
Keyspace misses | redis.keyspace.hisses | Sum | Long | 
Commands processed | redis.commands.processed | Sum | Long | 
Expired keys | redis.keyspace.expired | Sum | Long | 
Keyspace hits | redis.keyspace.hits | Sum | Long | 
Evicted keys | redis.keyspace.evicted | Sum | Long | 
Total keys count | redis.keyspace.keys | Avg | Long | 
Expiring keys | redis.keyspace.keys.expiring | Avg | Long | 
Used memory peak | redis.memory.used.max | Avg | Long | 
Used memory rss | redis.memory.used.rss | Avg | Long | 
Used memory | redis.memory.used | Avg | Long | 
Connected slaves | redis.replication.slaves.connected | Avg | Long | 
Master last IO seconds ago | redis.replication.master.last.io.seconds.ago | Avg | Long | 
