## Metrics

### Report: Cluster

#### Chart: Supervisor/Topology
Metric Name | Metric Description
--- | ---
supervisors | The number of Nodes in the cluster currently.
topologies | The number of Topologies in the cluster currently.



### Report: Supervisor

#### Chart: Slots
Metric Name | Metric Description
--- | ---
slots | Total slots are Workers (processes).
used slots | Busy slots are Workers (processes).
free slots | Free slots are Workers (processes).



### Report: Bolt Input

#### Chart: Timing
Metric Name | Metric Description
--- | ---
executed latency | The average time a Tuple spends in the execute method.                     The execute method may complete without sending an Ack for the Tuple.
processed latency | The average time it takes to Ack a Tuple after it is first received.                       Bolts that join, aggregate or batch may not Ack                      a Tuple until a number of other Tuples have been received.

#### Chart: Acked/Executed/Failed
Metric Name | Metric Description
--- | ---
acked | The number of Tuples acknowledged by this Bolt.
executed | The number of incoming Tuples processed.
failed | The number of Tuples failed by this Bolt.



### Report: Topology

#### Chart: Spouts/Bolts/State Spouts
Metric Name | Metric Description
--- | ---
bolts | The number of Bolts.
spouts | The number of Spouts.
state spouts | The number of State Spouts.

#### Chart: Workers/Executors/Tasks
Metric Name | Metric Description
--- | ---
workers | The number of Workers (processes).
executors | Executors are threads in a Worker process.
tasks | A Task is an instance of a Bolt or Spout.            The number of Tasks is almost always equal to the number of Executors.



### Report: Bolt Output

#### Chart: Emitted/Transferred
Metric Name | Metric Description
--- | ---
emitted | The number of Tuples emitted.
transferred | The number of Tuples emitted that sent to one or more Bolts.



### Report: Spout

#### Chart: Timing
Metric Name | Metric Description
--- | ---
complete latency | The average time a Tuple 'tree'           takes to be completely processed by the Topology. A value of 0 is expected           if no acking is done.

#### Chart: Emitted/Transferred
Metric Name | Metric Description
--- | ---
emitted | The number of Tuples emitted.
transferred | The number of Tuples emitted that sent to one or more Bolts.

#### Chart: Acked/Failed
Metric Name | Metric Description
--- | ---
acked | The number of Tuple 'trees' successfully processed.            A value of 0 is expected if no acking is done.
failed | The number of Tuple 'trees' that were explicitly           failed or timed out before acking was completed.           A value of 0 is expected if no acking is done.



