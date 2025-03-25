title: Bulk Add/Edit Monitors via Apps Script
description: Bulk add and edit HTTP and Browser Monitors using Google Sheets and Apps Script via the Sematext Synthetics API.

This guide explains how to use Google Sheets and [Apps Script](https://developers.google.com/apps-script) to bulk add or edit [HTTP](https://sematext.com/docs/synthetics/http-monitor/) and [Browser](https://sematext.com/docs/synthetics/browser-monitor/) Monitors. You can enter monitor details in a structured spreadsheet and use a script to send API requests for each monitor.

## Prerequisites 

- A Google account
- A Sematext account with API access
- Sematext [Synthetics App](https://sematext.com/docs/synthetics/) must be created within your Sematext Account
- A Google Sheet to store monitor details
- Google Apps Script extension

## Setting Up the Google Sheet to Bulk Add Monitors

- Create a new Google Sheet.
- Add rows for each monitor as follows:

| Monitor Name | URL |
| --- | --- |
| bulk add 1 | https://example_1.com |
| bulk add 3 | https://example_3.com | 

> You can add as many monitors as your selected plan allows. For more details, refer to the [pricing](https://sematext.com/pricing/) page. To keep this example simple, we'll demonstrate bulk adding two monitors.

- Proceed to **Extensions → Apps Script** to write the script that will bulk add monitors.

In the Apps Script, we'll write a function called `sendMultipleMonitorRequests` to iterate through all the monitors in the Google Sheet and bulk add HTTP monitors. 

> If you want to bulk add [Browser](https://sematext.com/docs/synthetics/browser-monitor/) monitors, follow these steps first, but refer to the [Bulk Add Browser Monitors](here) section for the minor changes needed to create Browser monitors.

We’ll explain each line in this guide, but in the end, your function will look like this:

```javascript
function sendMultipleMonitorRequests() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var appId = YOUR_APP_ID;
  var apiKey = "YOUR_API_KEY";
  
  var endpoint = "https://apps.eu.sematext.com/synthetics-api/api/apps/" + appId + "/monitors/http";
  for (var i = 2; i <= sheet.getLastRow(); i++) {
    var name = String(sheet.getRange(i, 1).getValue()).trim();
    var url = String(sheet.getRange(i, 2).getValue()).trim();  
 
    if (!name || !url) {
      Logger.log("Skipping row " + i + " due to missing data.");
      continue;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      Logger.log("ERROR at row " + i + ": Invalid URL format.");
      continue;
    }

    // Define the configuration parameters for creating an HTTP monitor.
    var payload = {
      "name": name,
      "interval": "5m",
      "enabled": true,
      "locations": [1, 2],
      "url": url,
      "method": "GET",
      "conditions": [
        { "id": 1, "type": "ERROR", "operator": "=", "value": "", "enabled": true },
        { "id": 2, "type": "RESPONSE_CODE", "operator": "=", "value": "200", "enabled": true },
        { "id": 3, "type": "METRIC", "key": "synthetics.time.response", "operator": "<", "value": "20000", "enabled": true }
      ]
    };

    var options = {
      "method": "post",
      "headers": {
        "Authorization": "apiKey " + apiKey,
        "Content-Type": "application/json"
      },
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };


    var response = UrlFetchApp.fetch(endpoint, options);
    Logger.log("Response for row " + i + ": " + response.getContentText());
  }
}
```
### Step-by-Step Guide for the Apps Script

- Get the sheet to extract monitor names and URLs from the first row. Then set the `appId` and `apiKey`:
  
```javascript
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var appId = YOUR_APP_ID;
var apiKey = "YOUR_API_KEY";
```
Refer to [this link](https://sematext.com/docs/synthetics/using-the-api/#getting-the-apikey) to learn how to get your App ID and API key.


