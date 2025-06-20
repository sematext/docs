title: CI/CD FAQ
description: FAQs for Sematext Synthetics CI/CD integration. Use it to run on-demand shift-left or regression tests before production.

### I'm running out of GitHub Actions Minutes when using your Synthetics CI/CD integration. How can I work around this?

We had a similar issue since we run many other workflows too, so the usage added up for us as well. You can try a self-hosted approach, for which we provided an example [here](/docs/synthetics/ci-cd/ci-cd-self-hosting).

### How can I ensure my CI/CD User Journey checks don’t slow down the pipeline?

Keep your synthetic tests fast by focusing only on critical user flows. It’s often not feasible to test your entire application in CI/CD, especially if it's complex. Prioritize speed and impact.

### What should I do if my CI/CD User Journey scripts break due to missing data in preview environments?

Don’t assume test data exists. Preview environments often have clean databases. Have your scripts generate the necessary data up front and include checks to verify it before proceeding.

### How can I ensure my CI/CD tests clean up after themselves in shared environments?

If your environment isn't ephemeral, ensure your scripts clean up test data after running. Ideally, perform cleanup via the UI to also test that flow, and fall back to API cleanup on errors.

### How should I handle environment specific configs in CI/CD test setups?

Use environment variables to manage differences like:

- **SSL**: Self-signed certs in preview environments
- **Feature flags**: Enabled/disabled features
- **Third-party integrations**: Sandbox or mocks
- **Authentication**: Different providers or simplified flows

### Should my CI/CD User Journey scripts include performance assertions?

Yes. Don’t just check behavior, also include load times, responsiveness, and performance metrics to detect bottlenecks early. You can [extract these metrics](/docs/synthetics/metrics/#custom-metrics) from each run and use them for charting or setting up alerts.

### When should I trigger User Journey checks in CI/CD workflows?

Run them on PRs or pushes to main, but don’t over trigger them. GitHub bills even fast Actions as 1 full minute. If that adds up, a [self-hosted runner](/docs/synthetics/ci-cd/ci-cd-self-hosting) is a good alternative.

### How do I manage dynamic URLs for PR environments?

Use Sematext's [Dynamic URLs](/docs/synthetics/ci-cd/overview/#dynamic-urls) feature. Define a base URL as a variable and build test paths from that to keep scripts reusable across PR environments.

### How can I deal with instability or slowness in preview environments during CI/CD testing?

Expect resource limitations. Watch for flaky failures, use retries, and break up long flows into multiple monitors if needed. 

### How can I write maintainable User Journey scripts for CI/CD use?

Treat scripts as production code:

- Add comments
- Use abstraction
- Version control them (e.g., in GitHub)
- Use Sematext’s GitHub sync to keep them up to date

### How do I prevent CI/CD monitors from interfering with each other during parallel execution?

[Group monitors](/docs/synthetics/ci-cd/overview/#cicd-groups) run in parallel, so isolate test data and avoid conflicts. This prevents one test from affecting another.

### How can I get alerted when CI/CD checks fail?

Don’t rely solely on GitHub logs. Integrate alert notifications with Slack, email, or other [Notification Hooks](/docs/alerts/alert-notifications/) so you’re notified immediately when something breaks.

