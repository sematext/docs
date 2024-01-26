title: Sematext Agent Ansible Installation
description: Automated configuration management using Ansible playbooks for Sematext infrastructure and services monitoring

Ansible can be used for automating the deployment of [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) in multiple hosts across your infrastructure. Using the Sematext Agent Ansible role you can easily extend your existing playbooks and [start monitoring](https://sematext.com/docs/monitoring/) thousands of servers within minutes.

## Ansible Introduction
[Ansible](https://docs.ansible.com) is an open-source automation tool designed for configuration management, application deployment, and task automation. 

Ansible uses the concepts of control and managed nodes. It connects from the [control node](https://docs.ansible.com/ansible/latest/network/getting_started/basic_concepts.html#control-node) where Ansible is installed, to the managed nodes sending commands and instructions to them over SSH protocol.

Ansible utilizes a very simple language, YAML, to define [playbooks](https://docs.ansible.com/ansible/latest/playbook_guide/index.html) in a human-readable data format that is really easy to understand from day one.

## Ansible Installation
You can use `pipx` to install Ansible in your machine:

```
pipx install --include-deps ansible
```

Make sure to add the newly created directories in PATH: 

```
pipx ensurepath
```

For more installation methods, check out the [official installation instructions](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible).

## Setup Inventory
An Ansible [inventory](https://docs.ansible.com/ansible/latest/inventory_guide/index.html) is a list of all hosts that will be managed by Ansible. They can be logically grouped by webservers, databases, production, etc. Check out the [official documentation](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html#inventory-basics-formats-hosts-and-groups) to learn more.

The inventory file can be saved anywhere, and in its simplest form for two hosts, it appears as shown below:

```
[servers]
server1 ansible_host=15.15.225.101 ansible_port=22 ansible_ssh_user=ubuntu ansible_ssh_private_key_file=/home/ubuntu/server1-key.pem
server2 ansible_host=15.15.225.102 ansible_port=22 ansible_ssh_user=ubuntu ansible_ssh_private_key_file=/home/ubuntu/server2-key.pem
```

where:

- `server1`, `server2` are [aliases](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html#inventory-aliases)
- `ansible_host` is the IP address of each host
- `ansible_port` is the SSH host port
- `ansible_ssh_user` is the SSH username
- `ansible_ssh_private_key_file` is the private SSH certificate file of each host

If your inventory file is named `hosts` then you can verify whether you can ping all your hosts with the following command:

```
ansible -i hosts all -m ping
```

If the hosts are reachable, you should expect a response like the one below:

```
server1 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
server2 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```


## Sematext Agent Ansible Role
The Sematext Agent role contains everything required to install Sematext Agent in a specified list of hosts according to the Ansible playbook that will be used. It can be installed either through Ansible Galaxy or manually from the [ansible-install-sematext repository](https://github.com/sematext/ansible-install-sematext).


### Install from Ansible Galaxy
Install the [Sematext Agent role from Ansible Galaxy](https://galaxy.ansible.com/ui/standalone/roles/sematext/spm-monitor-install/) on your control node by issuying the following command:

```ansible-galaxy role install sematext.spm-monitor-install```


### Manual Installation
If you want to manually install the role, clone the [ansible-install-sematext](https://github.com/sematext/ansible-install-sematext) repo in the control node and copy this repo to `~/.ansible/roles/sematext.spm-monitor-install`.


### Supported Platforms
Linux distributions:

- Ubuntu
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
- Red Hat Enterprise Linux 6, 7, 8, 9
- Fedora 38
- Amazon Linux 2

## Deploying Sematext Agent

### Create an Infra App in Sematext Cloud
After you get logged into Sematext Cloud at [https://apps.sematext.com](https://apps.sematext.com) (or [https://apps.eu.sematext.com](https://apps.eu.sematext.com) if using Sematext Cloud Europe), the first step is to [create an Infra App](https://sematext.com/docs/monitoring/infrastructure/#create-an-infra-app) to start monitor your infrastructure. After entering the App name, select Ansible from the list of the environments. Make sure to copy the provided infra token, it will be needed later to pass it as a var in your Ansible playbook.

### Install the agent using an Ansible playbook
You can integrate the Sematext Ansible role in your existing playbooks or create a new one. Here is an example playbook:

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

Run your playbook using the following command:

```ansible-playbook -i hosts sematext-agent-playbook.yaml```

where `hosts` is your Ansible inventory and `sematext-agent-playbook.yaml` is the name of your playbook.

This command will deploy Sematext agent in all hosts defined in your playbook. As soon as the command completes successfully, you can visit Sematext Cloud and see all your hosts online under Infrastructure.

## Configuring Custom Tags
It is also possible to define [custom tags](https://sematext.com/docs/tags/custom-tags/) in your playbook, by adding the following tasks defining the tags:

```
  tasks:
    - name: Append tags to st-agent.yml
      blockinfile:
        path: /opt/spm/properties/st-agent.yml
        block: |
          tags: "env:dev, project:projectName, role:webfrontend"

    - name: Restart sematext-agent service
      service:
        name: sematext-agent
        state: restarted
```

Check out [Sematext Tags](https://sematext.com/docs/tags/#why-tags-matter) to learn more about why Tags matter and the benefits using them.
