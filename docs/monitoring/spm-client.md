Title: Sematext Monitoring Agent Java

Sematext Monitoring agent is also known as SPM Monitor or SPM Client.

The agent is open-source and its built-in integrations are published
in
[sematext-agent-integrations](https://github.com/sematext/sematext-agent-integrations)
repo.  You can add your own integrations for monitoring
additional infrastructure and services.  Pull requests welcome!


### Capabilities

#### Infrastructure monitoring

Lightweight and pluggable, this agent comes with a number of out of
the box integrations. It has built-in support for collecting metrics
from JMX, REST APIs, and from databases that support JDBC.  

#### Tracing

SPM Monitor agent can also instrument JVM-based apps using bytecode
instrumentation to collect [transaction traces](../tracing).

#### Profiling

On demand [JVM profiling](on-demand-profiling) to help you find
bottlenecks in your code.

### Installation

The SPM Monitor is available as a package (DEB, RPM, etc.) called spm-client:

!!! abstract "Red Hat"
    sudo wget https://pub-repo.sematext.com/redhat/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo yum clean all
    sudo yum install spm-client

#### CentOS
```sh
sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
```
#### Debian
```sh
echo "deb http://pub-repo.sematext.com/debian sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
wget -O - https://pub-repo.sematext.com/debian/sematext.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install spm-client
```
#### Ubuntu
```sh
echo "deb http://pub-repo.sematext.com/ubuntu sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
wget -O - https://pub-repo.sematext.com/ubuntu/sematext.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install spm-client
```
#### Amazon Linux
```sh
sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
```
#### Fedora
```sh
sudo wget https://pub-repo.sematext.com/fedora/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
```
#### SuSE
```sh
sudo zypper ar -r https://pub-repo.sematext.com/suse/11/sematext.repo
sudo zypper up
sudo zypper in spm-client
```

### Run modes

#### Embedded

The [Embedded](spm-monitor-javaagent) mode can be used only for
monitoring Java-based applications since it runs as a Java Agent
inside the Java process.  With the Embedded monitor, when setting it
up for the first time or when upgrading the monitor, one needs to
change the command-line and restart the process in which the monitor
is running (i.e., the process of the application being monitored), but
once that is done, the monitor runs seamlessly in-process. See [SPM
Monitor - Javaagent](spm-monitor-javaagent) for more info.

#### Standalone

In the [Standalone](spm-monitor-standalone) mode the agent runs in a
separate process and can thus be used for monitoring both Java and
non-Java-based applications. If access to JMX is required and the
application to monitor does not have JMX enabled, one will have to
adjust application's command-line parameters to enable JMX and that
will require application process restart.  However, once that is set
up, subsequent agent updates will not require the application
restart. See [SPM Monitor - Standalone](spm-monitor-standalone) for
more info.


### Requirements

Java 6 and above.
