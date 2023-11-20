title: Authorizing IPs for Syslog
description:  Syslog IPs authorization details for Sematext Logs Management application

When you send syslog to Sematext Logs Management App, we strongly recommend you do that by
adding your application token as part of your CEE-formatted JSON over
syslog.

If this is not possible for some reason - for example, if you're using
the [traditional syslogd](syslogd) - then you can authorize
your public IP (or IPs) and send logs to Logs Management App as if it's your local
log collector.  Authorizing an IP lets us determine to which app
logs originating from some IP should be routed.  As such, a given IP
address can be authorized in only one Logs Management Apps. 

You can authorize IPs from the Logs Management application's Settings within
your Sematext account.

## Method 1: From the Application Settings

Get to your Logs Apps from the left menu panel. From the list of applications, click on the **Actions** button next to
the Logs Management application you need to work with:

Click on **Whitelist IP** item and add your IPs to the list:

<img src="/docs/images/logs/logs-app-syslog-ip-authorize-method-1-min.gif" alt="whitelist syslog IP">

## Method 2: From the Logs Management Application

You can also authorize IPs without leaving the Sematext Logs Management App. To
do that, click on the **App Settings** from the left menu panel.

Select **Source IPs** tab. And click on **+Add New IP**:

<img src="/docs/images/logs/logs-app-syslog-ip-authorize-method-2-min.gif" alt="syslog IP Authorize">
