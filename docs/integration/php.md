## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
active processes | php.fpm.process.active | Avg | Long | the number of active processes
idle processes | php.fpm.process.idle | Avg | Long | the number of idle processes
accepted conns. count | php.fpm.request.acceptedconns.count | Sum | Long | the number of requests accepted by the pool
max listen queue | php.fpm.queue.listen.max | Max | Long | the maximum number of requests in the queue of pending connections since FPM has started
slow requests count | php.fpm.request.slow.count | Sum | Long | the number of requests that exceeded your request_slowlog_timeout value
total processes | php.fpm.process.total | Avg | Long | the number of idle + active processes
max active processes | php.fpm.process.active.max | Max | Long | the maximum number of active processes since FPM has started
max children reached | php.fpm.process.childrenReached.max | Sum | Long | the number of times, the process limit has been reached, when pm tries to start more children (works only for pm dynamic and ondemand)
listen queue len | php.fpm.queue.listen.len | Avg | Long | the size of the socket queue of pending connections
listen queue | php.fpm.queue.listen | Avg | Long | the number of requests in the queue of pending connections
