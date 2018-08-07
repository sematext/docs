title: ZooKeeper Monitoring Integration

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/ZooKeeper/overview](https://apps.sematext.com/ui/howto/ZooKeeper/overview)

## Metrics

Metric Name<br> Key *(Type)* *(Unit)*                                                     |  Description
------------------------------------------------------------------------------------------|------------------------------------------------------------------------
znodes<br>**zk.data.nodes** <br>*(long gauge)*                                            |  Number of znodes in the data tree
watch count<br>**zk.connections.watch** <br>*(long gauge)*                                |  Number of watches set
ephemeral nodes<br>**zk.data.ephemerals** <br>*(long gauge)*                              |  Number of ephemeral nodes in the data tree
approximate data size<br>**zk.data.size.approximate** <br>*(long gauge)* *(bytes)*        |  Data tree size in bytes.The size includes the znode path and its value
pending revalidation sessions<br>**zk.requests.session.revalidation** <br>*(long gauge)*  |  Count of pending revalidations
avg req latency<br>**zk.request.latency.avg** <br>*(long gauge)* *(ms)*                   |  Avg request latency
max req latency<br>**zk.request.latency.max** <br>*(long gauge)* *(ms)*                   |  Max request latency
min req latency<br>**zk.request.latency.min** <br>*(long gauge)* *(ms)*                   |  Min request latency
alive connections<br>**zk.connections.alive** <br>*(long gauge)*                          |  Total number of alive client connections to this server
max client conns per host<br>**zk.connections.perhost** <br>*(long gauge)*                |  Maximum number of connections allowed from particular host
outstanding requests<br>**zk.requests.outstanding** <br>*(long gauge)*                    |  Outstanding requests in the queue yet to be processed
packets sent<br>**zk.data.packets.sent** <br>*(long gauge)*                               |  Total number of packets sent
packets received<br>**zk.data.packets.received** <br>*(long gauge)*                       |  Total number of packets received
quorum size<br>**zk.quorum** <br>*(long gauge)*                                           |  quorum size