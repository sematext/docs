title: Fields
description: Sematext's Logs management App looks for special fields in logs, namely host, source, facility, severity, syslog-tag, tags, message, and @timestamp

Every log event that you ship to Sematext Logs has its structure - it is divided into fields. Each field can have a [type](/logs/field-types/), for example [string](/logs/field-types/#string), [date](/logs/field-types/#date), or [integer](/logs/field-types/#integerlong). It can even be an object holding structured data. We do everything we can to ensure that your log event field types are inferred correctly. However, you may also want to set field types explicitly. 

If you want to adjust the structure of your data you can use the Field Editor 
functionality in your Logs App settings or use the [Templates and Mappings](/logs/mappings-templates) functionality.

---
**Note:**
Tags from the [Common Schema](../tags/common-schema) apply to Sematext Logs as well. Additionally, there are Logs-specific fields which also get special treatment to learn more, check out our [Common Schema for Logs Tags](../tags/common-schema/#logs-tags).
---
