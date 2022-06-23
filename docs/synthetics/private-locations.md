title: Private Locations
description: The private locations feature allows you to monitor APIs and webpages that are not accessible from the Internet such as your internal websites, private APIs, etc.

The private locations feature allows you to run synthetic tests from your private network. Some of the use cases for using private locations are:

* Monitor internal APIs or web applications that are not accessible from the Internet
* Compare the performance of your applications between the Internet & your private network
* Monitor your applications from specific locations that are not supported by Sematext

## Create Private Location

To create a private location, navigate to Synthetics -> Private Locations -> New Private Location. 

![Create Private Location](../images/synthetics/create-private-location.png)

* **Name** - Unique name for the private location
* **Description** - A brief description of the location
* **City** - Select the city where the machine running the agent is physically located. If your city is not listed, select the nearest city. This is used to calculate latitude/longitude to plot the location in the map.

Each private location is assigned a unique token. You can disable or delete a location, when not in use.

## Install Private Agents

After creating the private location from the UI, you need to install the agents on a machine in your private network. Private agents are deployed as Docker containers. There are two Docker images, one for HTTP monitors and another for Browser monitors.
You can deploy either the HTTP or Browser monitor or both. Follow the instructions in the UI to install private agents in your network.

![Installation Instructions](../images/synthetics/private-location-installation.png)

If you have multiple private locations, you need to install agents individually in each location. Private agents use the HTTPS protocol to periodically fetch the monitors to run and send the result to Sematext Cloud. If you have a firewall configured in your network, you need to open bidirectional HTTPS traffic for the `synthetics-scheduler.sematext.com` and `synthetics-receiver.sematext.com` hosts. For the EU region, the hosts are `synthetics-scheduler.eu.sematext.com` and `synthetics-receiver.eu.sematext.com`.

## Using Private Locations

Once you create a private location from the UI and install the agents, you can use it while creating the monitors or update existing monitors to run from the private location. Private locations behave exactly the same as public locations. The only exception to this is that private locations won't be able to use *sensitive data* for script-based Browser monitors, due to security concerns.

### Schedule a Monitor to Run from Private Locations

![Create Monitor with Private Location](../images/synthetics/private-locations-monitor.png)

### Monitor Overview with Metrics from Private Location

![Monitor Overview with Private Location](../images/synthetics/private-location-monitor-overview.png)
