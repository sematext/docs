title: Shipping Container Logs
description: Shipping Container Log Sources

To enable automatic container logs shipping, start by clicking on the `Set Up` button.

![Setup Log Files](images/setup-container-logs.png)

This will open the following flyout panel where you can configure container log shipping:

![Enable Container Logs](images/enable-container-logs.png)

1. Enable the "Automatically ship <group-name> logs" toggle
2. Select the destination Logs App. If the Logs App doesn't exist, you'll be able to create one from the same screen
3. Click the `Save Changes` button

Log shipping is configured on a per container image basis. This implies that any freshly created containers that match this image name will automatically have their logs shipped to Sematext Cloud.

## Routing logs by container labels

If you want to restrict the scope of log collection, it is possible to route the container logs by labels. You can either select a label from the list of already defined labels in this container or write a custom label. Labels can contain a key/value pair, or just a key.

![Route Container Logs](images/route-by-container-labels.png)
