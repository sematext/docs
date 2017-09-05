# Troubleshooting 

The following command enables **debug** information to stdout - to be
displayed with `docker logs
container\_id\_of\_sematext-agent-docker`:

```sh
docker run -d --name sematext-agent -e SPM_TOKEN=YOUR-SPM_TOKEN \
-e SPM_LOG_TO_CONSOLE=true \
-e SPM_LOG_LEVEL=debug \
-v /var/run/docker.sock:/var/run/docker.sock \
sematext/sematext-agent-docker

docker logs -f sematext-agent
```

Parameters for debug
output:

``` sh
-e SPM_LOG_TO_CONSOLE=true - enables internal log messages to the console. Normally only metrics and errors are logged to the console
-e SPM_LOG_LEVEL=debug - "info|warn|error|debug" - set this to "debug" to see all messages on console
-e DEBUG_SPM_LOGGING=enabled - very detailed logging before parsing, after parsing, inserts to Logsene, etc. - please activate it only on demand from our support
```


If running Sematext Docker Agent in debug mode doesn't help you spot and
solve the problem please send us the diagnostics package as described
below.

Run the following to collect basic information for our support, such as
environment variables, and configuration:

``` sh
docker exec -it sematext-agent spm-client-diagnostics
...
SPM diagnostics info is in /tmp/spm-diagnose.zip
Please e-mail the file to [support@sematext.com](mailto:support@sematext.com)
```

Please contact us via chat or email us the output of that command and
the generated ZIP file (to support@sematext.com). You can copy the ZIP
file to your host using "docker cp":

``` sh
docker cp sematext-agent:/tmp/spm-diagnose.zip .
```
