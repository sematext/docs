title: Using the Synthetics API for fetching, creating, editing scheduled pauses
description: How to use the Synthetics API for fetching, creating, editing scheduled pauses.

## Create Scheduled Pauses using the API

> You’ll need your [API key](/docs/synthetics/using-the-api#getting-the-api-key) for the API requests below.

To create a [Scheduled Pause](/docs/synthetics/scheduled-pauses/), you'll send an HTTP request with the below configuration:

| Region | Endpoint
| --- | --- |
| US | `https://apps.sematext.com/synthetics-api/api/scheduledpauses` |
| EU | `https://apps.eu.sematext.com/synthetics-api/api/scheduledpauses` |

**HTTP Method** - `POST`

**Request Headers** - `Authorization: apiKey <apiKey>`

To create a Scheduled Pause, we would send an HTTP request as follows:

```
curl -L -X POST 'https://apps.eu.sematext.com/synthetics-api/api/scheduledpauses' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd' \
-H 'Content-Type: application/json' \
--data-raw '{
  "name": "Example Scheduled Pause",
  "startsAt": "2025-06-26T09:00:00.000Z",
  "endsAt": "2025-06-26T18:00:00.000Z",
  "monitorIds": [11599]
}'
```

The `<monitorId>` can be extracted from the URL of the Monitor Overview page. For example, if the Monitor Overview page URL is `https://apps.sematext.com/ui/synthetics/12345/monitors/276` then the `monitorId` is `monitorId` is `276`.

## Edit Scheduled Pauses using the API

To edit Scheduled Pauses using the API, you need to send a **PUT** request with the full request body with the updated parameters, depending on what you want to change. In the example below, we've changed the time interval, and added one more monitor to the Scheduled Pause we created above.

You’ll also need to include the ID of the Scheduled Pause you want to edit in the URL.

The `<scheduledPauseId>` can be extracted from the URL of the Scheduled Pause edit page. For example, if the page URL is `[https://apps.sematext.com/ui/synthetics/12345/monitors/276](https://apps.eu.sematext.com/ui/synthetics/scheduled-pauses/276/edit)` then the `scheduledPauseId` is `276`.

```
curl -L -X PUT 'https://apps.eu.sematext.com/synthetics-api/api/scheduledpauses/276' \
-H 'Authorization: apiKey 9bddb0a6-xxxx-xxxx-xxxx-397d15806cfd' \
-H 'Content-Type: application/json' \
--data-raw '{
  "name": "Example Scheduled Pause",
  "startsAt": "2025-06-27T09:00:00.000Z",
  "endsAt": "2025-06-27T18:00:00.000Z",
  "monitorIds": [11599,10617]
}'
```
