title: Status Pages
description: Communicate the status of your services to your customers using status pages

Using Sematext Synthetics you can create public and private status pages to share the status and response time of your services. Use the status pages to:

* Communicate the status of your services to your customers
* Share status updates with your customers during planned maintenance or outages
* Create a service status dashboard to share across internal teams

## Create Status Page

You can create multiple status pages under your account. To create a status page, simply go to **Synthetics** and press the **Add Status Page** button on the sidebar.


![Create Status Page](../images/synthetics/status-page-new.png)

Doing so will show the form where you can customize the status page. 

![Create Status Page](../images/synthetics/status-page-create.png)

The following fields are required to create a status page:

* **Monitors** - List of monitors to be included in the status page. All the active monitors from Apps for which you have the OWNER or ADMIN role can be included in the status page. The same monitor can be included in multiple status pages.
* **Name** - Unique name for the status page.
* **Header Title** - Company name to be displayed in the status page header.
* **Header Logo URL** - URL of the company logo to be displayed in the status page header. An image with a height of 40px and white background is recommended.
* **Response Time Aggregation** - Aggregation to apply for Response Time chart. The response time is aggregated in 1 hour buckets.
* **Custom Domain** - Optionally you can host the status page in your own custom domain.

Every status page will have a unique public URL in this format:
* `https://apps.sematext.com/ui/statuspages/<unique-token>`

You can use this URL to preview the status page before opening to the public. Disabling the status page will block the public access for the status page.

# Custom Domain Setup

To use a custom domain for your status page (e.g. `status.company.com`), you will need to:

 * enter the domain in the **Custom Domain** field
 * configure your DNS provider

To configure your DNS provider, add a CNAME record for `status.company.com`. The record should point to:

 * `statuspage.us.sematext.com` if your App is created in the Sematext Cloud US region
 * `statuspage.eu.sematext.com` if your App is created in the Sematext Cloud EU region

The status page should now be available at  `https://status.company.com`.

## Status Page UI

![Status Page UI](../images/synthetics/status-page-ui.png)

1. **Header Logo**
2. **Header Title**
3. **Current Status**
4. **Monitor Name**
5. **Availability for Last 30 days**
6. **Response Time for Last 24h**

The status page is auto-refreshed every 1 minute.
