title: Status Pages
description: Communicate the status of your services to your customers using status pages.

Using Sematext Synthetics you can create status pages to share the status and response time of your services to your customers and internal teams.

## Create Status Page

You can create multiple status pages under your account. Navigate to `Synthetics -> Status Pages` screen to create a status page. 

![Create Status Page](../images/synthetics/status-page-create.png)

The following fields are required to create a status page:

* **Monitors** - List of monitors to be included in the status page. All the active monitors from Apps for which you have OWNER or ADMIN role can be included in the status page. A monitor can be part of multiple status pages.
* **Name** - Unique name for the status page.
* **Header Name** - Company name to be displayed in the status page header.
* **Header Logo** - URL of the company logo to be displayed in the status page header. An image with a height of 40px and transparent background is recommended.
* **Response Time Aggregation** - Aggregation to apply for Response Time chart. The response time is aggregated in 1 hour buckets.
* **Custom domain** - Optionally you can host the status page with your own custom domain.

Every status page has a unique public URL of the format - `https://apps.sematext.com/ui/statuspages/<unique-token>`. You can use this URL to preview the status page before opening it to the public. The unique token is secret unless it's shared. The token provides security through obscurity. You can use this URL to share the status of your services across teams for internal purposes. If the URL is inadvertently exposed the token cannot be changed, but a page can be disabled and recreated. 

Disabling the status page will block access to the status page.

## Status Page UI

![Status Page UI](../images/synthetics/status-page-ui.png)

1. **Header Logo**
2. **Header Name**
3. **Current Status**
4. **Monitor Name**
5. **Availability for Last 30 days**
6. **Response Time for Last 24h**
7. **Last Refresh Time**

The status page is auto-refreshed every 1 minute.
