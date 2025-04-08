title: Sematext Windows Services Monitoring
description: Monitoring of Windows Services provides real-time insights into their status, performance, and potential issues

Sematext Monitoring now includes support for Windows Services. Starting from Sematext Agent [version 3.5.0](/docs/agents/sematext-agent/releasenotes/#version-350), you can collect and monitor the status of any Windows Service available in your system.

## Metrics

The [Sematext Agent for Windows](/docs/agents/sematext-agent/windows-installation/), starting from version 3.5.0, is capable of collecting metrics related with the status of Windows services. At present, the primary metric supported is the status of each service including a number of statistics, which allows users to determine whether a service is running, stopped, or experiencing issues.


### List of available metrics

|Name| Type  | Description |
|----|-------|-------------|
|windows.service.status            | number |status of a Windows service|
|windows.service.total             | gauge  |total number of Windows services|
|windows.service.total.running     | gauge  |total number of running Windows services|
|windows.service.total.not_running | gauge  |total number of non running Windows services|


### Available Windows Services statuses 

Below is a list of all the possible values (statuses) of the `windows.service.status` metric.

|Value | Service Status  |
|------|-----------------|
|1     | stopped         |
|2     | start pending   |
|3     | stop pending    |
|4     | running         |
|5     | continue pending|
|6     | pause pending   |
|7     | paused          |

### Available Tags

Below is a list of available [tags](/docs/tags/) for the `windows.service.status` metric. Tags can be used to retrieve individual service names or process IDs related with a specific service. Edit any chart in the Infrastructure > Windows > Top Services report to understand how you can use a the `windows.service.status`, grouped by a tag.

|Tag name | Description  |
|---------|--------------|
|windows.service.name   | name of the Windows service       |
|windows.service.type   | type of the Windows service       |
|windows.service.pid    | process ID of the Windows service |

For more information about the status of Windows Services and the available service types, please refer to the [official documentation](https://learn.microsoft.com/en-us/windows/win32/api/winsvc/ns-winsvc-service_status).


## Reports

Coming Soon!


## Default Alerts

Each time you create a new Infra App in Sematext Cloud to monitor your Windows servers, a number of pre-configured alerts are created as well, fine tuned to catch various issues and help you prevent your systems from going down.

Refer to our [infrastructure default alerts](/docs/monitoring/servers/#core-infrastructure-alerting) to learn more.

Moreover, a set of pre-defined [alerts](/docs/alerts/) is supported for the status of several important Windows services. These alerts are triggered when the status of any monitored service is not running. The following services are monitored out-of-the-box:

- Windows Time (W32Time)
- Security Accounts Manager (SamSs)
- Event Log (eventlog)
- Task Scheduler (Schedule)
- DHCP Client (Dhcp)
- LanmanWorkstation
- LanmanServer
- Plug and Play (PlugPlay)
- Windows Management Instrumentation (WMI) (winmgmt)
- Group Policy Client (gpsvc)
- Cryptographic Services (CryptSvc)
- Print Spooler (Spooler)
- Remote Access Connection Manager (RasMan)
- Network Store Interface Service (nsi)
- Network List Service (NlaSvc)

In addition to having alerts for these services, you can [create alerts](/docs/alerts/creating-metrics-alerts/) for any other Windows Service you like, as long as they are available on your Windows machines.

For more information, please refer to our [Windows Monitoring](/docs/integration/windows/) integration.
