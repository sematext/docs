
Process metrics are enriched with additional metadata serving as an invaluable resource for root cause analysis or debugging. The present table summarizes the metadata that is tracked for each process.

### Process metadata

| Name           | Description |
| -----------|-------------|
| name       | Represents the process name |
| cmd        | Is the complete command line of the process |   
| cwd        | Designates the current working directory |
| umask      | Is the process umask in octal format. The umask determines the permission bits of the files created by this process |
| start time | Represents the process's start time |
| pid | Represents the unique process identifier |
| tid | Is the identifier of the currently active  thread |
| ppid | Is the parent identifier of the child process |
| uid | Determines the real user id |
| user | Represents the human readable user name |
| gid | Determines the real group id |
| group | Represents the human readable group name |
| container id | In case of containerized processes, represents the container identifier that owns the process |
| container name | In case of containerized processes, represents the container name that owns the process |
