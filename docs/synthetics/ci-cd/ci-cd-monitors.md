title: CI/CD Monitors and Monitor Groups
description: Information regarding the unique features CI/CD Monitors and Monitor Groups have and instructions on how to set them up

While Synthetics monitors are predominantly used to monitor a website at regular intervals, it's also possible to invoke them as part of your CI/CD pipelines using the **CI/CD Monitors** and **Monitor Groups** features, so that you can run them on-demand to test the availability of your services or implement regression tests that run as soon as the new version of your website becomes available.



## CI/CD Monitors

When creating a Synthetics monitor, you'll see that there's an option to designate that monitor as a **CI/CD Monitor**.

![Creating CI/CD Monitors](/docs/images/synthetics/cicd-monitor-creation.png)

This option will also be available when editing monitors.

![CI/CD Option When Editing HTTP Monitors](/docs/images/synthetics/cicd-monitor-editing-http.png)

![CI/CD Option When Editing Browser Monitors](/docs/images/synthetics/cicd-monitor-editing-browser.png)

You'll notice that you'll no longer be able to select the interval between automatically scheduled runs for a **CI/CD Monitor**. This is because these monitors run only when you explicitly send a run request, meaning you'll execute them on-demand and avoid cluttering their run results with potentially irrelevant automatically scheduled runs. The idea here is to use Synthetics monitors as regression tests for your projects by integrating them into your CI/CD pipeline, thus catching issues before they make it to production. To reflect this lack of a regularly scheduled interval, these monitors are marked with a special badge in the **Interval** column of the Monitors Overview table.

![CI/CD Monitors in the Monitors Overview Table](/docs/images/synthetics/cicd-monitors-overview.png)



## CI/CD Groups

When running tests for your projects, you'll most likely want to test a number of endpoints and User Journeys. To facilitate running all the **CI/CD Monitors** you need at once, you can group them together in **CI/CD Groups**. These can be created and viewed in the Synthetics sidebar.

![CI/CD Groups in the Sidebar](/docs/images/synthetics/cicd-group-sidebar.png)


### Creating a CI/CD Group

Creating a **CI/CD Group** is simple:
- Select which monitors you want to add
  - Keep in mind that only **CI/CD Monitors** can be assigned to **CI/CD Groups**
  - Similarly to [Status Pages](/docs/synthetics/status-pages/) and [Scheduled Pauses](/docs/synthetics/scheduled-pauses/), **CI/CD Groups** let you add monitors from various Synthetics Apps, so you don't need to worry about having to keep all your CI/CD Monitors in the same App.
- Assign a name to the group, which will be displayed in the sidebar
- Add a description to know what this **CI/CD Group** will be used for
- Add a GitHub URL to your repository, which will be used to quickly allow you to open commits and branches which were tested

![CI/CD Group Creation](/docs/images/synthetics/cicd-group-creation.png)

Once you have created a CI/CD Group, you'll need to invoke it from your GitHub repository. Refer to [this page](/docs/synthetics/ci-cd/ci-cd-installation/) for installation instructions and examples.


### Group Runs

Aside from letting you easily run a number of monitors at once, **CI/CD Groups** also group the results of all the monitors they run into **Group Runs**, giving you a clear overview of how many monitors in that group succeeded and failed, as well as providing some additional information such as the Git commit SHA and Git branch which each **Group Run** is associated with.

![CI/CD Group Runs Overview](/docs/images/synthetics/cicd-group-run-list.png)

You can then use that information to quickly see what went wrong, navigate to the relevant changes and speed up the process of troubleshooting the buggy code.

![CI/CD Group Run](/docs/images/synthetics/cicd-group-run.png)



## Dynamic URLs

To enable Synthetics monitors to run tests against different environments with different URLs, you can use the **Dynamic URL** feature for **CI/CD Monitors**. This feature, available for both HTTP and Browser monitors, lets you mark a certain part of a URL as dynamic - thus letting it change from run to run. This is done by using a placeholder `<DYNAMIC_URL>` as part of your URLs, which will be replaced during the actual run execution with the URL that you provide within the run request.


### An example of Dynamic URLs in action

To illustrate how this feature works, we'll use an example where we want to test three endpoints - `health`, `status` and `login`. Let's say you have a setup where you create a new testing environment for each Pull Request, with that environment's URL being dependant on the PR number. We could then have `pr-1227.test.myapp.com` and `pr-1246.test.myapp.com` as active environments which should both be tested once they are built to ensure they don't contain any breaking changes. By creating three **CI/CD Monitors** with the following URLs:
```
<DYNAMIC_URL>/health
<DYNAMIC_URL>/status
<DYNAMIC_URL>/login
```
and passing the URL in the run request, we can use the same monitors for each of our environments - so we could test `pr-1227.test.myapp.com/health` and `pr-1246.test.myapp.com/health` with our `<DYNAMIC_URL>/health` monitor.


### Setting up Dynamic URLs

Here's where you can configure this setting for HTTP monitors. Make sure to include the `<DYNAMIC_URL>` placeholder in the URL, then add whatever path you need to query the specific endpoint you want to test.

![Dynamic URL for CI/CD HTTP Monitors](/docs/images/synthetics/cicd-dynamic-url-http.png)

For Browser monitors, we'd just have `<DYNAMIC_URL>` somewhere in the script (or in the URL, if the monitor isn't configured to run a custom script), which would then get replaced with the actual URL.

![Dynamic URL for CI/CD Browser Monitors](/docs/images/synthetics/cicd-dynamic-url-browser.png)
