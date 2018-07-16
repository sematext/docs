title: Sematext Java Agent Chef Recipe
description: Automated configuration management Chef recipe for Sematext infrastructure and services monitoring java agent

The following is an **example** Chef Recipe for installing [SPM client](spm-client).

``` bash
# Author: Charles Sullivan (charles@fullcontact.com)
# Based on: https://gist.github.com/CharlieSu/6195243
if node.spm[:token]  # Will only run if a SPM token is present.
  apt_repository "sematext" do
    action :add
    uri "http://pub-repo.sematext.com/ubuntu"
    distribution node['lsb']['codename']
    components ["main"]
    key "http://pub-repo.sematext.com/ubuntu/sematext.gpg.key"
    notifies :run, "execute[apt-get update]", :immediately
  end
 
  package "spm-client"
 
  service "spm-monitor" do
    action :nothing
  end
 
  bash "spm-client-setup-conf.sh" do
    user "root"
    cwd "/tmp"
    code "bash /opt/spm/bin/spm-client-setup-conf.sh #{node.spm[:token]} es standalone"
    creates "/opt/spm/spm-monitor/conf/spm-monitor-config-#{node.spm[:token]}-default.properties"
    notifies :restart, "service[spm-monitor]"
  end
  
end
```

**Notes**:

  - line 10: assumes Debian-based distribution.  For other distributions
    replace "apt-get" with distribution-specific equivallent (e.q. yum
    on RedHat-based distros)
  - line 22: change "es" to appropriate type based on the type seen for
    your SPM app on <https://apps.sematext.com/ui/our-integrations>
  - line 22: change "standalone" to "javaagent" if you want an
    [embedded/in-process agent](spm-monitor-javaagent)
    and not a [standalone process agent](spm-monitor-standalone)
  - line 24: this is relevant only for "standalone" agent  
