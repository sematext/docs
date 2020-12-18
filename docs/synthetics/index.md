title: Sematext Synthetics Overview
description: Overview of Synthetics for API, Web URL, website and user journey monitoring

Sematext Synthetics provides the ability to actively monitor APIs, Web URLs, websites and user journeys/click flows from multiple locations around the globe. Synthetic monitoring helps you ensure the availability and performance of your APIs and websites. While [Experience](/experience) helps you track real user performance of your websites, Synthetics will help you identify downtime and performance by simulating the user requests and interactions with your web page. 

<img
  class="content-modal-image"
  alt="Monitors Overview"
  src="../images/synthetics/monitors-overview.png"
  title="Monitors Overview"
/>

## How it works

You start by creating a Synthetics [App](/guide/app-guide/). Under the App, you can create an HTTP or Browser monitor. HTTP monitors can be used to monitor any HTTP endpoints like HTTP APIs or Web URLs. An HTTP monitor sends an HTTP request to the specified URL with configured request settings and records the timings and response details. Browser monitors can be used to monitor websites and user journeys by writing a script that simulates user actions. The Browser monitor script executes in a browser and the performance is recorded. While creating the monitor you can specify a list of conditions that decides the result of the run.

No agent installation is required and there is no need to change your application code. The monitors will be periodically scheduled to run from specified locations in an isolated environment. For example, a monitor scheduled to run every 15 minutes from 3 locations will run 12 times in an hour (and 8640 times a month). The monitor will run on average every 5 minutes in each 15 minutes interval.

The result of each run will be evaluated against the set of conditions specified during the creation. When a condition fails, the run is considered failed. On run failure, you will be alerted based on configured [notification hooks](/integration/#notification-hooks).

## Locations

Synthetics monitors can be scheduled to run from the following public locations:

| AMERICAS  | EUROPE  | ASIA PACIFIC  |
|---|---|---|
| N. Virginia, USA  |  Ireland, Europe | Mumbai, India  |
| N. California, USA  |  Frankfurt, Germany | Singapore  |
| São Paulo, Brazil  |   | Sydney, Australia  |

You can also install and run the [agents](./private-locations.md) in your private network to monitor your internal applications that are not accessible from Internet.