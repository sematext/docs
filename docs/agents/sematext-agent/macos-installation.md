title: Installing Sematext Agent on macOS
description: Install, run, upgrade and uninstall the Sematext Agent on macOS with Homebrew

Sematext Agent collects host metrics (CPU, memory, disk, network), processes, server inventory and launchd service statuses from Macs, and receives [OpenTelemetry](/docs/agents/sematext-agent/opentelemetry/) metrics, traces and logs from your applications. It is installed with Homebrew and runs as a root LaunchDaemon (`com.sematext.agent`).

## Preconditions

Check the [platform support policy](/docs/agents/sematext-agent/platform-support-policy/#macos) to make sure your macOS version is supported. Both Apple Silicon and Intel Macs are supported.

You need [Homebrew](https://brew.sh/) and an account that can run `sudo`.

To see your Mac's metrics in Sematext Cloud, [create an Infra App](/docs/monitoring/infrastructure/#create-an-infra-app). Its Infra App token links Sematext Agent to Sematext Cloud.

## Install

Install the Homebrew cask:

```bash
brew install --cask sematext/tap/sematext-agent
```

Then install and start the daemon with your Infra App token and region (`EU` or `US`, based on where you created your account in Sematext Cloud):

```bash
sudo st-agent macos-service install --infra-token YOUR_INFRA_APP_TOKEN --region EU
```

The daemon starts right away and again at every boot.

## How to check the Sematext Agent service status

```bash
st-agent macos-service status
```

## How to start / stop / restart Sematext Agent

Start:

```bash
sudo st-agent macos-service start
```

Stop:

```bash
sudo st-agent macos-service stop
```

Restart:

```bash
sudo st-agent macos-service restart
```

A stopped agent stays stopped until you start it again or the Mac reboots.

## How to check Sematext Agent logs

The agent log is `/opt/spm/spm-monitor/logs/st-agent/st-agent.log`. It is owned by root, so read it with `sudo`:

```bash
sudo tail -f /opt/spm/spm-monitor/logs/st-agent/st-agent.log
```

If the agent crashes or fails to start, launchd writes its output to `/opt/spm/spm-monitor/logs/st-agent/launchd.log`.

## How to change the Infra App token or region

Run the install command again with the new values. It keeps the rest of the configuration and restarts the daemon:

```bash
sudo st-agent macos-service install --infra-token YOUR_INFRA_APP_TOKEN --region US
```

## How to upgrade Sematext Agent

```bash
brew upgrade --cask sematext/tap/sematext-agent
```

The upgrade reinstalls the daemon from the new version and keeps your configuration. It asks for your password once.

## How to uninstall Sematext Agent

```bash
brew uninstall --cask sematext/tap/sematext-agent
```

This stops the daemon and removes it, and keeps the configuration and tokens in `/opt/spm`. To remove those too:

```bash
brew uninstall --zap --cask sematext/tap/sematext-agent
```

## Beta channel

Release candidates are published to a separate cask, `sematext/tap/sematext-agent-beta`, which also gets every stable release. Only one of the two casks can be installed at a time.

## Limitations

Log collection beyond OpenTelemetry logs, package inventory, containers, Kubernetes, Auto-Discovery, Network Map and AI Agent Watch are not available on macOS. See [feature availability](/docs/agents/sematext-agent/platform-support-policy/#feature-availability) for the full list.
