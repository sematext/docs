title: Mobile App Log Shipping Tools
description: Ship logs from iOS and Android apps to Sematext

Use the following two libraries for shipping logs from mobile applications and devices running Android and iOS to Sematext Logs.
Both libraries have the following in common:
  * ship logs in configurable bulk requests to minimize battery and network usage
  * buffer logs while the device is disconnected from the network to avoid data loss
  * additional parameters to control when logs should or should not be shipped
  * meta data with application name and version, OS name and version, and application UUID
  * ability to catch and ship uncaught exceptions

Both libraries for shipping mobile application logs are open-source and available on Github:

- [Sematext for Android Applications](https://github.com/sematext/sematext-logsene-android)
- [Sematext for iOS Applications](https://github.com/sematext/sematext-logsene-ios)
