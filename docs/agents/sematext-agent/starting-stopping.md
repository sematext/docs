title: Restarting/stopping the Sematext Agent
description: Info about how to restart/stop the Sematext Agent

Since Sematext Agent can be [installed](installation) in different environments, there are different ways in which it can be restarted
or stopped.

## Linux

To stop the agent, run:

```
sudo service sematext-agent stop
```

To restart the agent, run:

```
sudo service sematext-agent restart
```

To remove the agent, run distribution-specific command to remove the sematext-agent rpm or deb package.

## Windows

Check the Windows installation page [for starting, stoping or restarting Sematext Agent in Windows](https://sematext.com/docs/agents/sematext-agent/#how-to-start--stop--restart-sematext-agent
).

## Docker

In Docker environment agent can be started using `docker run` command or using a docker-compose config. 

To stop the agent, run:

```
docker stop st-agent
```

and remove it with:

```
docker rm st-agent
```

To avoid agent starting after `docker-compose up` is executed the next time, ensure its definition is removed from your
docker-compose config file.

## Swarm

In Swarm environment agent can be started using `docker service create` command or using a docker-compose config.

To remove the agent run:

```
docker service rm st-agent
```

When using docker-compose, ensure you remove the agent from your config.

## Kubernetes

To remove the agent, run:

```
kubectl delete ds sematext-agent --ignore-not-found=true
```

When using helm, remove the agent with:

```
helm delete st-agent
```

If you used [Sematext Operator](https://github.com/sematext/sematext-operator), remove the agent with:

```
kubectl delete SematextAgent sematextagent 
kubectl delete -f https://raw.githubusercontent.com/sematext/sematext-operator/master/bundle.yaml
```

## Nomad

To stop the agent running in Nomad environment, run:

```
nomad job stop sematext-agent
```

To remove it, run:

```
nomad job delete sematext-agent
```

## Podman

Removing the agent in Podman setup can be done with the command:

```
podman rm -f st-agent
```