title: Script Field Processor
description: Logs Pipeline Processors

Scripting is supported using the Script Field processor. Scripts are written in [CEL — Common Expression Language](https://cel.dev/), a simple and safe expression language. A script is a single CEL expression that is evaluated for each log event, and its result is stored in the configured target field.

You can access fields using the `doc` variable, e.g. `doc['severity']` or `doc.severity`. Use the bracket form for field names containing dots, e.g. `doc['os.host']`. String fields can be used directly. Numeric fields must be converted explicitly before arithmetic or comparison, using `int()` for whole numbers or `double()` for decimals, e.g. `int(doc['size'])`. Accessing a missing field returns `null`.

The following is supported:

- Math operators: +, -, /, *, %, e.g. `int(doc['size.kb']) * 2`
- Relational operators: ==, !=, <, <=, >, >=, e.g. `int(doc['size']) > 10`
- Logical operators: &&, ||, !, e.g. `int(doc['size']) > -1 && int(doc['size']) < 10`
- Ternary operator, e.g. `int(doc['speed']) < 1000 ? "OK" : "SLOW"`
- String functions such as `split`, `replace`, `substring`, `indexOf`, `trim`, `lowerAscii`, `upperAscii`, `startsWith`, `endsWith`, `contains`, `matches`, e.g. `doc['severity'].upperAscii()` or `doc['message'].split('-')[3]`
- Field presence test with `has()`, e.g. `has(doc.severity)`. For field names containing dots, use `doc['os.host'] != null` instead
- Naming a sub-expression with `cel.bind()` so it is computed once and reused
- Returning a map, which sets several fields at once — the target field is then ignored

Loops and comprehensions (`map`, `filter`, `all`, `exists`) are not supported — a script is always a single expression, and scripts using them are rejected when the pipeline is saved. If a script fails at runtime for a log event — for example, a string function is called on a missing field — the event continues through the pipeline unchanged; a script never drops an event.

Imagine we have a message field:
`Got document of 142 kb from 255.35.244.0`
and that we want to extract the number of kilobytes. Since the fields are space-separated, the simplest script is:

```javascript
doc['message'].split(' ')[3]
```

The same value can be extracted by position, using `cel.bind()` to avoid repeating the field access:

```javascript
cel.bind(msg, doc['message'], msg.substring(16, msg.indexOf(' kb')))
```

To set several fields from one script, return a map. For example, with a `raw` field containing `ERROR|10.1.1.0`, the following stores `ERROR` in the `status` field and `10.1.1.0` in the `ip` field:

```javascript
cel.bind(p, doc['raw'].split('|'), {'status': p[0], 'ip': p[1]})
```
