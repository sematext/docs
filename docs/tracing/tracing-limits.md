# Trace Data Limits

Sematext Tracing sets limits on trace data to maintain stable processing. The traces receiver checks incoming data and drops spans, attributes, events or links that exceed these limits. 

## Trace

| Property            | Limit  |
|---------------------|--------|
| Spans per trace     | 2,000  |

## Spans

| Property                | Limit            |
|-------------------------|------------------|
| Span name length        | 256 characters   |
| Attributes per span     | 64               |
| Attribute key length    | 256 characters   |
| Attribute value length  | 4,096 characters |
| Past timestamp (max age)| 30 days          |
| Future timestamp offset | 3 days           |

## Span Events

| Property                 | Limit            |
|--------------------------|------------------|
| Events per span          | 32               |
| Attributes per event     | 16               |
| Event name length        | 256 characters   |
| Event attribute key length | 256 characters |
| Event attribute value length | 4,096 characters |

## Span Links

| Property                 | Limit            |
|--------------------------|------------------|
| Links per span           | 128              |
| Attributes per link      | 16               |
| Link attribute key length | 256 characters  |
| Link attribute value length | 4,096 characters |

## Behavior on Limit Violations

When limits are exceeded, the trace receiver drops the offending spans, attributes, events or links. Dropped data is logged internally and shown in the Tracing App so users know no data is lost silently:

- **Trace View:** Shows total dropped spans.
- **Span Details:** Shows per-span dropped attributes, events, and links.

No truncation is applied.
