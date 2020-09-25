title: Jenkins Monitoring Integration
description: Comprehensive view of your Jenkins health and performance with Sematext Jenkins monitoring integration. Sematext integration used to capture and report Jenkins metrics, including health and executors state; builds, nodes, jobs, runs activity; http requests and responses and more. There are also general JVM metrics included: gc, memory and others. 

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Jenkins/overview](https://apps.sematext.com/ui/howto/Jenkins/overview)

## Metrics

Metric Key *(Type)* *(Unit)*                                                                             |  Description
------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**jenkins.runs.success** <br>*(long counter)*      |  The count of job runs which performed succeed
**jenkins.runs.unstable** <br>*(long counter)*      |  The count of job runs which were unstable
**jenkins.runs.failure** <br>*(long counter)*      |  The count of job runs which failed
**jenkins.runs.not_built** <br>*(long counter)*      |  The count of not built job runs
**jenkins.runs.aborted** <br>*(long counter)*      |  The count of aborted job runs
**jenkins.jobs** <br>*(long counter)*      |  The total count of jobs
**jenkins.jobs.scheduled** <br>*(long counter)*      |  The count at which jobs are scheduled. If a job is already in the queue and an identical request for scheduling the job is received then Jenkins will coalesce the two requests. This metric gives a reasonably pure measure of the load requirements of the Jenkins master as it is unaffected by the number of executors available to the system
**jenkins.jobs.queuing** <br>*(long counter)*      |  The count of queued jobs
**jenkins.jobs.blocked** <br>*(long counter)*      |  The count at which jobs in the build queue enter the blocked state
**jenkins.jobs.buildable** <br>*(long counter)*      |  The count at which jobs in the build queue enter the buildable state
**jenkins.jobs.execution.time** <br>*(long counter)*      |  The amount of time jobs spend in execution state
**jenkins.jobs.queuing.time** <br>*(long counter)*      |  The total time jobs spend in the build queue
**jenkins.jobs.blocked.time** <br>*(long counter)*      |  The amount of time jobs in the build queue enter spend in blocked state
**jenkins.jobs.buildable.time** <br>*(long counter)*      |  The amount of time jobs in the build queue enter spend in buildable state
**jenkins.jobs.waiting.time** <br>*(long counter)*      |  The total amount of time that jobs spend in their quiet period
**jenkins.jobs.total.time** <br>*(long counter)*      |  The time jobs spend from entering the build queue to completing building
