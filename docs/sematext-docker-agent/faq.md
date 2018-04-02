# FAQ 

## Why do I see an error in 'df' command in SDA logs?

If you want to monitor the used and free disk space on your docker host, the Sematext Docker Agent needs access to the relevant disks.
When you mount `-v /:/rootfs` the filesystem might include symbolic link loops (typically in `/proc/sys/fs/binfmt_misc`), which cause the error in `df` command: `Error in df() for disk-usage metrics:Error: Command failed: df -kP`.

Please see related Ubuntu bug: [https://bugs.launchpad.net/ubuntu/+source/systemd/+bug/1555760](https://bugs.launchpad.net/ubuntu/+source/systemd/+bug/1555760)

Potential workarounds: 

1. Mount another directory to Sematext Docker Agent container e.g. `-v /etc:/rootfs` 
2. Make sure `Docker.service` starts after `proc-sys-fs-binfmt_misc.mount` service 
3. Unmount binfmt_misc directory: `umount /proc/sys/fs/binfmt_misc`
4. Disable binfmt service: `sudo /usr/sbin/update-binfmts --disable`

## Why is the `HTTPS_PROXY` setting not working?

If you use `https` URL in the `HTTPS_PROXY` environment variable like `https://myproxy:8080`, make sure that your proxy provides a valid HTTPS certificate. 
Otherwise use the `http` protocol in the proxy URL, e.g. `HTTPS_PROXY=http://myproxy:8080`. 
All requests will be sent via `http` to the proxy (internal network), and the proxy will then establish the `https` connection to Sematext receivers (external network).  

## Why is 'docker logs' not working?   

As long the `docker logs` command works, Sematext Docker Agent will work as well. 
The default Logging driver “json-file” writes logs to the local disk, and the json-file driver is the only one that works in parallel to “docker logs” command. As soon one uses alternative logging drivers, such as Syslog, Gelf or Splunk,  the Docker logs API calls start failing, and the “docker logs” command shows an error reporting the limitations instead of displaying the logs on the console. Not only does the docker log command fail, but many other tools using the Docker API for logs, such as Docker user interfaces like Portainer or log collection containers like Logspout are not able to show the container logs in this situation.

More details: 

- [https://github.com/moby/moby/issues/30887][https://github.com/moby/moby/issues/30887]
- [Top 10 Docker Logging Gotchas](https://sematext.com/blog/top-10-docker-logging-gotchas/)