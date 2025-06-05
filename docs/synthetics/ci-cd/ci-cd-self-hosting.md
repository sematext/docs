title: Self-hosting a GitHub Actions runner
description: An example of how to work around limitations regarding GitHub Actions Minutes

If your setup is such that you find yourself running a lot of GitHub Actions, you've probably noticed how quickly those action minutes can add up. We certainly did! This page talks about how we circumvented those issues, in order to hopefully give you an idea about how you can reduce your GitHub Actions spending as well.



## Why we moved to self-hosting

At Sematext, we run various GitHub workflows for our CI/CD pipeline, testing, preview environment cost optimization, and more. While monitoring our usage, we discovered an interesting pattern:

- We were consuming approximately **1,500 GitHub Actions minutes per month** for our Synthetics CI/CD setup alone
- About **40% of this time (600 minutes)** was consumed by a single workflow that was designed to be very light and fast, typically finishing in just **6-7 seconds**

The problem? GitHub bills Actions usage with ***minute-level granularity***. This means our 6-second workflow was being billed as a full minute every time it ran. ***We were essentially wasting 90% of the billed duration*** for this simple workflow.



## Our solution: Self-Hosted Runner service

To optimize our GitHub Actions usage, we converted this frequently-run workflow into [a lightweight self-hosted Go service](https://github.com/sematext/gh-runner). This simple change reduced our total GitHub Actions minutes usage by 40% without sacrificing any functionality.

The self-hosted runner is a small application written in Go that:
- Runs persistently on the Kubernetes cluster for our test environment
- Listens for deployment events that occur when a preview environment becomes available
- Fetches commit information from our deployment repository
- Dispatches events to the appropriate repository

Since this service runs on our own infrastructure, we only pay for the minimal compute resources it uses - not rounded-up GitHub Actions minutes.



## How we changed our workflow

### Original flow (using GitHub Actions)

Our original CI/CD flow involved four steps:

1. **Jenkins** builds the services for a PR environment
2. **ArgoCD** deploys the environment and sends an event to the `deployment` repository
3. The **GitHub Actions workflow** on the `deployment` repo performs its work and sends a `repository_dispatch` event to the `sematext-cloud` repository
4. The **Synthetics CI/CD action** runs on the `sematext-cloud` repository


### Optimized flow (with the Self-Hosted Runner)

The new flow replaces the GitHub Actions workflow with our self-hosted service:

1. **Jenkins** builds the services for a PR environment
2. **ArgoCD** deploys the environment and sends an event to the **Self-Hosted Runner**
3. The **Self-Hosted Runner** performs the functional equivalent of what the GitHub workflow used to do
4. The **Synthetics CI/CD action** runs on the `sematext-cloud` repository

The functionality remains identical, but we've eliminated the GitHub Actions overhead for this frequently-run operation, and the changes we had to make in the other parts of our setup (namely **ArgoCD**) were minimal.



## Implementation details

The [self-hosted runner](https://github.com/sematext/gh-runner) is implemented as a Go service that exposes a simple HTTP API. Here's what it does:

- Listens for deployment notifications via a `/dispatch` endpoint
- Fetches configuration from the deployment repository to determine which commit to test
- Sends repository dispatch events to trigger the actual CI/CD tests

The service is designed to be lightweight and stateless, making it perfect for running in a containerized environment. You can find the example implementation in our repository, including:

- `main.go` - The core service implementation
- `Dockerfile` - For containerizing the service
- `README.md` - Setup and configuration instructions

**Note:** Since this implementation is tailored to our specific workflow at Sematext, you'll need to adapt it to match your own CI/CD setup. The code serves as an example of how to:
- Convert a GitHub workflow to a self-hosted application
- Interact with GitHub's APIs programmatically
- Handle repository dispatch events outside of GitHub Actions



## Results and next steps

By self-hosting just this one lightweight workflow, we achieved:

- A **40% reduction** in total GitHub Actions minutes usage for this feature
- **No loss of functionality** - the CI/CD pipeline works exactly as before
- **Minimal maintenance overhead** - the service is simple and rarely needs updates

We chose not to convert our main CI/CD workflow because this optimization alone provided sufficient cost savings for our needs. However, if you're interested in converting more complex workflows or need some advice for your specific use case, feel free to contact us at support@sematext.com.
