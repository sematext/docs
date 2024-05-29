title: Installing Sematext Agent on Windows

Sematext Agent collects a plethora of metrics about Windows hosts (CPU, memory, disk, network, processes). The installer is responsible for installing the Sematext Agent, configuring it, and starting it as a Windows Service.

Installation can be done either by using the GUI installer or through the command line.

## Preconditions

Before starting, please check the [platform support policy](https://sematext.com/docs/agents/sematext-agent/platform-support-policy/) page to make sure your Windows platform is supported.

To see your Windows host metrics in Sematext Cloud, you need to [create an Infra App](https://sematext.com/docs/monitoring/infrastructure/#create-an-infra-app) and select the Windows environment. This will provide you with an Infra App token, which is essential for establishing a secure link between Sematext Cloud and Sematext Agent.

## Install from GUI

1. Download the [Sematext Agent installer](https://pub-repo.sematext.com/windows/pool/main/s/sematext-agent/sematext-agent-latest.msi)
2. Follow the installation steps and accept the license agreement 
3. Set the Infra App token
4. Select a region (EU or US) based on where you created your account in Sematext Cloud

After completing these steps, Sematext Agent will be automatically started as a Windows Service.

## Install from command line

Download the [Sematext Agent installer](https://pub-repo.sematext.com/windows/pool/main/s/sematext-agent/sematext-agent-latest.msi).

### Using PowerShell

Run the following command as Administrator from the folder where you downloaded the installer:

```
Start-Process -Wait msiexec -ArgumentList "/qn /i $($msiFileName = 'AGENT_MSI_INSTALLER'; $msiFileName) /L*V `"$msiFileName.log`" INFRA_APP_TOKEN=YOUR_INFRA_TOKEN REGION=YOUR_REGION_EU_or_US"
```

Where:

- `YOUR_INFRA_APP_TOKEN`: the Infra App token
- `YOUR_REGION_EU_or_US`: your Sematext Cloud region - EU or US
- `AGENT_MSI_INSTALLER`: the filename of the Sematext Agent Windows installer

For example:

```
Start-Process -Wait msiexec -ArgumentList "/qn /i $($msiFileName = 'sematext-agent-latest.msi'; $msiFileName) /L*V `"$msiFileName.log`" INFRA_APP_TOKEN=7511db7f-c060-4e10-b667-5f2653d4933e REGION=EU"
```

### Using Windows CMD:

Run the following command as Administrator from the folder where you downloaded the installer:

```
start /wait msiexec /qn /i "AGENT_MSI_INSTALLER" /L*V "AGENT_MSI_INSTALLER.log" INFRA_TOKEN=YOUR_INFRA_APP_TOKEN REGION=YOUR_REGION_EU_or_US
```

Where:

- `YOUR_INFRA_APP_TOKEN`: the Infra App token
- `YOUR_REGION_EU_or_US`: your Sematext Cloud region - EU or US
- `AGENT_MSI_INSTALLER`: the filename of the Sematext Agent Windows installer

For example:

```
start /wait msiexec /qn /i "sematext-agent-latest.msi" /L*V "sematext-agent-latest.msi.log" INFRA_APP_TOKEN=7511db7f-c060-4e10-b667-5f2653d4933e REGION=EU
```

After completing these steps, Sematext Agent will be automatically started as a Windows Service.

## How to check the Sematext Agent service status

### Windows Services

Open Windows Services and find the Sematext Agent service:

![Sematext Agent service](images/sematext-agent-service.png)

### Command line

Run the following command:

```
cd  'C:\Program Files\Sematext Agent\' .\st-agent-amd64.exe windows-service status
```

## How to start / stop / restart Sematext Agent

To start, stop or restart the Sematext Agent, you can perform these actions through the GUI:

- Start: Open the Windows Services application by searching for "Services" in the Windows search bar, locate "Sematext Agent" in the list of services, right-click on it, and select "Start"
- Stop: Similarly, in the Services application, locate "Sematext Agent", right-click on it, and select "Stop"
- Restart: To restart the Sematext Agent, you can either stop and then start it again using the aforementioned steps or right-click on "Sematext Agent" in the Services application and select "Restart"

Alternatively, you can use the command-line interface by running one of the following commands as Administrator:

Start:

```
cd 'C:\Program Files\Sematext Agent\'
.\st-agent-amd64.exe windows-service start
```

Stop:

```
cd  'C:\Program Files\Sematext Agent\'
.\st-agent-amd64.exe windows-service stop
```

Restart:

```
cd  'C:\Program Files\Sematext Agent\'
.\st-agent-amd64.exe windows-service restart
```

## How to check Sematext Agent logs

Sematext Agent logs are located in the `C:\Windows\System32\config\systemprofile\AppData\Local\sematext-agent` folder.

For example, you can access the logs file like below;

```
cd C:\Windows\System32\config\systemprofile\AppData\Local\sematext-agent

notepad.exe .\logs\st-agent.log
```

## How to change Infra App token or region

You can either reinstall Sematext Agent through GUI or by running the following command from command line:

```
cd  'C:\Program Files\Sematext Agent\'
.\st-agent-amd64.exe windows-config set-token -t "YOUR_INFRA_TOKEN"
.\st-agent-amd64.exe windows-config set-region -r "YOUR_REGION_EU_or_US"
```

After the changes, you need to restart the agent:

```
.\st-agent-amd64.exe windows-service restart
```

## How to unistall Sematext Agent

You can uninstall Sematext Agent using the GUI installer or from Windows Settings > Apps.

## Limitations / Known Issues

The Sematext Agent for Windows is still a work in progress and has some limitations:

- Discovery and configuration of services and log sources are not yet supported
- Inventory functionality is not yet available
- Custom tags cannot be created
- Sematext Agent for Windows is still in the Beta stage. You may see "Unknown Publisher" errors while installing the agent on your Windows host. We are aware of this issue and we will solve this issue soon, here is the hash of the file if you need to verify the file is valid: `9d1c1f08b67ff9b3bfc3bab2f7cc3ab96f3ca1d7d8a132caaa8019fe50b220cf  sematext-agent-3.4.1.200.msi`
  

