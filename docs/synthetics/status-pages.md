title: Status Pages
description: Communicate the status of your services to your customers using status pages

Using Sematext Synthetics you can create public status pages to share the status of your services to your customers. 

## Create Status Page

You can create multiple status pages under your account. The following fields are required to create a status page:

* **Monitors** - List of monitors to be included in the status page. All the active monitors from Apps for which the account has OWNER or ADMIN role can be included the status page. A monitor can be included in multiple status pages.
* **Name** - Unique name for the status page.
* **Header Name** - Company name to be displayed in the status page header.
* **Header Logo** - URL of the company logo to be displayed in the status page header. An image with a height of 40px and white background is recommended.
* **Response Time Aggregation** - Aggregation to apply for Response Time chart
* **Custom domain** - Your own custom domain to host the status page.

Every status page will have a unique public URL of the format - `https://apps.sematext.com/ui/statuspages/<unique-token>`. This URL can be used to access the status.

Disabling the status page will block the public access for the status page.

## Custom domain

## Status Page UI

1. **Logo**
2. **Company Name**
3. **Current Status**
4. **Monitor Name**
5. **Availability for Last 30 days**
6. **Response Time for Last 24h**
7. **Last Refreshed Time**

