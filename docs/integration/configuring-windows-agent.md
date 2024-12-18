title: Configuring Sematext Agent to Ship Windows Events
description: Tailor Sematext Windows Agent based on your needs to add/remove channels or to give friendly names to windows logs.

The [Sematext Agent for Windows](https://sematext.com/docs/agents/sematext-agent/windows-installation/) collects logs from your Windows system and sends them to your [Windows Logs App](https://sematext.com/docs/integration/windows/#logs) for monitoring and analysis. After installing the agent, you can make additional configurations to tailor it to your preferences.

## Configuring Event Names

Windows logs are identified by an Event ID and a Source. For instance, **Event ID 4625** with **Source: Microsoft-Windows-Security-Auditing** signifies an unsuccessful logon attempt. You don’t need to memorize each Event ID and Source because the agent includes a built-in dictionary that translates these IDs and sources into more meaningful names. For example, when the agent encounters a log with **Event ID 4625** and **Source: Microsoft-Windows-Security-Auditing**, it assigns the name `ACCOUNT_LOGON_FAILED`.
Although the agent provides a default dictionary, you can add or customize event names as needed by following these steps:

1. Navigate to `C:\Program Files\SematextAgent\properties\` and open the `st-agent.yml` file.
2. Locate the section labeled `#Define custom names for specific event IDs and sources`.
3. Uncomment the `names`: line if it is commented out, and then add your custom event names. For example:

```
names:
  "1033:MsiInstaller": "MSI_INSTALLATION_STARTED"
  "6005:EventLog": "EVENT_LOG_SERVICE_STARTED"
```
4. Save changes and [restart the Sematext Agent Service](https://sematext.com/docs/agents/sematext-agent/windows-installation/#how-to-start-stop-restart-sematext-agent)

## Customizing Log Channels

By default, the agent collects logs from the following Windows Event Viewer channels:

- Security
- Application
- System
- Setup

You can customize which channels the agent collects logs from by following these steps:

1. Navigate to `C:\Program Files\SematextAgent\properties\` and open the `st-agent.yml` file.
2. Locate the section labeled paths and add or remove channels according to your needs.

```
paths: ["Security", "Application", "System", "Setup"]
```

3. Save changes and restart the Sematext Agent Service

