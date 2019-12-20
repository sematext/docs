title: Manual set up of JMX monitoring for Java process running in containers
description: In some cases it may be required to set up JMX settings of monitored process manually

There are two things which have to be done to make this happen:
- add process arguments which tell JVM to expose JMX port with specific authentication info
- provide authentication info to Sematext Agent

The first part can be done by defining specific environment variable. Typically its name is `JAVA_TOOL_OPTIONS`, the exceptions to its name are in case of:
- Solr - `SOLR_OPTS`
- Tomcat - `CATALINA_OPTS`
- Zookeeper - `JVMFLAGS`

For password file authentication set the value of `JAVA_TOOL_OPTIONS` (or its equivalent mentioned above) to:

```
-e JAVA_TOOL_OPTIONS='-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=3000 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=true -Dcom.sun.management.jmxremote.password.file=/home/user/passwordServer.txt'
```

For truststore based authentication set its value to:

```
-e JAVA_TOOL_OPTIONS='-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=3000 -Dcom.sun.management.jmxremote.ssl=true -Djavax.net.ssl.keyStorePassword=password123 -Djavax.net.ssl.keyStore=/home/user/server.ks -Dcom.sun.management.jmxremote.authenticate=false'
```

*Note: make sure you adjust the file names and/or password.*
*Note: environment variables above should be added to container you wish to monitor.*


The second part depends on container environment you use.

**Docker/Swarm:**

When using JMX password file authentication add to monitored container:

```
-e SPM_MONITOR_JMX_PASSWORD_FILE=/path/to/your/jmx/password/file
```

When using truststore authentication add to monitored container:

```
-e SPM_MONITOR_JMX_TRUSTSTORE_FILE=/path/to/your/jmx/truststore/file
-e SPM_MONITOR_JMX_TRUSTSTORE_PASSWORD=your-truststore-password
```

*Note: if you use docker-compose.yml you can define these env variables under `environment` section*
*Note: environment variables above are added to container you wish to be monitor.*

**Kubernetes/Helm:**

When using JMX password file authentication run:

```
kubectl create secret generic YOUR_APP_TOKEN_HERE \
  --from-literal=SPM_MONITOR_JMX_PASSWORD_FILE=/path/to/your/jmx/password/file
```

When using truststore authentication run:

```
kubectl create secret generic YOUR_APP_TOKEN_HERE \
  --from-literal=SPM_MONITOR_JMX_TRUSTSTORE_FILE=/path/to/your/jmx/truststore/file \
  --from-literal=SPM_MONITOR_JMX_TRUSTSTORE_PASSWORD=your-truststore-password
```

*Note: make sure you replace `YOUR_APP_TOKEN_HERE` with real token of your App (the same one passed in `MONITORING_TOKEN` env var)*

