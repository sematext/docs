title: Supported Services
description: Complete list of services automatically detected by Network Map.

Network Map automatically detects and identifies over 100 service types across your infrastructure. Detection uses multiple signals including container images, process names, ports, and Kubernetes metadata.

## Databases

### SQL Databases

| Service | Default Ports |
|---------|---------------|
| PostgreSQL | 5432 |
| MySQL | 3306 |
| MariaDB | 3306 |
| Percona | 3306 |
| Oracle | 1521 |
| SQL Server | 1433 |
| CockroachDB | 26257 |
| TimescaleDB | 5432 |

### NoSQL Databases

| Service | Default Ports |
|---------|---------------|
| MongoDB | 27017 |
| Cassandra | 9042, 7000 |
| ScyllaDB | 9042 |
| CouchDB | 5984 |
| Couchbase | 8091 |
| Neo4j | 7474, 7687 |
| ArangoDB | 8529 |
| RethinkDB | 8080, 28015 |
| OrientDB | 2424 |

### Key-Value & Cache

| Service | Default Ports |
|---------|---------------|
| Redis | 6379 |
| Memcached | 11211 |
| Hazelcast | 5701 |
| etcd | 2379, 2380 |

### Time Series Databases

| Service | Default Ports |
|---------|---------------|
| InfluxDB | 8086 |
| Prometheus | 9090 |
| VictoriaMetrics | 8428 |

## Search & Analytics

| Service | Default Ports |
|---------|---------------|
| Elasticsearch | 9200, 9300 |
| OpenSearch | 9200, 9600 |
| Apache Solr | 8983 |
| Sphinx | 9312 |
| Manticore | 9306 |
| Meilisearch | 7700 |
| Typesense | 8108 |

## Web Servers & Proxies

| Service | Default Ports |
|---------|---------------|
| Nginx | 80, 443 |
| Apache (httpd) | 80, 443 |
| Caddy | 80, 443 |
| Traefik | 80, 443, 8080 |
| HAProxy | 80, 443 |
| Envoy | 8001, 9901 |
| Kong | 8000, 8443 |
| Ambassador | 8080 |
| Contour | 8001 |

## Service Mesh

| Service | Default Ports |
|---------|---------------|
| Istio Proxy | 15001, 15006 |
| Linkerd | 8086 |
| Consul | 8500, 8600 |

## Message Queues & Streaming

| Service | Default Ports |
|---------|---------------|
| Apache Kafka | 9092 |
| ZooKeeper | 2181 |
| RabbitMQ | 5672, 15672 |
| ActiveMQ | 61616, 8161 |
| Artemis | 61616 |
| NATS | 4222 |
| Apache Pulsar | 6650, 8080 |
| Redpanda | 9092 |
| EventStore | 2113 |
| NSQ | 4150, 4161 |

## Monitoring & Observability

| Service | Default Ports |
|---------|---------------|
| Grafana | 3000 |
| Jaeger | 14268, 16686 |
| Zipkin | 9411 |
| Kibana | 5601 |
| OpenSearch Dashboards | 5601 |
| OpenTelemetry Collector | 4317, 4318 |
| Datadog Agent | - |
| New Relic Agent | - |

## Logging

| Service | Default Ports |
|---------|---------------|
| Splunk | 8000, 8089 |
| Fluentd | 24224 |
| Fluent Bit | 24224 |
| Logstash | 5044, 9600 |
| Filebeat | - |
| Metricbeat | - |
| Telegraf | - |

## Application Servers

### Java Application Servers

| Service | Default Ports |
|---------|---------------|
| Apache Tomcat | 8080, 8443 |
| Jetty | 8080 |
| WildFly (JBoss) | 8080, 9990 |
| WebSphere | 9060 |
| WebLogic | 7001 |
| Spring Boot | 8080 |

### Application Runtimes

| Service | Detected From |
|---------|---------------|
| Java applications | Process, container image |
| Node.js | Process, container image |
| Python | Process, container image |
| Go | Container image |
| Ruby | Process, container image |
| PHP (PHP-FPM) | Process, container image |
| .NET | Process, container image |
| Rust | Container image |
| Scala | Container image |

