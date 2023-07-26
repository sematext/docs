title: hostNetwork Setting Usage for Control Plane Components Monitoring
description: Explains why we need `hostNetwork` access and how to turn it off if desired.

## What is hostNetwork?

In Kubernetes, the `hostNetwork` is a configuration option that allows a container to share the network namespace of its host node. When `hostNetwork` is enabled for a pod, it means that the pod's containers will use the networking stack of the underlying host machine instead of having their own isolated network stack.

## Sematext Agent and hostNetwork Access

Sematext Agent requires `hostNetwork: true` setting to monitor the control plane components. By default, the `hostNetwork` setting is set to `true` starting from version 3.0.0 of Sematext Agent.

## Turning Off hostNetwork Access

If you want to turn off `hostNetwork` access, it's important to note that you may lose the ability to monitor some control plane components. However, if you still want to proceed, here are the instructions based on the installation method you are using:

### Helm Installation

Include the following parameter in your regular Helm installation command: `--set hostNetwork=false`.

### kubectl Installation

Remove the following variables from your YAML file if they are present: `hostNetwork`, `dnsPolicy`.
