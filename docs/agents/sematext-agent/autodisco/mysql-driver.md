title: MySQL driver
description:  Copying the MySQL driver into the agent volumes

Due to license restrictions, the MySQL Connector is not bundled within the `sematext/app-agent` Docker image. Instead, Sematext Agent automatically downloads the MySQL jar artifact from the Maven repository according to the version of MySQL service that was discovered.

However, sometimes it is not possible to download the jar file for a variety of reasons including on-premise setups that lack Internet connectivity. To overcome this limitation, you can manually copy the desired MySQL driver into the `/var/run/st-agent` directory of your Docker hosts.

If Sematext Agent is not able to contact the Maven repository, it will attempt to find the jar in the aforementioned directory and transfer it to the App Agent container.
