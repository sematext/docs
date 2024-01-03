title: Examples of Events in Sematext
description: A list of internal events and examples of events one can send to Sematext

Events originate from internal and external sources.

## Internal Events

Internal events come from sources such as:

* [Kubernetes events](https://sematext.com/docs/integration/kubernetes/#kubernetes-events) collected by Sematext Agent
* [Container events](https://sematext.com/docs/monitoring/containers/#container-events) collected by Sematext Agent
* [Alert events](https://sematext.com/docs/alerts/alert-events/) generated when an alert is triggered
* Linux events like OOM Killer events
* Events from Sematext Agent, such as [agent starting and stopping](https://sematext.com/docs/agents/sematext-agent/starting-stopping/)

## External Events

External events are any events that are pushed into Sematext, whether through the [events API](adding/#adding-events-via-api) or via the UI.

The following are just _some_ examples of the types of data one can send to Sematext as events.

### Application Deployment Tracking

Bugs, performance regressions, etc. happen after modified applications are deployed.  
When you [send a deployment event to Sematext](adding/#adding-events-via-api) you are able to promptly identify and investigate deployments that caused performance degradation
or caused new errors to appear.  If your deployment events include an identifier that lets you see individual commits you will be able to
trace issues down to a specific commit.

### Infrastructure Changes

Any changes in the infrastructure or its configuration can cause performance changes - whether positive or negative.   A reduction or misconfiguration of infrastructure could cause errors caused by insufficient capacity. Sending an event when infrastructure changes are made in production helps you track track the root cause of issues.

### Builds

Use functionality such as Github Actions to add events with information about builds to Sematext using the [Sematext Events API](adding/#adding-events-via-api).

### Boot / Start / Stop Events

It's a little retro, perhaps, but a call to the [Events API](adding/#adding-events-via-api) can be made from `/etc/rc.local` to send an event when a host is started.  Similarly, you can add events when your application starts or right before it stops.
