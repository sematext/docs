title: How to Troubleshoot with Synthetics-to-Logs Correlation
description: Learn how to connect Sematext Synthetics with Logs to uncover the root causes behind failed checks and performance issues by correlating synthetic monitoring data with log events in real time.

When you're monitoring the availability and performance of websites, APIs, or full user journeys with Sematext Synthetics, issues can surface as failed checks, increased response times, or unexpected page behavior. But seeing that something is broken isn’t enough - you need to understand _why_ it’s broken. That’s where correlating Synthetics to Logs becomes essential.

With Sematext, you can find out why a synthetic check actually failed by correlating synthetic check failures with logs from the services or infrastructure involved in execution of the checks that failed. This cross-connection helps you jump from symptoms (failed checks) to root causes (logged errors, stack traces, or timeouts) without switching tools or context.

In this page, we’ll show you how to troubleshoot effectively by connecting Synthetics with Logs using Sematext’s [Connected Apps](/docs/guide/connected-apps/) and [Split Screen](/docs/guide/split-screen/) features.

## Why Connect Synthetics and Logs?

[Synthetic monitoring](/docs/synthetics/) helps you catch issues before your users do but, on its own, it doesn’t fully explain _why_ a request failed or _what_ went wrong behind the scenes. That’s where logs come in.

**A Typical Use Case: A Failed API Check**

You have a Synthetics [Browser](/docs/synthetics/browser-monitor/) or [HTTP](/docs/synthetics/http-monitor/) Monitor configured to test an API endpoint every minute. The following steps, also shown in the video below, are what you might do when you have Synthetics connected with Logs in Sematext.

- You get an alert: your monitor shows a spike in response times and failed checks.
- You open the [Synthetics App](/docs/synthetics/) and inspect the check details: your endpoint returns an internal server error.
- You click Troubleshoot, which takes you to  the [Connected](/docs/guide/connected-apps/) **Logs App** where you see errors and warnings that occurred around the same time.
- Next, you open the Logs App either in [Split Screen](https://sematext.com/docs/guide/split-screen/) or in a new tab to investigate further.
- The logs are filtered for errors and focus on the exact timestamp when the failure occurred.
- You discover repeated `NullPointerException errors` in your application logs right around the time the checks started failing, pointing to a recent deployment that introduced a bug.

**Without logs**, you'd be stuck guessing or opening up other tools. **With logs**, you have evidence and a clear root cause. 

To make it even easier to discover issues introduced by new deployments, add [deployment and change events](/docs/events/) to help you correlate spikes or failures with recent releases.

> While this example shows how you can pinpoint issues in production by jumping from Synthetics to Logs, our CI/CD integration lets you catch such issues earlier in the pipeline before they reach production. [Learn more](/docs/synthetics/ci-cd/overview/) on shift left testing with Synthetics.

TO DO: VIDEO HERE

**Another Example: Page Load Test Failing During Checkout**

- Your synthetic [User Journey](/docs/synthetics/user-journey-scripts/overview/) monitor tests your web app's login, browsing, and checkout flow.
- You receive a notification that the monitor failed during the checkout step.
- In Synthetics, you see the POST request to `/checkout` returned error.
- You open the **Logs App for your backend service**, with the same time window, and look for logs with status code 504 or error level logs.
- You find timeouts in the logs for the payment processor service and errors about slow database queries.

TO DO: VIDEO HERE

This cross-view confirms the backend service that your frontend depends on is struggling, possibly due to high load or DB issues.

## What You Need in Sematext Cloud to Catch These Issues

To correlate Synthetics with Logs, you need:

- A [Synthetics App](/docs/synthetics/) set up to monitor your API or website.
- A [Logs App](/docs/logs/) receiving logs from the backend service or infrastructure that the Synthetics monitor is testing.
- Ideally, [Connected Apps](/docs/guide/connected-apps/): make sure your Logs App is linked to your Synthetics App. This lets you switch from one to the other with single clicks or view synthetic metrics and logs in [Split Screen](/docs/guide/split-screen/) without switching context.

Synthetic checks are [location-based](/docs/synthetics/#locations), so in order to correlate them with logs, we recommend including endpoint paths, and service names in your log events.

## Best Practices for Correlation

- **Use tagging**: Ensure your logs include fields like `service`, `endpoint`, or `env` so you can filter logs based on the context of the synthetic test. The [Sematext Agent](/docs/agents/sematext-agent/) supports these fields out of the box. If you need additional context, you can also [configure the agent](/docs/agents/sematext-agent/custom-logs/) to enrich, parse, or ship logs based on your specific requirements.
- **Enable request/trace IDs**: If your application includes a request ID in responses and logs it server-side, you can [trace the full lifecycle of a synthetic check](/docs/synthetics/root-cause-discovery/root-cause-discovery-with-request-id/).
- Use [Sematext Agent](/docs/agents/sematext-agent/) to ensure the logs are shipped to Sematext with rich metadata.

## Final Thoughts

Synthetic monitoring tells you something is wrong. Logs tell you what went wrong. Combining the two is what gives you the full picture and lets you act quickly.

Sematext makes this easy with:

- [Split Screen](https://sematext.com/docs/guide/split-screen/) views of monitor data and logs side-by-side
- [Connected Apps](/docs/guide/connected-apps/) for quick navigation
- Filters and timestamps that help narrow down the root cause

Want to learn more? Check out the [Root Cause Discovery guide](/docs/synthetics/root-cause-discovery/overview/).
