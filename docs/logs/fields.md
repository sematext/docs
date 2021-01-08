title: Fields
description: Sematext Logs App looks for special fields in logs, namely os.host, source, facility, severity, syslog-tag, tags, message, and @timestamp

Every log event shipped to Sematext Logs has its structure - it is divided into fields. Each field has a [type](/logs/field-types/), for example [string](/logs/field-types/#string), [date](/logs/field-types/#date), or [integer](/logs/field-types/#integerlong). It can even be an object holding structured data.  We do everything we can to ensure that log event field types are inferred correctly. However, you may also want to set field types explicitly. This can be done using the Field Editor accessible via a Logs App settings or using the [Templates and Mappings](/logs/mappings-templates) APIs.

## Common Schema
Fields in log events are also referred to as Tags in Sematext. They are used for searching and filtering, but also for pivoting from Logs to other observability data in Sematext, such as performance metrics in [Monitoring](../monitoring).  The [Common Schema for Logs](../tags/common-schema/#logs-tags) lists special fields and their meaning.

## Fields Structure

The structure of your logs - their fields and types - is automatically created when you ship your logs to a Logs App in Sematext. There are two places where you can easily see your fields. The first one is the fields and filters section:

<img src="../../images/logs/logs_structure_fields_and_filters.png" alt="Logs Fields and Filters">

The second one is the [Field Editor](/logs/fields/#field-editor):

<img src="../../images/logs/logs_structure_field_editor.png " alt="Logs Field Editor">

---
**Note:**
Fields shown in the fields and filters panel and fields shown in the Field Editor may differ. The Field Editor shows only fields that are included in your current [Log App Mapping](/logs/mappings-templates). On the other hand, fields and filters panel shows all fields that are still present in your Logs App. For example, if you used to ship logs with a `foo` field and then you deleted it, the Field Editor will not show it, while fields and filters panel will show it as long as there are log events that still contain it.
--- 

### Field Types

Each field has a field type. The following field types are supported:

 * [Integer/Long](/logs/field-types/#integerlong) - numerical data without floating points
 * [Float/Double](/logs/field-types/#floatdouble) - numerical, floating point data
 * [Boolean](/logs/field-types/#boolean) - Boolean field
 * [Keyword/Not analyzed string](/logs/field-types/#not-analyzed-string) - not analyzed text
 * [Text/Analyzed string](/logs/field-types/#analyzed-string) - analyzed, full text searchable data
 * [Date](/logs/field-types/#date) - date based data
 * [Geo](/logs/field-types/#geo) - field type dedicated for spatial data
 * Object - nested structure holding structured data

### Modifying Fields

You can [add](/logs/fields/#adding-fields), [remove](/logs/fields/#removing-fields) or [edit](/logs/fields/#editing-fields) existing fields by using the Field Editor accessible via a Logs App settings, by using the [Templates and Mappings](/logs/mappings-templates) APIs or via "Edit Fields" in fields and filters:

<img src="../../images/logs/logs_field_and_fielters_edit_field.png " alt="Fields and Filters - Edit Fields">

Keep in mind that the modification is applied only to the data that is shipped after the adjustments, so you may need to re-index the data if you want the old data to be adjusted. 

## Field Editor

The Field Editor functionality allows adding, editing, and removing fields present in your logs [mappings](/logs/mappings-templates).

<img src="../../images/logs/logs_field_editor_add.png " alt="Logs Field Editor - Adding Fields">

### Adding Fields

Field Editor lets you add a new field by providing its name and [type](/logs/field-types/).   

### Editing Fields

Field Editor allows modifying a field type by changing its type. 

<img src="../../images/logs/logs_field_editor_edit.png " alt="Logs Field Editor - Editing Fields">

The changes done to a field are only applied to the logs shipped after the change was done. Once the changes are applied, the Field Editor will give you an option to re-index your old logs - [learn more](/logs/fields/#re-indexing-data).

### Removing Fields

Field Editor allows removing fields that are no longer present in your logs. You can mark multiple fields for deletion and apply the changes once everything is ready. 

<img src="../../images/logs/logs_field_editor_delete.png" alt="Logs Field Editor - Removing Fields">

Deleting a field removes it from the logs [mappings](/logs/mappings-templates) and the logs already shipped to your Logs App will not be affected. If you continue to ship logs with such a field it will appear again. To fully delete the field from your Logs App first make sure the deleted field is no longer present in logs you ship to Sematext and then delete it with Field Editor.

### Re-indexing data

If you wish for your old data to be re-indexed to take into account the changes done by editing the fields, the field editor will display an option allowing you to do that. If you start the indexing process your data will be re-indexed in the background and the progress will be displayed on the fields editor page. 

The data that is indexed again in the process of re-indexing counts towards your Logs App daily volume. Consider double-checking your usage data to ensure that you have enough space for your data after re-indexing.

<img src="../../images/logs/logs-field-editor-reindex.gif" alt="Logs Field Editor - Re-idexing">
