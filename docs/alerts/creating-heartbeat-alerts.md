title: Creating Heartbeat Alerts
description: Step-by-step Heartbeat alert creation instructions 

Monitoring Apps have Heartbeat Alerts as part of their settings. You can find them in the App dropdown menu in the top-left corner.

![image alt text](../images/alerts/heartbeat_image_01.png)

It’s possible to create Heartbeat Alerts based on any combination of tags. Heartbeat Alerts can be tied to specific services regardless of where they are running.

You can specify tags to filter and group by, then create Heartbeat Alerts for services matching your criteria. This way, even if a containerized service is moved from one host to another, it will not trigger false alerts.

To make this possible Sematext Agent sends tags from the Sematext Common Schema that tag-based alerts use: 

- os.host
- container.id
- container.image.name
- container.image.tag
- container.name

Using these tags you can do things like:
- Filtering and grouping by container.image.name to get alerted when all containers with the specified image name are gone.  
- Grouping by container.id to get alerted when that particular container dies. Yes, this could lead to a lot of alert noise, so use this sparingly and wisely.
- Grouping by `os.host` and `container.image.name` to get alerted when a host stops running all containers with some image name. The container may have been moved to another host.

This example will show how to include two specific images we’re interested in and grouping them by `os.host` and `container.image.name` to get alerted when a host stops running all containers with a particular image name.

Open the Heartbeat Alert creation dialog. You’ll see that we group by the `os.host` tag by default. On the preview chart you may see a number of bars. These bars represent your hosts.

![image alt text](../images/alerts/heartbeat_image_02.png)

In the filter section, you see the ability to include and exclude tags. Let’s include two values for the container.image.name tag. Alerts will now only observe containers which were built from these 2 images.

![image alt text](../images/alerts/heartbeat_image_03.png)

Then, in the group by section, add the `os.host` and `container.image.name` tags.

![image alt text](../images/alerts/heartbeat_image_04.png)

You can see a preview of the heartbeat bars split and grouped by the selected tags.

6 bars because we have 3 `os.host` tag values and 2 `container.image.name` tag values. There are 6 combinations because 2 containers are running on each one of the 3 available hosts.

This example Heartbeat alert rule shows `os.host`+`container.image.name` combinations. You will get notified if some container with a particular name moves to another host or disappears altogether.














