## Metrics

### Report: Docker Container CPU

#### Chart: FPM Pool Listen Queue
Metric Name | Metric Description
--- | ---
listen queue | the number of requests in the queue of pending connections
listen queue len | the size of the socket queue of pending connections
max listen queue | the maximum number of requests in the queue of pending connections since FPM has started

#### Chart: FPM Pool Requests
Metric Name | Metric Description
--- | ---
accepted conns. count | the number of requests accepted by the pool
slow requests count | the number of requests that exceeded your request_slowlog_timeout value
accepted conns. rate | the number of requests accepted by the pool
slow requests rate | the number of requests that exceeded your request_slowlog_timeout value

#### Chart: FPM Pool Processes
Metric Name | Metric Description
--- | ---
idle processes | the number of idle processes
active processes | the number of active processes
total processes | the number of idle + active processes
max active processes | the maximum number of active processes since FPM has started
max children reached | the number of times, the process limit has been reached, when pm tries to start more children (works only for pm dynamic and ondemand)



