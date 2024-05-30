title: Pricing Guide
description: This guide explains how Sematext Cloud's flexible and transparent pricing works, helping you manage costs effectively based on your needs.

We offer flexible and transparent pricing for all of our four solutions: [Monitoring](https://sematext.com/docs/monitoring/), [Logs](https://sematext.com/docs/logs/), [Experience](https://sematext.com/docs/experience/), and [Synthetics](https://sematext.com/docs/synthetics/). This guide explains how our pricing works, helping you manage costs effectively based on your needs.

## Apps and Plans
For each of the four solutions, you can create multiple Apps based on your needs. Each App can be tailored to your specific requirements with different plans. This allows you to customize and control costs for each App individually.

- **Logs Apps**: Offer three different plan options with different retention periods and daily log volumes.
- **Monitoring Apps**: Offer three different plan options with different retention periods and the number of hosts and containers you want to ship metrics from.
- **Experience Apps**: Offer three different plan options with different retention periods and the number of page views.
- **Synthetics Apps**: Offer three different plan options with different retention periods, the number of monitors, and run limits for each Browser and HTTP monitor.

This flexibility ensures you only pay for what you use. For example, you might create multiple Apps and choose a minimal retention plan for test hosts and a higher retention plan for production hosts.

Refer to our [cost calculator](https://sematext.com/cost-calculator/) to estimate costs for each solution based on your needs. The calculator sums up the total based on your selections and shows your estimated monthly charge. You can also explore detailed plans on the [pricing page](https://sematext.com/pricing/).

### Can I ship logs from different hosts to the same App without additional charges?

The easiest way to ship logs to Sematext Cloud is by using [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/). Our Logs Apps don’t charge based on the number of hosts you are shipping data from. Our pricing is based on the daily log volumes you are shipping to Sematext Cloud. Therefore, you can install [Sematext Agent](https://sematext.com/docs/agents/sematext-agent/) on multiple hosts or use our [custom integrations](https://sematext.com/docs/logs/sending-log-events/#custom-integration-options) to ship logs to the same App without additional charges. We also recommend using [Logs Pipelines](https://sematext.com/docs/logs/pipelines/) to drop redundant and noisy log events to save on costs. Refer to [Reducing Log Monitoring Costs](https://sematext.com/docs/logs/reduce-costs-with-pipelines/) for more information. 

[Sematext Logs](https://sematext.com/docs/logs/) also offers plan recommendations based on the daily log volume you shipped during the last 7 days and provides a hard stop to reject data once the specified GB/day limit is reached, to avoid surprises at the end of the month. 

Refer to [Plan Recommendations](https://sematext.com/docs/logs/plan-recommendations/) for more information.

## Cost Estimation

### App-Level Cost Estimation

To see the details of your estimated cost for a specific App, go to the App, click on App Settings from the left menu panel. 

![Sematext Cloud App Settings - Cost Estimations](../images/guide/pricing/app-settings-cost-estimations.png) 

- **Last Month**: Amount charged for the App for the previous month.
- **Month to date**: Costs for your App made in the current month so far.
- **Full month estimate**: Estimate for future months based on the current usage and plan. For the purpose of this calculation, the trial period is ignored.
- **Current month estimate**: Sum of costs for the current month so far and estimate for the rest oıf the month based on current usage and plan. This estimate takes into account any trial period but you won’t be charged for the usages during the trial period..

### Account-Level Cost Estimation

For a general overview of your estimated monthly costs across all Apps, visit the Settings → Plans & Billing screen. There, you can see a detailed breakdown of costs by each App in the data table at the bottom of the screen.

![Plans & Billing](../images/guide/pricing/plans-billing.png) 

### Trial Period

We offer a 14-day trial period with all pro features enabled. During this period, you won't be charged. Estimated costs for trial Apps will show as $0 in the Plans & Billing section. However, if you're curious about post-trial costs, you can toggle on the Show Estimations for Trial Apps button.

## Billing Flexibility

### No Commitment

You can downgrade or update an App at any time without any commitment, providing full control over your expenses.

### Annual Payment Discount

You can switch to an annual payment method from the Plans & Billings screen which gives you a 10% discount on your account level.

Our goal is to provide a flexible and transparent pricing model, ensuring there are no surprises at the end of the month. By offering customizable plans and clear cost estimations.

If you have any questions or need further assistance, reach out to us from support@sematext.com.
