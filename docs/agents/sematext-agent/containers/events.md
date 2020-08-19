title: Container events
description: Explains how to control the event stream collector and available filters

Sematext Agent collects all sorts of container life-cycle, image, daemon, volume, plugin, and network events. If you're not interested in a certain event category, you can instruct the agent to ignore events that pertain to such a category via the `CONTAINER_EXCLUDED_EVENTS` environment variable. For example, to drop the volume and image events you would define the following environment variable:

```
-e CONTAINER_EVENTS_EXCLUDED=volume,image
```

Available event categories include:

- container
- image
- daemon
- volume
- plugin
- network

### Disabling events

To completely disable the event stream collector set the `CONTAINER_EVENTS_ENABLED` environment variable to `false`.