## Container & Orchestration

| Service | Default Ports |
|---------|---------------|
| Kubernetes | 6443 |
| Docker | 2375, 2376 |
| containerd | - |
| Podman | - |
| CRI-O | - |
| OpenShift | 8443 |
| Rancher | 443 |
| Nomad | 4646 |

## CI/CD & DevOps

| Service | Default Ports |
|---------|---------------|
| GitLab | 80, 443 |
| Jenkins | 8080 |
| SonarQube | 9000 |
| Nexus | 8081 |
| Artifactory | 8081 |

## Security & Identity

| Service | Default Ports |
|---------|---------------|
| HashiCorp Vault | 8200 |
| Keycloak | 8080 |
| LDAP (OpenLDAP) | 389, 636 |

## Storage

| Service | Default Ports |
|---------|---------------|
| MinIO | 9000 |

## Supported Protocols

Network Map also detects the network protocol used in each connection. This helps you understand not just which services are communicating, but how they're communicating.

### Web & API

| Protocol | Default Ports |
|----------|---------------|
| HTTP | 80, 8080 |
| HTTPS | 443, 8443 |

### Database

| Protocol | Default Ports |
|----------|---------------|
| MySQL | 3306 |
| PostgreSQL | 5432 |
| MongoDB | 27017 |
| Redis | 6379 |
| Cassandra | 9042 |

### Messaging

| Protocol | Default Ports |
|----------|---------------|
| Kafka | 9092 |
| AMQP (RabbitMQ) | 5672 |
| NATS | 4222 |

### Search

| Protocol | Default Ports |
|----------|---------------|
| Elasticsearch HTTP | 9200 |
| Elasticsearch Transport | 9300 |

### Monitoring

| Protocol | Default Ports |
|----------|---------------|
| Prometheus | 9090 |
| Grafana | 3000 |
| InfluxDB | 8086 |

### Container & Orchestration

| Protocol | Default Ports |
|----------|---------------|
| Kubernetes API | 6443 |
| Kubelet | 10250 |
| Docker API | 2375, 2376 |
| etcd | 2379 |

### Service Mesh

| Protocol | Default Ports |
|----------|---------------|
| Envoy Admin | 15000 |
| Consul | 8500 |

### Infrastructure

| Protocol | Default Ports |
|----------|---------------|
| DNS | 53 |
| SSH | 22 |
| LDAP | 389, 636 |

### Email

| Protocol | Default Ports |
|----------|---------------|
| SMTP | 25, 465, 587 |
| IMAP | 143, 993 |
| POP3 | 110, 995 |

### File Transfer

| Protocol | Default Ports |
|----------|---------------|
| FTP | 21 |
| TFTP | 69 |

### Remote Access

| Protocol | Default Ports |
|----------|---------------|
| RDP | 3389 |
| VNC | 5900 |

Connections on unrecognized ports appear with generic labels showing the port number.

## Detection Methods

Network Map uses multiple detection methods with varying confidence levels:

| Method | Confidence | Description |
|--------|------------|-------------|
| Container image | High | Matches known service patterns in image names |
| Process executable | High | Identifies services by process name (e.g., `nginx`, `postgres`) |
| JVM analysis | Medium-High | Analyzes Java command lines, JAR names, and system properties |
| Container labels | Medium | Reads Docker/Kubernetes labels like `app.kubernetes.io/name` |
| Port analysis | Medium | Infers service type from well-known ports |
| Kubernetes metadata | Medium | Extracts service names from pod names and labels |
| Environment variables | Low-Medium | Checks for `SERVICE_NAME`, `APP_NAME`, etc. |

When multiple detection methods match, the highest confidence result is used.

## Unrecognized Services

Services not matching any known patterns appear with generic names based on their process executable or container image. They still show up on the map with their connections and metrics - only the service icon and categorization differ.

## Next Steps

- [Services View](services-view.md) to see how detected services are displayed
- [Filtering & Search](filtering-search.md) to filter by service type
- [Troubleshooting](troubleshooting.md) if services aren't being detected correctly
