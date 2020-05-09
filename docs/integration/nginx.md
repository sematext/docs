title: Nginx Monitoring Integration
description: The Sematext monitoring agent can collect many metrics from NGINX instances, including requests, reading, writing, waiting, active and more. Utilize built-in anomaly detection, threshold, and heartbeat alerting and send notifications to email and various chatops messaging services. Correlate events & logs, filter metrics by server or time, and visualize your cluster's health with out of the box graphs and custom dashboards

Sematext offers a simple, easy to install, Nginx monitoring agent with minimal CPU and memory overhead.

## Install Nginx Monitoring Agent
This lightweight, open-source [Nginx monitoring agent](https://github.com/sematext/sematext-agent-nginx) collects Nginx performance metrics and sends them to Sematext. It is available as an [npm package](https://www.npmjs.com/package/spm-agent-nodejs) that runs as a system service on your host. First [create an Nginx Monitoring App](https://apps.sematext.com/ui/monitoring-create) in Sematext, then follow these instructions:

1. Make sure Node.js is installed. Version 10.* and newer are fully supported. Older versions may work too (but ensure npm is installed first).
2. Install Sematext Nginx Agent using npm:
        
        sudo npm i sematext-agent-nginx -g

3. Activate the Nginx stub_status module in the server section of your Nginx config file. If you are using the default Nginx config file it will be in `/etc/nginx/sites-enabled/default`:

        location /nginx_status {
          stub_status on;
          access_log off;
        }

4. Run the Agent setup script to generate the config file and upstart/systemd services. If needed, replace the `nginx_status` URL with your URL to the Nginx status page.

        sudo sematext-nginx-setup -t <your-token-goes-here> -n http://localhost/nginx_status

## Configure Nginx Monitoring Agent
The setup script stores the configuration in `/etc/sematext/sematext-agent-nginx.config`

### Change settings
In case you want to change settings later edit `/etc/sematext/sematext-agent-nginx.config`. A typical use case is to add a receiver URL for an [On-Premises installation](https://sematext.com/enterprise/) of Sematext Monitoring in the config file:

Default value for Sematext Cloud: `https://spm-receiver.sematext.com:443/receiver/v1/_bulk`
```bash
spmSenderBulkInsertUrl: http://your-server:8084/_bulk
```

Default value for Sematext Cloud: `https://event-receiver.sematext.com`
```bash
eventsReceiverUrl: http://your-server:8083
```

Restart the Sematext Nginx Agent after config changes, depending on the init system:

- Upstart:

```bash
sudo service sematext-agent-nginx restart 
```

- Systemd:

```bash
sudo systemctl restart sematext-agent-nginx
```

- Launchd (Mac OS X):

```bash
sudo launchctl restart com.sematext.sematext-agent-nginx
```

- For tests you can just run the agent from command line:

```bash
sematext-agent-nginx --config /etc/sematext/sematext-agent-nginx.config
```

_Note: To enable PHP-FPM stats monitoring see the [PHP instructions](./php)._

## Collected Nginx Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
requests | nginx.request.count | Sum | Long | <b>requests</b>: Request count
reading | nginx.requests.connections.reading | Avg | Double | <b>reading</b>: Nginx reads request header
writing | nginx.requests.connections.writing | Avg | Double | <b>writing</b>: Nginx reads request body, processes request, or writes response to a client
waiting | nginx.requests.connections.waiting | Avg | Double | <b>waiting</b>: keep-alive connections
active | nginx.requests.connections.active | Avg | Double | <b>active</b>: number of all open connections

## Troubleshooting

If you are not seeing some or any Nginx metrics, you can create a "diagnostics dump" and contact us via live chat or email. To create the diagnostics dump just run the following:
```
sudo spm-nginx-diagnostics
```

This will create a ZIP file and show the Sematext Support email address to which the ZIP file should be sent.
