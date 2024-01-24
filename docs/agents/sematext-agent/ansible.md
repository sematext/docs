title: Sematext Agent Ansible Installation
description: Automated configuration management Ansible Playbook for Sematext infrastructure and services monitoring

Ansible can be used for automating the deployment of [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) in multiple hosts across your infrastructure. Using the Sematext Agent Ansible role you can easily extend your existing Playbooks and [start monitoring](https://sematext.com/docs/monitoring/) thousands of servers within minutes.

## Sematext Agent Ansible Role
The Sematext Agent role contains everything required to install Sematext Agent in a specified list of hosts from Ansible inventory. It can be installed either through Ansible Galaxy or manually from the [ansible-install-sematext repository](https://github.com/sematext/ansible-install-sematext).


### Install from Ansible Galaxy
Install the [Sematext Agent role from Ansible Galaxy](https://galaxy.ansible.com/ui/standalone/roles/sematext/spm-monitor-install/) on your [Ansible control node](https://docs.ansible.com/ansible/latest/network/getting_started/basic_concepts.html#control-node) by issuying the following command:

```ansible-galaxy role install sematext.spm-monitor-install```


### Manual Installation
If you want to manually install the role, clone the [ansible-install-sematext](https://github.com/sematext/ansible-install-sematext) repo in the control node and copy this repo to ~/.ansible/roles/sematext.spm-monitor-install.


### Supported Platforms
Linux distributions:

- Ubuntu
    - trusty
    - xenial
    - bionic
    - focal
    - jammy
- Debian
    - wheezy
    - jessie
    - stretch
    - buster
    - bullseye
    - bookworm
- EL 6, 7, 8, 9
- Fedora 38
- Amazon Linux 2

## Deploying Sematext Agent

### Create an Infra App in Sematext Cloud
After you get logged into Sematext Cloud at https://apps.sematext.com (or https://apps.eu.sematext.com if using Sematext Cloud Europe), the first step is to [create an Infra App](https://sematext.com/docs/monitoring/infrastructure/#create-an-infra-app) to start monitor your infrastructure. After entering the App name, select Ansible from the list of the environments. Make sure to copy the infra token, it will be needed later to pass it as a var in your Ansible Playbook.

### Install the agent using an Ansible Playbook
You can integrate the Sematext Ansible role in your existing Playbooks or create a new one. Here is an example usage:

```
- hosts: all
  gather_facts: yes
  become: yes
  vars:
    infra_token: INFRA_TOKEN
  roles:
    - { role: sematext.spm-monitor-install }

```

`INFRA_TOKEN` is your infra token that you copied earlier from Sematext Cloud.

Run your Playbook using the following command:

```ansible-playbook -i hosts sematext-agent-playbook.yaml```

where `hosts` is your Ansible inventory and `sematext-agent-playbook.yaml` is the name of your Playbook.

This command will deploy Sematext agent in all hosts defined in your Playbook. As soon as the command completes successfully, you can visit Sematext Cloud and see all your hosts online under Infrastructure.
