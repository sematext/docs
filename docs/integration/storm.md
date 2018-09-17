title: Storm Monitoring Integration
description:  Get metrics from Storm service in real time and visualize and monitor Storm cluster and topology metrics using Sematext Infrastructure and Monitoring SaaS. Be notified about Apache Storm failovers and data processing events using our alerting solution for real-time analytics and continuous monitoring of devops operations

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Storm/overview](https://apps.sematext.com/ui/howto/Storm/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
supervisors | storm.supervisors | Avg | Long | The number of Nodes in the cluster currently.
topologies | storm.topologies | Avg | Long | The number of Topologies in the cluster currently.
slots | storm.slots | Avg | Long | Total slots are Workers (processes).
used slots | storm.slots.used | Avg | Long | Busy slots are Workers (processes).
acked | storm.bolts.tuples.acked | Sum | Long | The number of Tuples acknowledged by this Bolt.
failed | storm.bolts.tuples.failed | Sum | Long | The number of Tuples failed by this Bolt.
executed | storm.bolts.tuples.executed | Sum | Long | The number of incoming Tuples processed.
executors | storm.executors | Avg | Long | Executors are threads in a Worker process.
state spouts | storm.spouts.state | Avg | Long | The number of State Spouts.
bolts | storm.bolts | Avg | Long | The number of Bolts.
workers | storm.workers | Avg | Long | The number of Workers (processes).
spouts | storm.spouts | Avg | Long | The number of Spouts.
tasks | storm.tasks | Avg | Long | A Task is an instance of a Bolt or Spout.            The number of Tasks is almost always equal to the number of Executors.
emitted | storm.bolts.tuples.emitted | Sum | Long | The number of Tuples emitted.
transferred | storm.bolts.tuples.transferred | Sum | Long | The number of Tuples emitted that sent to one or more Bolts.
acked | storm.sputs.tuples.acked | Sum | Long | The number of Tuple 'trees' successfully processed.            A value of 0 is expected if no acking is done.
failed | storm.sputs.tuples.failed | Sum | Long | The number of Tuple 'trees' that were explicitly           failed or timed out before acking was completed.           A value of 0 is expected if no acking is done.
emitted | storm.sputs.tuples.emitted | Sum | Long | The number of Tuples emitted.
transferred | storm.sputs.tuples.transferred | Sum | Long | The number of Tuples emitted that sent to one or more Bolts.
