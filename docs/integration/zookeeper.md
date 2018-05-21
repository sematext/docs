## Integration

- Instructions: [https://apps.sematext.com/ui/howto/ZooKeeper/overview](https://apps.sematext.com/ui/howto/ZooKeeper/overview)

## Metrics

Metric Name                    |  Key                               |  Metric Type  |  Numeric Type  |  Unit   |  Description
-------------------------------|------------------------------------|---------------|----------------|---------|------------------------------------------------------------------------
alive connections              |  zk.connections.alive              |  gauge        |  long          |         |  Total number of alive client connections to this server
max client conns per host      |  zk.connections.perhost            |  gauge        |  long          |         |  Maximum number of connections allowed from particular host
watch count                    |  zk.connections.watch              |  gauge        |  long          |         |  Number of watches set
ephemeral nodes                |  zk.data.ephemerals                |  gauge        |  long          |         |  Number of ephemeral nodes in the data tree
znodes                         |  zk.data.nodes                     |  gauge        |  long          |         |  Number of znodes in the data tree
packets received               |  zk.data.packets.received          |  gauge        |  long          |         |  Total number of packets received
packets sent                   |  zk.data.packets.sent              |  gauge        |  long          |         |  Total number of packets sent
approximate data size          |  zk.data.size.approximate          |  gauge        |  long          |  bytes  |  Data tree size in bytes.The size includes the znode path and its value
quorum size                    |  zk.quorum                         |  gauge        |  long          |         |  quorum size
avg req latency                |  zk.request.latency.avg            |  gauge        |  long          |  ms     |  Avg request latency
max req latency                |  zk.request.latency.max            |  gauge        |  long          |  ms     |  Max request latency
min req latency                |  zk.request.latency.min            |  gauge        |  long          |  ms     |  Min request latency
outstanding requests           |  zk.requests.outstanding           |  gauge        |  long          |         |  Outstanding requests in the queue yet to be processed
pending revalidation sessions  |  zk.requests.session.revalidation  |  gauge        |  long          |         |  Count of pending revalidations
