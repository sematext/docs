# FAQ 

## How can I add patterns to parse my container logs?

If the predefined log patterns don't match your container logs, then see the section ["Add patterns for Log parsing"](https://sematext.com/docs/sematext-docker-agent/configuration/#add-patterns-for-log-parsing). 
You can find more details about pattern definitions in the [Logagent documentation](https://sematext.com/docs/logagent/parser/) and the [Logagent FAQ](https://sematext.com/docs/logagent/faq/). 
Please note the regular expression in the property `sourceName` should match to the image name or container name.

You can use Logagent to test log patterns before you use the pattern file with Sematext Docker Agent. 
An example command to test log parsing for a `Cassandra` database container:
```
docker run --rm cassandra | logagent -f mypatterns.yml --yml
```

## Why do I see an error in 'df' command in SDA logs?

If you want to monitor the used and free disk space on your docker host, the Sematext Docker Agent needs access to the relevant disks.
When you mount `-v /:/rootfs` the filesystem might include symbolic link loops (typically in `/proc/sys/fs/binfmt_misc`), which cause the error in `df` command: `Error in df() for disk-usage metrics:Error: Command failed: df -kP`.

Potential workarounds: 

1. Mount another directory to Sematext Docker Agent container e.g. `-v /etc:/rootfs` 
2. Make sure `Docker.service` starts after `proc-sys-fs-binfmt_misc.mount` service 
3. Unmount binfmt_misc directory: `umount /proc/sys/fs/binfmt_misc`
4. Disable binfmt service: `sudo /usr/sbin/update-binfmts --disable`

Please see the information about a related [Ubuntu bug](https://bugs.launchpad.net/ubuntu/+source/systemd/+bug/1555760).

## Why is the `HTTPS_PROXY` setting not working?

If you use `https` URL in the `HTTPS_PROXY` environment variable like `https://myproxy:8080`, make sure that your proxy provides a valid HTTPS certificate. 
Otherwise use the `http` protocol in the proxy URL, e.g. `HTTPS_PROXY=http://myproxy:8080`. 
All requests will be sent via `http` to the proxy (internal network), and the proxy will then establish the `https` connection to Sematext receivers (external network).  

## Why is 'docker logs' not working?   

As long as the `docker logs` command works, Sematext Docker Agent will work as well. 
The default Logging driver “json-file” writes logs to the local disk, and the json-file driver is the only one that works in parallel to “docker logs” command. As soon one uses alternative logging drivers, such as Syslog, Gelf or Splunk, the Docker logs API calls start failing, and the `docker logs` command shows an error reporting the limitations instead of displaying the logs on the console. Not only does the docker log command fail, but many other tools using the Docker API for logs, such as Docker user interfaces like Portainer or log collection containers like Logspout are not able to show the container logs in this situation.

More details: 

- [Docker Github issue #30887](https://github.com/moby/moby/issues/30887)
- [Top 10 Docker Logging Gotchas](https://sematext.com/blog/top-10-docker-logging-gotchas/)
