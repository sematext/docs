title: Mobile App Log Shipping Tools
description: Ship logs from iOS and Android apps to Sematext

Use the following two libraries for shipping logs from mobile applications and devices running Android and iOS to Sematext Logs.
Both libraries have the following in common:

- automatic and manual geolocation tagging
- ship logs in configurable bulk requests to minimize battery and network usage
- buffer logs while the device is disconnected from the network to avoid data loss
- additional parameters to control when logs should or should not be shipped
- pause and resume log shipping on demand
- metadata with application name and version, OS name and version, and application UUID
- ability to catch and ship uncaught exceptions

Use Sematext Cloud **Mobile Application Logs** App to get out of the box reports with the most important information about your mobile applications.

Get an overview of your mobile apps with information like:
 
 - top iOS and Android versions
 - top log severities and version names

<img
  class="content-modal-image"
  alt="Mobile Logs Overview"
  src="../../images/agents/mobile_overview.png"
  title="Mobile Logs Overview"
/>

Explore the common errors associated with your mobile applications and see an aggregated error view including:

 - number of errors and theirs count over time
 - top operating systems, top iOS and Android versions that are reporting errors
 - error log events

<img
  class="content-modal-image"
  alt="Mobile Logs Errors"
  src="../../images/agents/mobile_errors.png"
  title="Mobile Logs Errors"
/> 

Get insights from dedicated Android and iOS reports that include:

 - mobile operating system logs histogram and their count
 - top severities, version, version codes, and version names
 - mobile operating system log events

<img
  class="content-modal-image"
  alt="Mobile Logs Android"
  src="../../images/agents/mobile_android.png"
  title="Mobile Logs Android"
/>

Both libraries for shipping mobile application logs are open-source and available on Github:

- [Sematext for Android Applications](https://github.com/sematext/sematext-logsene-android)
- [Sematext for iOS Applications](https://github.com/sematext/sematext-logsene-ios)
-