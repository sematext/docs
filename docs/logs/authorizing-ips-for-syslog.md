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
your Sematext account ([click here](https://apps.sematext.com/ui/logs) to go to the list of
your Logs Management applications), or from the application itself.

## Method 1: From the Application Settings

First, you have to get to your [list of Logs Management Apps](https://apps.sematext.com/ui/logs). You can do
that from anywhere by going to **Integrations-\> Apps**.

From the list of applications, click on the **Actions** button next to
the Logs Management application you need to work with:

Click on **Whitelist IP** item and add your IPs to the list:

<img src="/docs/images/logs/syslog-ip-authorize-method-1.gif" alt="whitelist syslog IP">

## Method 2: From the Logs Management Application

You can also authorize IPs without leaving the Sematext Logs Management application. To
do that, click on the **App actions→App Settings** button on the
upper-right side.

Select **Source IPs** tab. From the **IPs authorized for...** screen,
you can start adding IPs:

<img src="/docs/images/logs/syslog-ip-authorize-method-2.gif" alt="syslog IP Authorize">
