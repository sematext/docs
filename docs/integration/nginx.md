title: Nginx Monitoring Integration
description: The Sematext monitoring agent can collect many metrics from NGINX instances, including requests, reading, writing, waiting, active and more. Utilize built-in anomaly detection, threshold, and heartbeat alerting and send notifications to email and various chatops messaging services. Correlate events & logs, filter metrics by server or time, and visualize your cluster's health with out of the box graphs and custom dashboards

Sematext offers a simple, easy to install, Nginx monitoring agent with minimal CPU and memory overhead.

## Install Nginx Monitoring Agent
Setting up the monitoring agent takes less than 5 minutes:

1.  Activate the Nginx stub_status module in the server section of your Nginx config file. If you are using the default Nginx config file it will be in `/etc/nginx/sites-enabled/default`:

        location /nginx_status {
          stub_status on;
          access_log off;
        }

2.  Create an Nginx App in the  [Integrations / Overview](https://apps.sematext.com/ui/monitoring-create) (or  [Sematext Cloud Europe](https://apps.eu.sematext.com/ui/monitoring-create)). This will let you install the agent and control access to your monitoring and logs data. The short  [What is an App in Sematext Cloud](https://www.youtube.com/watch?v=tr_qxdr8dvk&index=14&list=plt_fd32ofypflbfzz_hiafnqjdltth1ns) video has more details.
3.  Name your Nginx monitoring App and, if you want to collect Nginx logs as well, create an Nginx App along the way.
4.  Install the Sematext Agent according to the  [setup instructions](https://apps.sematext.com/ui/howto/Nginx/overview) displayed in the UI.

## Nginx Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
requests | nginx.request.count | Sum | Long | <b>requests</b>: Request count
reading | nginx.requests.connections.reading | Avg | Double | <b>reading</b>: Nginx reads request header
writing | nginx.requests.connections.writing | Avg | Double | <b>writing</b>: Nginx reads request body, processes request, or writes response to a client
waiting | nginx.requests.connections.waiting | Avg | Double | <b>waiting</b>: keep-alive connections
active | nginx.requests.connections.active | Avg | Double | <b>active</b>: number of all open connections

## PHP-FPM Monitoring

PHP-FPM monitoring can be enabled along with Apache monitoring. See [PHP-FPM](./php) for more details.

## Troubleshooting

If you are having issues with Sematext Monitoring, i.e. not seeing Apache metrics, see
[How do I create the diagnostics package](/monitoring/spm-faq/#how-do-i-create-the-diagnostics-package).

For more troubleshooting information please look at [Troubleshooting](/monitoring/spm-faq/#troubleshooting) section.
