title: Events in Sematext
description: Event stream captures all your key IT and operations such as server, container, docker, and business events, and lets you search and filter historical alerts and add custom events via the UI or the REST API

## What are Events

Unlike log events, which tend to be generated on an ongoing basis and often in high volume, events in Sematext are intended for low-volume, high-signal sort of events.  What exactly are important events varies from team to team, but alert events and deployment events are among the most commonly used event types.

See [Event Examples](event-examples.md) for inspiration.

## Why Events

One of the popular uses of events is for [correlation with other data]() in Sematext, such as [performance metrics]() or [logs]().  For example, when you send [deployment events]() to Sematext you are able to correlate performance regressions or newly application errors with your application releases.

See [Correlating Events](correlation.md) for more info.

## Adding Events

Events in Sematext come from multiple sources.  They are automatically generated and collected from:
- Sematext Agent itself
- monitored environments that emit events, such as Kubernetes
- alerts

In addition, you can add events yourself:
- via an API
- interactively through the user interface

See [Adding Events](adding.md) for more info.

## Charting, Viewing, Searching, and Filtering Events

The default events screen shows an event histogram grouped by event type along with the list of events.  All events can be searched and filtered.

See [Viewing Events](timeline.md) for more info.

## Events API

Events can be added, searched, and retrieved via an [event API](event-api.md).

