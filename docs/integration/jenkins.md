title: Jenkins Monitoring Integration
description: Comprehensive view of your Jenkins health and performance with Sematext Jenkins monitoring integration. Sematext integration used to capture and report Jenkins metrics, including health and executors state; builds, nodes, jobs, runs activity; http requests and responses and more. There are also general JVM metrics included: gc, memory and others. 

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/Jenkins/overview](https://apps.sematext.com/ui/howto/Jenkins/overview)

## Metrics

Metric Key *(Type)* *(Unit)*                                                                             |  Description
------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**jenkins.health.checks** <br>*(long counter)*      |  The number of health checks associated with the HealthCheckRegistry defined within the Metrics Plugin
**jenkins.health.checks.time** <br>*(long counter)*      |  The duration of all health check runs
**jenkins.health.check.score** <br>*(long gauge)*      |  The ratio of health checks reporting success to the total number of health checks. Larger values indicate increasing health as measured by the health checks. (This is a value between 0 and 1 inclusive)
**jenkins.http.requests.active** <br>*(long gauge)*      |  The number of currently active requests against the Jenkins master Web UI   
**jenkins.http.requests** <br>*(long gauge)*      |  The time Jenkins master spends to process Web UI requests and generating the corresponding responses   
**jenkins.http.requests.time** <br>*(long gauge)* *(ms)*    |  The count of Jenkins master Web UI requests   
**jenkins.http.response.code.bad_request** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/400 status code  
**jenkins.http.response.code.created** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/201 status code  
**jenkins.http.response.code.forbidden** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/403 status code  
**jenkins.http.response.code.no_content** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/204 status code  
**jenkins.http.response.code.not_found** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/404 status code  
**jenkins.http.response.code.not_modified** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/304 status code  
**jenkins.http.response.code.ok** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/200 status code 
**jenkins.http.response.code.server_error** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/500 status code 
**jenkins.http.response.code.server_unavailable** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a HTTP/503 status code 
**jenkins.http.response.code.other** <br>*(long gauge)*    |  The count at which the Jenkins master Web UI is responding to requests with a non-informational status code that is not in the list - HTTP/200, HTTP/201, HTTP/204, HTTP/304, HTTP/400, HTTP/403, HTTP/404, HTTP/500, or HTTP/503 
**jenkins.executors.free** <br>*(long gauge)*      |  The number of executors available to Jenkins that are not currently in use
**jenkins.executors.in_use** <br>*(long gauge)*      |  The number of executors available to Jenkins that are currently in use
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
