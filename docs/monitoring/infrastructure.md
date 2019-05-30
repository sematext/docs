title: Sematext Core Infrastructure Monitoring
description: Sematext Infrastructure Monitoring gives you insight into your whole infrastructure automatically based on the applications, containers, servers and general infrastructure you are monitoring.


Points to cover:

## Overview

Sematext Monitoring provides complete insight into your infrastructure - applications, servers, containers, processes, inventory, events...

The centerpiece is newly introduced Infra App which acts as a container for all infrastructural data about your architecture. As with other App types, you can create as many Infra Apps under your account as you wish. Each Infra App would typically be used to gather data from one environment (for example, one Infra App for production environment, one for test environment and one for development environment).

SematextCloud UI will automatically create one Infra App named "Default Infra App" the first time you might need it. You can also create Infra App on your own under Integrations->Overview.

## How it works

New Golang-based [Sematext agent](../agents/sematext-agent) (which is part of [spm-client](../agents/spm-client) installer) will be installed on your machine. It is sending all infrastructure data and metrics to token of one of your Infra Apps. This token is configured as part of installation instructions you can find in SematextCloud UI. It can be installed either on its own (in which case you would have only Infra monitoring enabled on particular machine) or while installing one of Sematext App Agents (for example Kafka or Elasticsearch agent) - SematextCloud UI always shows the instructions which include Infra App token.

Infra App can also be used to gather data about your containerized environments. Installation instructions for SPM Docker also include Infra App token, so by installing Sematext Docker agent, you will automatically install Infra App monitoring along.

Infra Apps are currently available to all users for free as a Beta feature.


## Enabling Infra Monitoring

In case you set up Sematext monitoring at some point in the past, you can easily enable Infra monitoring by doing:
- [upgrade](./spm-faq/#agent-updating) your spm-client to latest version
- setup Infra App token on each of your machines by running <b>setup-infra</b> command (more on that command below) 

In case of SPM Docker monitoring, we suggest uninstalling existing agent and going through new setup steps for SPM Docker installation in SematextCloud UI.

When doing a clean installation, regardless of whether installing in containerized environemnt or not, just follow monitor installation instructions displayed in SematextCloud UI - those instructions will always include everything needed to setup Infra App (either on its own or along with some App Agent).


### setup-infra command

Setting up or changing which Infra App should receive infrastructure data and metrics from particular machine can be done with <b>setup-infra</b> command. To see which Infra Apps exist under your account visit SematextCloud UI Integrations->Apps. You can choose any of the existing Infra Apps or create a new one. Once you do that you'll have the token of that particular App. To setup the token run the following command on each machine that you wish to update:

<pre>sudo bash /opt/spm/bin/setup-infra --infra-token YOUR_INFRA_APP_TOKEN_HERE</pre>

## Provided features

Infra monitoring provides:
- OS and Container metrics
- Server and Container details
- [Inventory](./inventory)
- [Processes details and metrics](./process)

... and many more in near future.
