title: Sematext Infra & App Agent
description: Sematext Infra & App Agent (spm-client) is used for IT infrastructure monitoring, 
collecting OS & Network metrics, application metrics from JMX, REST APIs, 
and from databases that support JDBC as well as transaction traces collection and on demand JVM profiling.

Sematext Infra & App Agent is also known as SPM Monitor or SPM Client.

The App Agent is open-source, written in Java (but not limited to
monitoring Java!), with a number of built-in integrations available
from the
[sematext-agent-integrations](https://github.com/sematext/sematext-agent-integrations)
repo. You can add your own integrations for monitoring additional
infrastructure and services.  Pull requests welcome!

## Capabilities

These agents communicates with Sematext via HTTPS.  It buffers data on
disk in case it cannot immediately ship it, ensuring data is never
lost.

### Application monitoring

Lightweight and pluggable, this agent comes with a number of out of
the box integrations. It has built-in support for collecting metrics
from JMX, REST APIs, and from databases that support JDBC.

### Tracing

SPM Monitor agent can also instrument JVM-based apps using bytecode
instrumentation to collect [transaction traces](../tracing).

### Profiling

On demand [JVM profiling](on-demand-profiling) to help you find
bottlenecks in your code.

## Installation

The SPM Monitor is available as a package (DEB, RPM, etc.) called spm-client:

<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
 <div class="mdl-tabs__tab-bar">
     <a href="#redhat" class="mdl-tabs__tab is-active">Red Hat</a>
     <a href="#centos" class="mdl-tabs__tab">CentOS</a>
     <a href="#debian" class="mdl-tabs__tab">Debian</a>
     <a href="#ubuntu" class="mdl-tabs__tab">Ubuntu</a>
     <a href="#amazonlinux" class="mdl-tabs__tab">Amazon Linux</a>
     <a href="#fedora" class="mdl-tabs__tab">Fedora</a>
     <a href="#suse" class="mdl-tabs__tab">SuSE</a>
 </div>

 <div class="mdl-tabs__panel is-active" id="redhat">
   <pre>
sudo wget https://pub-repo.sematext.com/redhat/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
   </pre>
 </div>
 <div class="mdl-tabs__panel" id="centos">
   <pre>
sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
   </pre>
 </div>
 <div class="mdl-tabs__panel" id="debian">
   <pre>
echo "deb http://pub-repo.sematext.com/debian sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
wget -O - https://pub-repo.sematext.com/debian/sematext.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install spm-client
   </pre>
 </div>

 <div class="mdl-tabs__panel" id="ubuntu">
   <pre>
echo "deb http://pub-repo.sematext.com/ubuntu sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
wget -O - https://pub-repo.sematext.com/ubuntu/sematext.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install spm-client
   </pre>
 </div>

 <div class="mdl-tabs__panel" id="amazonlinux">
   <pre>
sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
   </pre>
 </div>

 <div class="mdl-tabs__panel" id="fedora">
   <pre>
sudo wget https://pub-repo.sematext.com/fedora/sematext.repo -O /etc/yum.repos.d/sematext.repo
sudo yum clean all
sudo yum install spm-client
   </pre>
 </div>

 <div class="mdl-tabs__panel" id="suse">
   <pre>
sudo zypper ar -r https://pub-repo.sematext.com/suse/11/sematext.repo
sudo zypper up
sudo zypper in spm-client
   </pre>
 </div>
</div>

## App Agent Run modes

### Embedded

The [Embedded](spm-monitor-javaagent) mode can be used only for
monitoring Java-based applications since it runs as a Java Agent
inside the Java process.  With the Embedded monitor, when setting it
up for the first time or when upgrading the monitor, one needs to
change the command-line and restart the process in which the monitor
is running (i.e., the process of the application being monitored), but
once that is done, the monitor runs seamlessly in-process. See [SPM
Monitor - Javaagent](spm-monitor-javaagent) for more info.

### Standalone

In the [Standalone](spm-monitor-standalone) mode the agent runs in a
separate process and can thus be used for monitoring both Java and
non-Java-based applications. If access to JMX is required and the
application to monitor does not have JMX enabled, one will have to
adjust application's command-line parameters to enable JMX and that
will require application process restart.  However, once that is set
up, subsequent agent updates will not require the application
restart. See [SPM Monitor - Standalone](spm-monitor-standalone) for
more info.

## Requirements

Java 6 and above.
