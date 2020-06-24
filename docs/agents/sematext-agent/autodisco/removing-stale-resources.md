title: Removing stale resources

description:  Removing App Agent containers and networks after uninstalling the Sematext Agent.

In Kubernetes deployments, Sematext Agent will make sure to remove any lingering App Agent containers once the DaemonSet supervising Sematext Agent pod is deleted. Nevertheless, in vanilla Docker or Swarm setups you have to do the cleanup manually after uninstalling the agent.

### Removing App Agent containers

You have to run the following command on your Docker hosts:

```bash
sudo docker ps -q -f "ancestor=sematext/app-agent:latest" | xargs  docker rm -f
```



### Removing Sematext Agent network

In some situations you you might end up with the `st-agent-net`  network present in your Docker networks. Before removing the network, you have to disconnect all the containers from it. This is achieved via the following command:

```bash
sudo docker network inspect -f '{{range .Containers}}{{println .Name}}{{end}}' st-agent-net | xargs -I {} docker network disconnect st-agent-net {}
```

Now you can successfully delete the network by running:

```bash
sudo docker network rm st-agent-net
```
