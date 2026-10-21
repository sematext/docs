title: Coming Soon
description: Upcoming API Radar specification discovery, shadow and zombie API detection, quality scoring, and ownership

The features on this page are in development and are not yet available.

## Spec Discovery

Spec Discovery will compare API operations declared in OpenAPI specifications with the endpoints observed in live traffic. This will help you find differences between the API you document and the API your services actually expose and use.

### Automatic discovery and manual upload

Sematext Agent will look for specifications at well-known paths on discovered services. You will also be able to paste or upload an OpenAPI 2.0 or 3.x specification, including for services whose specification cannot be retrieved automatically.

### Shadow API detection

Identify endpoints that receive traffic but are missing from the specification. Review these operations to determine whether the specification needs updating or an undocumented endpoint should be restricted or removed.

### Zombie API detection

Identify operations declared in the specification that have no observed traffic over the review period. No observed traffic does not by itself establish that an operation is unused or safe to remove.

### Draft specifications from observed traffic

When no specification is available, generate an OpenAPI draft from observed paths, HTTP methods, and response status codes. The generated specification will remain a draft for review before publication.

## Quality & Ownership

Quality & Ownership will bring endpoint quality indicators, specification drift, and ownership into the endpoint inventory so you can identify problems and the team responsible for addressing them.

### API quality score

Review an A–F grade based on observable endpoint properties, including HTTPS usage, authentication-related signals, error rate, latency, specification coverage, and detected drift. Track the grade over time to identify endpoints whose quality is improving or deteriorating.

### Drift detection

Compare observed traffic with the declared specification to identify changes in HTTP methods, path parameters, response codes, and missing required Authorization headers. Use these differences to investigate implementation changes or specifications that need updating.

### Ownership and labels

Assign an owner, environment, and custom labels to endpoints. Filter the endpoint list by these attributes to find the operations owned by a team or deployed in a particular environment.

### Quality and drift alerts

Configure alerts when an endpoint's quality grade falls below a selected threshold or new specification drift is detected. For example, notify the responsible recipients when a grade drops from A to C.
