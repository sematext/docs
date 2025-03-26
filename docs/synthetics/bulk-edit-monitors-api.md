title: Bulk Edit Monitors via Google Apps Script
description: Bulk edit HTTP and Browser Monitors using Google Sheets and Apps Script via the Sematext Synthetics API.

This guide explains how to use Google Sheets and [Apps Script](https://developers.google.com/apps-script) to bulk edit [HTTP](https://sematext.com/docs/synthetics/http-monitor/) and [Browser](https://sematext.com/docs/synthetics/browser-monitor/) Monitors. You can enter monitor details in a structured spreadsheet and use a script to send API requests for each monitor.

After adding monitors, if you want to change the configuration for each one, you can use the bulk edit API. Note that you need to pass each parameter again because the edit API overrides the existing configuration. To bulk edit all the monitors, you can clone the spreadsheet used in bulk adding monitors and make the necessary changes.
                                                                                                                  
> If you want to bulk edit Browser monitors, follow these steps first, but refer to the [Bulk Edit Browser Monitors](#bulk-edit-browser-monitors) section below for the minor changes needed to edit Browser monitors.

For example, to add one more location to all the monitors created by [this script](#setting-up-the-google-sheet-to-bulk-add-monitors), clone the sheet and change the App Script and the Google Sheet according to the instructions below:

- First, add a new column in your spreadsheet for the monitor ID and enter the monitor IDs for each monitor.

| Monitor Name | URL | Monitor ID |
| --- | --- | --- |
| bulk add 1 | https://example_1.com | 12345 |
| bulk add 3 | https://example_3.com | 67891 | 

Refer to [this link](https://sematext.com/docs/synthetics/using-the-api/#getting-the-apikey) to learn how to get monitor IDs, or you can use the Synthetics API to get all the available monitors for an App: [Get all monitors for an App](https://sematext.com/docs/synthetics/using-the-api/#get-all-monitors-for-an-app).

- Then, you need to specify the monitor ID within the endpoint URL.

EU region:

```javascript
var endpoint = "https://apps.eu.sematext.com/synthetics-api/api/apps/" + appId + "/monitors/http/" + id;
```

US region:

```javascript
var endpoint = "https://apps.sematext.com/synthetics-api/api/apps/" + appId + "/monitors/http/" + id;
```
To do this, you need to extract the monitor ID from the new column you've added. Cut the line where we set the endpoint from outside the for loop and paste it inside to change the URL for each monitor.

```javascript
for (var i = 2; i <= sheet.getLastRow(); i++) {
    var name = String(sheet.getRange(i, 1).getValue()).trim();
    var url = String(sheet.getRange(i, 2).getValue()).trim();  
    var id = String(sheet.getRange(i, 3).getValue()).trim();

    var endpoint = "https://apps.eu.sematext.com/synthetics-api/api/apps/" + appId + "/monitors/http/" + id;
   
    if (!name || !url || !id) {
      Logger.log("Skipping row " + i + " due to missing data.");
      continue;
    }
...
```

- Locate the ```locations``` array within your payload, add the new location.

  ```javascript
  "locations": [1, 2, 3]
  ```
Refer to [this link](https://sematext.com/docs/synthetics/using-the-api/#getting-the-locationid) to learn how to get location IDs.

- Finally, change the API request method from POST to PUT, and then run the script.

  ```javascript
  var options = {
      "method": "put",
      "headers": {
        "Authorization": "apiKey " + apiKey,
        "Content-Type": "application/json"
      },
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };
  ```

## Bulk Edit Browser Monitors

You can follow the same [Bulk Edit Monitors](#bulk-edit-monitors)  steps to edit Browser monitors. The only changes are to update the endpoint to edit Browser monitors instead of HTTP and add ```"isPlaywright": true``` within your payload.

**Bulk Edit Browser Monitors endpoint:**

EU region:

```javascript
var endpoint = "https://apps.eu.sematext.com/synthetics-api/api/apps/" + appId + "/monitors/browser/" + id;
```

US region:

```javascript
var endpoint = "https://apps.eu.sematext.com/synthetics-api/api/apps/" + appId + "/monitors/browser/" + id;
```

