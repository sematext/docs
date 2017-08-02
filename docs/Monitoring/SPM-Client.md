SPM Client is available in two versions:

  - [Embedded](SPM-Monitor---Javaagent) (aka
    Javaagent-based, aka in-process)
  - [Standalone](SPM-Monitor---Standalone)

The Embedded version can be used only for monitoring Java-based
applications since it runs as a Java Agent inside the Java process.
 With the Embedded monitor, when setting up SPM for the first time or
when upgrading the monitor, one needs to change the command-line and
restart the process in which the monitor is running (i.e., the process
of the application being monitored), but once that is done, the monitor
runs nicely in-process.  See [SPM Monitor - Javaagent](SPM-Monitor---Javaagent) for more info.

The Standalone version runs in a separate process and can thus be used
for monitoring both Java and non-Java-based applications. If access to
JMX is required and the application to monitor does not have JMX
enabled, one will have to adjust application's command-line parameters
to enable JMX and that will require application process restart.
 However, once that is set up, subsequent SPM client updates will not
require the application restart.  See [SPM Monitor - Standalone](SPM-Monitor---Standalone) for more info.

