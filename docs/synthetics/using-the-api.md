title: Using the Synthetics API for fetching and creating, running monitors
description: How to use the Synthetics API for fetching and creating, running monitors.

You can use the Synthetics API to:

- [Fetch monitor(s) in an App](/docs/synthetics/monitor-overview-api)
- [Trigger monitor runs](/docs/synthetics/run-monitor-api)
- [Create or Edit Monitors](/docs/synthetics/create-edit-monitors-api)
- [Schedule Monitor Pauses](/docs/synthetics/scheduled-pauses-api)

To use the API, you'll need your API key for all requests and your Synthetics App ID for some requests.

### Getting the API Key

Your account's API Key can be found under **Settings → API** page.

- [here](https://apps.sematext.com/ui/account/api), if your account is registered in the US region, or
- [here](https://apps.eu.sematext.com/ui/account/api), for the EU region

### Getting the appId

* The `<appId>` and `<monitorId>` values can be extracted from the URL of the Monitor Overview page. For example, if the Monitor Overview page URL is `https://apps.sematext.com/ui/synthetics/12345/monitors/276` then the `appId` is `12345` and `monitorId` is `276`.
* The `<appId>` can also be obtained by sending a GET request using the above request header and `<apiKey>` to the required endpoint:

| Region | Endpoint
| --- | --- |
| US | `https://apps.sematext.com/users-web/api/v3/apps` |
| EU | `https://apps.eu.sematext.com/users-web/api/v3/apps` |

Example:
```
curl -L -X GET 'https://apps.sematext.com/users-web/api/v3/apps' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd'
```
Response:
```
  "success": true,
  "message": null,
  "data": {
    "apps": [
      {
        "id": 17174,
        "name": "Bulk API Test",
        "appType": "Synthetics",
        "appTypeId": 40000,
```
From the above response, we can determine that the `<appId>` for the Synthetics App named `Bulk API Test` is `17174`.


You can also create or edit [scheduled pauses](/docs/synthetics/scheduled-pauses/) using the Synthetics API.

