title: PostgreSQL
description: Comprehensive view of your database's health and performance through Sematext's monitoring and logs integration. Monitor real-time metrics, leverage reports and dashboards for proactive issue identification, while diving deeper into statement durations and user access logs for extensive analysis and troubleshooting.

PostgreSQL is a powerful open-source relational database management system (RDBMS) known for its robustness, extensibility, and compliance with SQL standards. The [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) collects PostgreSQL metrics and logs, transmits them to Sematext Cloud; installing the agent takes less than 5 minutes.

## Install Sematext Agent

1.  Activate PostgreSQL `mod_status` module with `sudo a2enmod status` and configure it in `status.conf` file, e.g. in `/etc/PostgreSQL2/mods-enabled/status.conf`:

        ExtendedStatus On
        <Location /server-status>
          SetHandler server-status
        </Location>

2. Create an PostgreSQL Logs or Monitoring [App](https://sematext.com/docs/guide/app-guide/). This will let you install the agent and control access to your monitoring and logs data.
3. Install the Sematext Agent according to the [https://apps.sematext.com/ui/howto/PostgreSQL/overview](https://apps.sematext.com/ui/howto/PostgreSQL/overview) displayed in the UI.
4. After installing the agent, the Discovery tab shows all the PostgreSQL services identified on the host and you will start receiving metrics or logs from PostgreSQL services.
5. If you've created an PostgreSQL Monitoring App and want to collect PostgreSQL logs as well, or vice versa, click on the **Create Logs App** button from the left menu panel. This will navigate you to the 'Create Logs App' (or Monitoring App) page, where you'll find all the discovered log sources from PostgreSQL services and manage log and metric shipping effortlessly.

![PostgreSQL Counterpart](../images/integrations/PostgreSQL-counterpart.gif)

Having both PostgreSQL Logs and Monitoring Apps lets you correlate performance metrics and logs, and accelerate troubleshooting using [Split Screen](https://sematext.com/docs/guide/split-screen/) for faster resolution. For example, if you see a spike in number of rows fetched, you can check logs to see which queries fetch too many rows. A concrete example of doing that can be found in [this article](https://sematext.com/blog/postgresql-slow-queries/).

To [explore logs and services](https://sematext.com/docs/monitoring/autodiscovery/) across multiple hosts, navigate to [Fleet & Discovery > Discovery > Services](https://apps.sematext.com/ui/fleet-and-discovery/discovery/services) (or  [Sematext Cloud Europe](https://apps.eu.sematext.com/ui/fleet-and-discovery/discovery/services)). From there, you can create additional [Apps](https://sematext.com/docs/guide/app-guide/) or stream data to existing ones without requiring any additional installations. 

