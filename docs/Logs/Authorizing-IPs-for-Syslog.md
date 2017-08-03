When you send syslog to Logsene, we strongly recommend you do that by
adding your Logsene App's token as part of your CEE-formatted JSON over
syslog.

If this is not possible for some reason - for example, if you're using
the [traditional syslogd](syslogd) - then you can authorize
your public IP (or IPs) and send logs to Logsene as if it's your local
log collector.  Authorizing an IP lets us determine to which Logsene app
logs originating from some IP should be routed.  As such, a given IP
address can be authorized in only one Logsene app. 

You can authorize IPs from the Logsene application's Settings within
your Sematext account ([click here](https://apps.sematext.com/integrations/apps) to go to the list of
your Logsene applications), or from the Logsene application itself.

## Method 1: From the Application Settings

First, you have to get to your [list of Applications](https://apps.sematext.com/integrations/apps). You can do
that from anywhere by going to **Integrations-\> Apps**:

![](attachments/23855110/101418634.png?height=250)

From the list of applications, click on the **Actions** button next to
the Logsene application you need to work with:

![](attachments/23855110/101418684.png?height=250)

Click on **Whitelist IP** item and add your IPs to the list:

![](attachments/23855110/101418725.png?height=250)

## Method 2: From the Logsene Application

You can also authorize IPs without leaving the Logsene application. To
do that, click on the **App actions→App Settings** button on the
upper-right side:

![](attachments/23855110/101418770.png?height=250)

Select **Source IPs** tab. From the **IPs authorized for...** screen,
you can start adding IPs:

![](attachments/23855110/101418898.png?height=250)
