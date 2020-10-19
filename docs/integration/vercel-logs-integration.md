title: Vercel Logs Integration
description: With our new Vercel Logs Integration you get insight into your whole Vercel account. View logs from all your projects, serverless functions, static and Jamstack websites, including build logs and errors!

By configuring a Sematext Log Drain Integration to point to Sematext Logs you can get insight into your whole Vercel account in one place!

![](../images/integrations/vercel-logs-integration-review.png)

## Vercel Logs Quick Start

The Sematext Vercel Logs Integration collects logs from the following:

- All Builds
- All Errors
- Static Websites
- Jamstack Websites
- Serverless Functions that succeed
- Serverless Functions that fail, crash, or cause an error
- Serverless Functions that are cold starts

We give you 7 reports out-of-the-box. You can add as many additional custom reports and charts as you want!

## Install the Sematext Logs Vercel Integration

Install the [Sematext Logs integration from the Vercel Integrations Marketplace](https://vercel.com/integrations/sematext-log-drain) to add it to your Vercel account.

![](https://vercel.com/docs/static/guides/debugging-and-troubleshooting-vercel-logs-with-sematext/step-2-sematext-log-drain.png)

Select the account or team your deployed project belongs to. You will then be redirected to Sematext Logs.

![](https://vercel.com/docs/static/guides/debugging-and-troubleshooting-vercel-logs-with-sematext/step-2-add-sematext-log-drain.png)

## Create a Vercel Logs App

In Sematext, [create a Vercel App](https://apps.sematext.com/ui/logs-create) ([click here for our EU region](https://apps.eu.sematext.com/ui/logs-create)). This will set up a Logs App that acts as container for your data with prebuilt reports and charts for easy troubleshooting.

Follow the instructions for setting up log forwarding.

![](https://vercel.com/docs/static/guides/debugging-and-troubleshooting-vercel-logs-with-sematext/step-4-save-token.png)

Save the token and remember the region you are in.

## Create a Sematext Log Drain

In Vercel, open your Sematext Logs integration, select the region in which you created your Sematext Account, and add the token from above. Finally, save the log drain.

![](https://vercel.com/docs/static/guides/debugging-and-troubleshooting-vercel-logs-with-sematext/step-5-create-log-drain.png)

By default, you get a set of reports out of the box, with default alert rules to notify you for common errors and timeouts. You can modify, disable, or delete them, and add your own custom alert rules, of course.

![](https://vercel.com/docs/static/guides/debugging-and-troubleshooting-vercel-logs-with-sematext/step-5-logs-reports.png)

## Forwarding Vercel Logs to Multiple Sematext Logs Apps (Optional)

When configuring the Sematext Logs Vercel Integration you can configure whether to collect logs from all projects or just a few. With this integration you can configure multiple log drains and route them to different destinations. This means you can specify which project will send logs to which Sematext Logs App.

To configure multiple log drains, create multiple Logs Apps in Sematext and multiple Log Drains in the Sematext Logs Vercel Integration.

Once added, you'll see an overview of all the Log Drains you have configured.

![](https://vercel.com/docs/static/guides/debugging-and-troubleshooting-vercel-logs-with-sematext/step-6-multiple-log-drains.png)

## Next Steps

- [Set up custom alerts](../../alerts/creating-logs-alerts/)
- [Set up custom reports and components](../../logs/reports-and-components/)
- [Tagging best practices](../../tags/)