title: Permission requirements
description: Why Sematext Agent needs access to certain host files and directories

Sematext Agent requires root privileges to perform several operations:

- scan active processes as well as their resources such as file descriptors, open sockets, etc.
- load eBPF probes on kernel symbols
- monitoring network traffic
- accessing process log files
- opening the `/dev/kmsg` device for reading kernel log buffer messages

## Container setups

In container setups, Sematext Agent requires that the following bind mounts are defined. Please note, the majority of bind mounts are propagated to container as read-only volumes.

- `/:/hostfs:ro` - the root partition is mounted in order to collect disk space metrics from inside container.
- `/sys/:/hostfs/sys:ro` - sysfs is needed for scanning the cgroup hierarchies for container metrics collection.
-  `/var/run/:/var/run/` - Sematext Agent has a persistent journal where it writes events that failed to ship. By default, the agent stores events in `/var/run/st-agent` directory on the host. This means that even if the container is removed, the journal is still accessible for future agent containers.
- `/sys/kernel/debug:/sys/kernel/debug` - is required by eBPF engine to attach kprobes on kernel symbols. Note, if your system doesn't support eBPF, this bind mount is not required.
- `/etc/passwd:/etc/passwd:ro` and `/etc/group:/etc/group:ro` - for the purpose of resolving user/group identifiers to their symbolic names agent needs to access these files. Users/groups are collected as part of process metadata.
