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

1. Create a new Google Sheet.
2. Add rows for each monitor as follows:

| Monitor Name | URL |
| --- | --- |
| bulk add 1 | https://example_1.com |
| bulk add 3 | https://example_3.com | 
