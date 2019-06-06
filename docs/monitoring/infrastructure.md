title: Sematext Core Infrastructure Monitoring
description: Sematext Infrastructure Monitoring gives you insight into your whole infrastructure automatically based on the applications, containers, servers and general infrastructure you are monitoring.

Sematext Monitoring provides complete insight into your infrastructure: 

- applications
- servers
- containers
- processes
- inventory
- events, etc.

The centerpiece is a newly introduced Infra App which acts as a container for all data about your infrastructure. As with other App types, you can create as many Infra Apps under your account as you wish. Each Infra App is typically used to gather data from one environment. For example, one Infra App for production environment, one for test environment and one for development environment.

Sematext Cloud will automatically create one Infra App named "Default Infra App" the first time you might need it. You can also create Infra App on your own under Integrations -> Overview.

## How it works

A Golang-based [Sematext agent](../agents/sematext-agent) (included in the spm-client [spm-client](../agents/spm-client) package) will be installed on your machine. This agent sends all infrastructure data to an Infra App whose token is configured during agent installation.

Infra App also includes data about your containerized environments. Installation instructions for Docker Monitoring also include an Infra App token. That way when installing Sematext Agent for Docker, an Infra App will be installed as well.

Infra Apps are currently available to all users for free as a Beta feature.


## Enabling Infra Monitoring

If you've set up Sematext Monitoring at some point in the past, you can easily enable Infra Monitoring by:
- [upgrading](./spm-faq/#agent-updating) your spm-client to latest version
- setting up Infra App token on each of your machines by running <b>setup-infra</b> command (more on that command below)

For Docker monitoring, we suggest uninstalling the existing agent and going through the new setup steps for Docker Monitoring in Sematext Cloud.

When doing a clean installation, regardless of whether you're installing in containerized environment or not, follow monitor installation instructions displayed in Sematext Cloud. Those instructions will always include everything needed to set up an Infra App, either on its own or alongside some other App Agent.


### setup-infra command

Setting up or changing which Infra App should receive infrastructure data and metrics from a particular machine can be done with the <b>setup-infra</b> command. To see which Infra Apps exist in your account visit Sematext Cloud -> Integrations -> Apps. You can choose any of the existing Infra Apps or create a new one. Once you do that you'll have the token of that particular App. To set up the token run the following command on each machine that you wish to update:

<pre>sudo bash /opt/spm/bin/setup-infra --infra-token YOUR_INFRA_APP_TOKEN_HERE</pre>

## Provided features

Infra monitoring provides:
- OS and Container metrics
- Server and Container details
- [Inventory](./inventory)
- [Processes details and metrics](./process)

...  with more added over time.
