title: Installing Sematext Agent on Linux

The Sematext Agent is available as a package (DEB, RPM, etc.) called `sematext-agent`:

=== "Red Hat"

    ### Installing on Red Hat
    ```bash
    sudo wget https://pub-repo.sematext.com/redhat/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo yum clean all
    sudo yum install sematext-agent
    ```

    ### Upgrading/Updating on Red Hat
    1. Update the repository file and GPG key:
    ```bash
    sudo wget https://pub-repo.sematext.com/redhat/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo rpm --import https://pub-repo.sematext.com/redhat/sematext.gpg.key
    ```
    2. Upgrade the Sematext Agent:
    ```bash
    sudo yum update sematext-agent
    ```

    ### Uninstalling on Red Hat
    ```bash
    sudo yum remove sematext-agent
    ```
    To ensure all configuration files and logs are removed, delete the main installation directory:
    ```bash
    sudo rm -rf /opt/spm
    ```

=== "CentOS"

    ### Installing on CentOS
    ```bash
    sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo yum clean all
    sudo yum install sematext-agent
    ```

    ### Upgrading/Updating on CentOS
    1. Update the repository file and GPG key:
    ```bash
    sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo rpm --import https://pub-repo.sematext.com/centos/sematext.gpg.key
    ```
    2. Upgrade the Sematext Agent:
    ```bash
    sudo yum update sematext-agent
    ```

    ### Uninstalling on CentOS
    ```bash
    sudo yum remove sematext-agent
    ```
    To ensure all configuration files and logs are removed, delete the main installation directory:
    ```bash
    sudo rm -rf /opt/spm
    ```

=== "Debian"

    ### Installing on Debian
    ```bash
    echo "deb http://pub-repo.sematext.com/debian sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
    wget -O - https://pub-repo.sematext.com/debian/sematext.gpg.key | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install sematext-agent
    ```

    ### Upgrading/Updating on Debian
    1. Update the repository file and GPG key:
    ```bash
    echo "deb http://pub-repo.sematext.com/debian sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
    wget -O - https://pub-repo.sematext.com/debian/sematext.gpg.key | sudo apt-key add -
    sudo apt-get update
    ```
    2. Upgrade the Sematext Agent:
    ```bash
    sudo apt-get upgrade sematext-agent
    ```

    ### Uninstalling on Debian
    ```bash
    sudo apt-get remove --purge sematext-agent
    ```
    To ensure all configuration files and logs are removed, delete the main installation directory:
    ```bash
    sudo rm -rf /opt/spm
    ```

=== "Ubuntu"

    ### Installing on Ubuntu
    ```bash
    echo "deb http://pub-repo.sematext.com/ubuntu sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
    wget -O - https://pub-repo.sematext.com/ubuntu/sematext.gpg.key | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install sematext-agent
    ```

    ### Upgrading/Updating on Ubuntu
    1. Update the repository file and GPG key:
    ```bash
    echo "deb http://pub-repo.sematext.com/ubuntu sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null
    wget -O - https://pub-repo.sematext.com/ubuntu/sematext.gpg.key | sudo apt-key add -
    sudo apt-get update
    ```
    2. Upgrade the Sematext Agent:
    ```bash
    sudo apt-get upgrade sematext-agent
    ```

    ### Uninstalling on Ubuntu
    ```bash
    sudo apt-get remove --purge sematext-agent
    ```
    To ensure all configuration files and logs are removed, delete the main installation directory:
    ```bash
    sudo rm -rf /opt/spm
    ```

=== "Amazon Linux"

    ### Installing on Amazon Linux
    ```bash
    sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo yum clean all
    sudo yum install sematext-agent
    ```

    ### Upgrading/Updating on Amazon Linux
    1. Update the repository file and GPG key:
    ```bash
    sudo wget https://pub-repo.sematext.com/centos/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo rpm --import https://pub-repo.sematext.com/centos/sematext.gpg.key
    ```
    2. Upgrade the Sematext Agent:
    ```bash
    sudo yum update sematext-agent
    ```

    ### Uninstalling on Amazon Linux
    ```bash
    sudo yum remove sematext-agent
    ```
    To ensure all configuration files and logs are removed, delete the main installation directory:
    ```bash
    sudo rm -rf /opt/spm
    ```

