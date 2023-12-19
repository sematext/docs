title: Sampling Processor
description: Keep only a certain percentage of your data using random sampling

You can do events sampling with Pipeline as well. 

Without filters sampling is applied to all events, but by using filters you can sample only a subset of events.
 
One example might be to filter by events from one specific service. The sample rate is expressed as a percentage of events that should be stored. By default, the sampling rate is 100%, meaning no events will be dropped. Setting sampling to 10% means that only 10 in 100 events will be stored and 90 will be dropped.

Below is an example where we leave only 30% of log events with severity `Information`, while events with all other severities will be processed without any sampling.

![Processor_Sampling](../images/logs/pipelines/processor-sampling.png)
