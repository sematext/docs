## Kafka Monitoring

### Why am I not seeing all Kafka metrics if I'm running a 0.8.x version of Kafka that is pre-0.8.2

A: Kafka had great metrics in 0.7x versions and then in pre-0.8.2 the
metrics had a lot of issues.  In short, the MBeans Kafka exposed via JMX
were named in a way that made them very difficult/impossible to parse
systematically.  We worked with the Kafka developers to fix that in
Kafka 0.8.2 (see <https://issues.apache.org/jira/browse/KAFKA-1481>).
 To make your Kafka Producers, Consumers, and Brokers properly
monitorable, upgrade to 0.8.2.

### How can I see metrics for Kafka Producers and Brokers and Consumers

A: To see metrics for Kafka Producers, Brokers, and Consumers make sure
to run SPM client on all of them.  Each of them has its own metrics.
 Kafka Brokers do not expose Producers' or Consumers' metrics, so
ensure you have SPM client on all three Kafka tiers.

### Can I see metrics for non-Scala/JVM Kafka Producers and Consumers

A: No, because none of them seem to expose metrics the way Kafka's own
Producer and Consumer implementations expose
metrics.