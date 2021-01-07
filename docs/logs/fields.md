title: Fields
description: Sematext Logs App looks for special fields in logs, namely os.host, source, facility, severity, syslog-tag, tags, message, and @timestamp

Every log event shipped to Sematext Logs has its structure - it is divided into fields. Each field has a [type](/logs/field-types/), for example [string](/logs/field-types/#string), [date](/logs/field-types/#date), or [integer](/logs/field-types/#integerlong). It can even be an object holding structured data.  We do everything we can to ensure that log event field types are inferred correctly. However, you may also want to set field types explicitly. This can be done using the Field Editor accessible via a Logs App settings or using the [Templates and Mappings](/logs/mappings-templates) APIs.

## Common Schema
Fields in log events are also referred to as Tags in Sematext. They are used for searching and filtering, but also for pivoting from Logs to other observability data in Sematext, such as performance metrics in [Monitoring](../monitoring).  The [Common Schema for Logs](../tags/common-schema/#logs-tags) lists special fields and their meaning.

## Fields Structure

The structure of your data is dictated by the data shipped to Sematext Logs as log events. There are two places where you can easily see your data structure - the fields and filters section of your Logs table and the [Field Editor](/logs/fields/#field-editor):

<img src="../../images/logs/logs_structure_fields_and_filters.png" alt="Logs Fields and Filters">

<img src="../../images/logs/logs_structure_field_editor.png " alt="Logs Field Editor">

---
**Note:**
The structure shown by the fields and filters section and the field editor may differ. The data structure shown by the fields and filters always covers the **whole data** - old and new. The data structure shown by the Field Editor is always the **current** one, the one that will be applied to all your current and future events.
--- 

### Field Types

Each field has a field type associated with it and will include:

 * [Integer/Long](/logs/field-types/#integerlong) - numerical data without floating points
 * [Float/Double](/logs/field-types/#floatdouble) - numerical, floating point data
 * [Boolean](/logs/field-types/#boolean) - Boolean field
 * [Keyword/Not analyzed string](/logs/field-types/#not-analyzed-string) - not analyzed text
 * [Text/Analyzed string](/logs/field-types/#analyzed-string) - analyzed, full text searchable data
 * [Date](/logs/field-types/#date) - date based data
 * [Geo](/logs/field-types/#geo) - field type dedicated for spatial data
 * Object - nested structure holding structured data

### Modifying Fields

You can [add](/logs/fields/#adding-fields), [remove](/logs/fields/#removing-fields) or [edit](/logs/fields/#editing-fields) existing fields by using the [field editor] accessible via a Logs App settings or by using the [Templates and Mappings](/logs/mappings-templates) APIs directly. Keep in mind that the modification is applied only to the data that is shipped after the adjustments, so you may need to re-index the data in case you want the old data to be adjusted. 

## Field Editor

The Field Editor functionality allows adding, editing, and removing fields present in your data structure definition.

<img src="../../images/logs/logs_field_editor_add.png " alt="Logs Field Editor - Adding Fields">

### Adding Fields

Field Editor allows adding new field by providing its name and [type](/logs/field-types/).   

### Editing Fields

Field Editor allows modifying a field type by changing its type. 

<img src="../../images/logs/logs_field_editor_edit.png " alt="Logs Field Editor - Editing Fields">

The changes done to the field are only applied to the data shipped after the change was done. Once the changes are applied the Field Editor will give you an option to re-index your old data - [learn more](/logs/fields/#re-indexing-data).

### Removing Fields

Field editor allows removing fields that are no longer used or needed. You can mark multiple fields for deletion and apply the changes once everything is ready. 

<img src="../../images/logs/logs_field_editor_delete.png" alt="Logs Field Editor - Removing Fields">

Deleting a field removes it from the data structure definition and the data already shipped to your Logs App will not be affected. If you will keep shipping data with such a field it will appear again. To fully delete the field from your Logs App make sure you will no longer ship the data with the field present.

### Re-indexing data

If you wish for your old data to be re-indexed to take into account the changes done by editing the fields, the field editor will display an option allowing you to do that. If you start the indexing process your data will be re-indexed in the background and the progress will be displayed on the fields editor page. 

The data that is indexed again in the process of re-indexing counts towards your Logs App daily volume. Consider double-checking your usage data to ensure that you have enough space for your data after re-indexing.

<img src="../../images/logs/logs-field-editor-reindex.gif" alt="Logs Field Editor - Re-idexing">
