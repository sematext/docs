title: GitHub Integration for CI/CD Monitors
description: Guide for integrating GitHub with CI/CD Monitors, running HTTP and Browser tests, shifting left, and testing before production.

While Synthetics monitors are predominantly used to monitor a website at regular intervals, it's also possible to invoke them as part of your CI/CD pipelines using the **CI/CD Monitors** and **Monitor Groups** features, so that you can run them on-demand to test the availability of your services or implement regression tests that run as soon as the new version of your website becomes available.

Traditional Synthetics Monitors are ideal for ongoing, regular checks, but CI/CD Monitors are specifically designed for continuous, pre-release testing. These monitors can be automatically triggered as part of your CI/CD pipelines—whenever code is pushed, pull requests are opened, or new versions are deployed. This setup supports shift-left testing, enabling earlier detection of issues and minimizing the risk of production incidents.

While Synthetics monitors are primarily used for regular website monitoring, they can also be integrated into CI/CD pipelines through the CI/CD Monitors and Monitor Groups features. This allows you to run tests on demand, verifying the availability of your services or running regression tests as soon as a new version of your website is available.

In this guide, we'll walk you through the process of setting up CI/CD Monitors on Sematext Cloud and show you how to use the [Sematext CI/CD GitHub Action](TODO_INSERT_OFFICIAL_GH_ACTION_LINK) to automatically trigger monitor runs as part of your CI/CD workflows.

## Prerequisites
Before you begin, make sure you have the following:

- [Synthetics App](https://sematext.com/docs/synthetics/getting-started/) in Sematext Cloud to create and manage monitors.
  - Don't worry about creating monitors just yet; simply have the App ready, and we'll guide you step by step on how to create a CI/CD monitor.
- GitHub repository you wish to run CI/CD monitors
  -  You'll need Admin permissions on the repository to access the settings and add repository secrets.   

Once you have these prerequisites ready, we can start by creating CI/CD monitors in Sematext Cloud.

## CI/CD Monitors

When creating a Synthetics monitor, you'll see that there's an option to designate that monitor as a **CI/CD Monitor**.

![Creating CI/CD Monitors](/docs/images/synthetics/cicd-monitor-creation.png)

> You can also convert your existing HTTP or Browser Monitors to CI/CD monitors and add them to CI/CD groups later. To do this, go to the monitor's Edit Monitor screen and toggle the CI/CD Monitor option in the General tab.

Use [HTTP Monitors](https://sematext.com/docs/synthetics/http-monitor/) for simple availability and performance checks, or [Browser Monitors](https://sematext.com/docs/synthetics/browser-monitor/) for more complex user journey tests, including multi-step scripts and resource usage monitoring. This flexibility allows you to test anything from a single API endpoint to a full login and checkout flow. 

### Setting up URLs

While creating a monitor, you'll be prompted to enter a URL. CI/CD pipeline integration supports shift-left testing, allowing you to test in your test and PR environments before deploying to production. Since PR environment URLs often change with each branch, it's common to use the **Dynamic URL** feature. To enable Synthetics monitors to run tests against different environments with varying URLs, you can use the Dynamic URL feature for CI/CD Monitors. This feature, available for both [HTTP](https://sematext.com/docs/synthetics/http-monitor/) and [Browser](https://sematext.com/docs/synthetics/browser-monitor/) monitors, lets you mark a certain part of the monitored URL as dynamic, allowing it to change with each run. By using a placeholder `<DYNAMIC_URL>` in your URLs, the placeholder will be replaced during execution with the specific URL provided in the run request.

For example, if your preview environments have changing URLs, such as `https://test-12.sematext.com` for one PR and `https://test-13.sematext.com` for the next, you can configure monitors with dynamic URLs to ensure your monitors always target the correct endpoints.

> Dynamic URL feature is toggled on by default. However, you can choose to turn it off and use static URLs if you'd like to test a fixed endpoint after each commit that triggers the CI/CD monitor checks.

#### An example of Dynamic URLs in action

To illustrate how this feature works, we'll use an example where we want to test three endpoints - `health`, `status` and `login`. Let's say you have a setup where you create a new testing environment for each Pull Request, with that environment's URL being dependant on the PR number. We could then have `pr-1227.test.myapp.com` and `pr-1246.test.myapp.com` as active environments which should both be tested once they are built to ensure they don't contain any breaking changes. By creating three **CI/CD Monitors** with the following URLs:
```
<DYNAMIC_URL>/health
<DYNAMIC_URL>/status
<DYNAMIC_URL>/login
```
and passing the URL in the run request -which the GitHub Action script will handle, as we'll show in the following pages-, we can use the same monitors for each of our environments - so we could test `pr-1227.test.myapp.com/health` and `pr-1246.test.myapp.com/health` with our `<DYNAMIC_URL>/health` monitor.

Here's where you can configure this setting for HTTP monitors. Make sure to include the `<DYNAMIC_URL>` placeholder in the URL, then add whatever path you need to query the specific endpoint you want to test.

![Dynamic URL for CI/CD HTTP Monitors](/docs/images/synthetics/cicd-dynamic-url-http.png)

For Browser monitors, we'd just have `<DYNAMIC_URL>` somewhere in the script (or in the URL, if the monitor isn't configured to run a custom script), which would then get replaced with the actual URL.

![Dynamic URL for CI/CD Browser Monitors](/docs/images/synthetics/cicd-dynamic-url-browser.png)

After entering the appropriate URL, select the location from which you want to run the monitor and click **Continue** to proceed. For this simple example, you can skip the remaining configuration steps and just click **Save** to create the monitor.

However, if you want to set up alert conditions or customize request parameters, you can do that now or adjust these settings later as needed.

## CI/CD Groups

When running tests for your projects, you’ll often need to monitor multiple endpoints and user journeys. For example, if you want to test the following endpoints on each commit:
```
<DYNAMIC_URL>/health  
<DYNAMIC_URL>/status  
<DYNAMIC_URL>/login  
```
you’ll need to create a separate monitor for each URL. To make managing and running all your CI/CD monitors easier, you can group them together using **CI/CD Monitor Groups**, which can be created and viewed in the Synthetics sidebar.

![CI/CD Groups in the Sidebar](/docs/images/synthetics/cicd-group-sidebar.png)

> Note that, just like for [Status Pages](/docs/synthetics/status-pages/) and [Scheduled Pauses](/docs/synthetics/scheduled-pauses/), **CI/CD Groups** will only show up in the sidebar when you're in the general Synthetics overview, not in the overview for a specific Synthetics App. This also means that you can add monitors from any Synthetics App to any **CI/CD Group**, so you don't need to worry about having to keep all your CI/CD Monitors in the same App.


### Creating a CI/CD Group

Creating a **CI/CD Group** is simple:
- Select which monitors you want to add
  - Keep in mind that only **CI/CD Monitors** can be assigned to **CI/CD Groups**
- Assign a name to the group, which will be displayed in the sidebar
- Add a description to know what this **CI/CD Group** will be used for
- Add a GitHub URL to your repository, which will be used to quickly allow you to open commits and branches which were tested

![CI/CD Group Creation](/docs/images/synthetics/cicd-group-creation.png)

Once you have created a CI/CD Group, you'll need to invoke it from your GitHub repository. 

Refer to [the installation page](/docs/synthetics/ci-cd/ci-cd-installation/) for installation instructions and examples.

