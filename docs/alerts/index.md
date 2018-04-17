### Alert Types
[Sematext Cloud](http://sematext.com/cloud/) includes multiple types
of alerts that integrate with PagerDuty, Slack, email, and [other 3rd
party services](#integrations).  

1. **Threshold** alerts are the classic threshold based alerts.  They are
triggeed when something crosses a pre-defiend threshold.
2. **Anomaly** alerts are based on statistical anomaly detection.  They
are triggeed when values suddenly change and deviate from the
continously computed baseline.
3. **Heartbeat** alerts are triggered when something you are monitoring,
like your servers, containers, or your applications stop emitting data
to Sematext.

### Alert Sources
Alerts can be triggered on both Metrics and Logs:

Alert type | Metrics | Logs
--- | --- | ---
Threshold | yes | yes |
Anomaly | yes | yes |
Heartbeat | yes | no |

You can manage Alert rules interactively via the UI, or you can
[manage alerts via the API](/docs/api).


### Alert Integrations

Alert notifications can be sent to a number of different destinations:

  - Email
  - [PagerDuty](../integration/alerts-pagerduty-integration)
  - [Slack](../integration/alerts-slack-integration)
  - [HipChat](../integration/alerts-hipchat-integration)
  - VictorOps
  - OpsGenie
  - BigPanda
  - Pushover
  - Nagios
  - Zapier
  - WebHooks for any other service
