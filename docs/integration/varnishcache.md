title: Varnish Cache Monitoring Integration
description: Monitor Varnish Cache using pre-built dashboards for Client and Backend connections and requests, Cache Hits and Misses, Threads, Bans and much more.

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/varnishcache/overview](https://apps.sematext.com/ui/howto/varnishcache/overview)

## Important Metrics to Watch and Alert on

### Backend Connections and Requests
High backend connections might indicate that your Varnish cache is making frequent requests to the backend servers. This could be due to cache misses, ineffective caching rules, or other issues. Also, if backend connections suddenly spike or drop, it could be a sign of issues such as misconfigurations, network problems, or changes in traffic patterns.

<img class="content-modal-image" alt="Backend Conns and Reqs" src="../../images/integrations/varnish-cache-backend-reqs.png" title="Backend Conns and Reqs">

Sudden spikes or drops in the backend request rate can be indicative of issues in your infrastructure, such as sudden traffic spikes, misconfigured cache rules, or even attacks on your system. Also it might imply that your cache is frequently missing and fetching content from the backend.

### Client Metrics
Monitoring changes in client requests can help you to identify potential problems in your infrastructure. Additionally, tracking client requests by response code allows you to quickly identify and address errors and issues in your applications. Common HTTP response codes like 500 (Internal Server Error) can indicate broken links, missing resources, or server-side problems that need immediate attention.

<img class="content-modal-image" alt="Client Conns and Reqs" src="../../images/integrations/varnish-cache-client-reqs.png" title="Client Conns and Reqs">

### Cache Hits and Misses
Cache hits indicate that Varnish is serving content directly from its cache, reducing the load on backend servers and improving response times. On the other hand, cache misses represent requests that Varnish Cache couldn't fulfill from its cache and had to pass through to the backend. Monitoring these metrics helps assess how efficiently Varnish Cache is utilizing its cache to reduce server load and improve performance.

<img class="content-modal-image" alt="Cache Hits" src="../../images/integrations/varnish-cache-hits.png" title="Cache Hits">

### Bans
Bans are a mechanism in Varnish Cache to invalidate or purge specific objects from the cache. Monitoring bans allows you to understand when and why cache invalidations are occurring. This is important to ensure that stale or outdated content is removed from the cache promptly.

<img class="content-modal-image" alt="Bans" src="../../images/integrations/varnish-cache-bans.png" title="Bans">

## Metrics

Metric Name <br> Key (Type) (Unit) | description
--- | ---
test metric name <br> **metric** <br> (double_gauge) (sec) | Metric description