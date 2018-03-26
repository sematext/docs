### Supported Technologies

Currently, only Java applications can be traced. The agent is compiled
with Java 1.6 target, so applications using Java 1.6 and up are
supported.

**Application servers:**

  - Apache Tomcat - 6.0.x, 7.0.x, 8.0.x
  - Jetty - 7.x, 8.x, 9.x
  - Generic servlet container (without cross-application tracing
    support)

**Technologies:**

  - Generic JDBC driver support
  - JPA
  - Spring
  - Elasticsearch TransportClient
  - java.net.URL
  - Apache HttpClient 3.x, 4.x
  - JAX-RS