=== "Fedora"

    ### Installing on Fedora
    ```bash
    sudo wget https://pub-repo.sematext.com/fedora/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo dnf clean all
    sudo dnf install sematext-agent
    ```

    ### Upgrading/Updating on Fedora
    1. Update the repository file and GPG key:
    ```bash
    sudo wget https://pub-repo.sematext.com/fedora/sematext.repo -O /etc/yum.repos.d/sematext.repo
    sudo rpm --import https://pub-repo.sematext.com/fedora/sematext.gpg.key
    ```
    2. Upgrade the Sematext Agent:
    ```bash
    sudo dnf update sematext-agent
    ```

    ### Uninstalling on Fedora
    ```bash
    sudo dnf remove sematext-agent
    ```
    To ensure all configuration files and logs are removed, delete the main installation directory:
    ```bash
    sudo rm -rf /opt/spm
    ```

=== "SuSE"

    ### Installing on SuSE
    ```bash
    sudo zypper ar -r https://pub-repo.sematext.com/suse/11/sematext.repo
    sudo zypper up
    sudo zypper in sematext-agent
    ```

    ### Upgrading/Updating on SuSE
    1. Update the repository file and GPG key:
    ```bash
    sudo zypper rr sematext
    sudo zypper ar -r https://pub-repo.sematext.com/suse/11/sematext.repo
    sudo rpm --import https://pub-repo.sematext.com/suse/sematext.gpg.key
    ```
    2. Upgrade the Sematext Agent:
    ```bash
    sudo zypper update sematext-agent
    ```

    ### Uninstalling on SuSE
    ```bash
    sudo zypper rm sematext-agent
    ```
    To ensure all configuration files and logs are removed, delete the main installation directory:
    ```bash
    sudo rm -rf /opt/spm
    ```

---

## Configure communication with Sematext Cloud using your Infra App Token

Once the Sematext Agent is installed, you need to configure it to communicate with Sematext Cloud. This is done by setting your Infra App token using the following command:

```
sudo bash /opt/spm/bin/setup-infra --infra-token <YOUR_INFRA_APP_TOKEN_HERE>
```

If you're setting up the agent in the EU region, you'll have to provide the `region` option:

```
sudo bash /opt/spm/bin/setup-infra --infra-token <YOUR_INFRA_APP_TOKEN_HERE> --region eu
```

You can find your Infra App token by navigating to `Fleet and Discovery > Agents > Install Agent` and selecting your Linux distribution.

![Infra App Instructions](/docs/agents/sematext-agent/images/infra-app-instructions.png)

## Extra configuration for Monitoring and Logs Integrations

To fully enable monitoring and logging for specific integrations, additional configuration steps are required after the Sematext Agent installation or upgrade. These steps are provided directly after the installation instructions for each integration in Sematext Cloud:

![Agent Access Settings](/docs/agents/sematext-agent/images/agent-access-settings.gif)

The integrations that require this extra configuration include:

- Cassandra
- Couchbase
- Hadoop
- HBase
- Kafka
- Solr
- Solr Cloud
- Spark
- Storm
- Tomcat
- Zookeeper
- Jenkins
- JVM
- Elasticsearch
- OpenSearch
- Redis
- HAProxy
- MySQL
- Nginx Plus
- ClickHouse
- PostgreSQL
- RabbitMQ

Follow the specific setup instructions for each integration to ship metrics and logs from the agent to Sematext Cloud.

## Running Sematext Agent with SELinux enabled

With SELinux enabled, starting the agent with `sudo service sematext-agent restart` may result in an error message like:

`Job for sematext-agent.service failed because the control process exited with error code.`

Some of the Agent processes may not be started as a consequence. Exact error can depend on your SELinux settings and it can
be found in `/var/log/audit/audit.log`. Using `audit2allow` utility, it is possible to generate policy package file that can
be activated to remove restrictions that caused the error. For example:

`sudo grep -a AVC /var/log/audit/audit.log | grep spm-monitor | audit2allow -M sematext-systemd-selinux`

You can review the policy stored in type enforcement file (in this case named `sematext-systemd-selinux.te`) to see whether it suits your security guidelines. To activate this policy,
run:

`semodule -i sematext-systemd-selinux.pp`

If you decide to make adjustments in the type enforcement file, it should first be compiled into policy module:

`checkmodule -M -m -o sematext-systemd-selinux.mod sematext-systemd-selinux.te`

and then compile into policy package:

`semodule_package -o sematext-systemd-selinux.pp -m sematext-systemd-selinux.mod`

which can be activated using previously mentioned `semodule -i` command.

Note: if SELinux is deliberately enabled on your machines, make sure that policy package being imported is in line with your security guidelines.
