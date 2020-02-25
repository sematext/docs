title: Logagent input plugin for GitHub Webhook Events
description: Logagent features modular logging architecture framework where each input or output module is implemented as a plugin. Logagent can receive GitHub Webhook events via HTTP. 

## Input Plugin: GitHub Webhook Events

Input plugin to receive GitHub Webhook Events via HTTP and send them to Sematext Events.

Features:

- List all crucial GitHub events in the Sematext Events stream

Applications:

- centralize GitHub Webhook Events
- act as Webhook to receive GitHub Webhook Events
- index GitHub Webhook Events in Elasticsearch or Sematext Cloud
- create alerts on GitHub Webhook Events in Sematext Cloud


Requirements: 

- configure the GitHub API to send Events via Webhook 

### Configuration

```yaml
# github.yml

input:
  github-webhook:
    module: input-github-webhook
    port: 9200
    useIndexFromUrlPath: true
    tags:
      - github
      - webhook
      - notification
      
output: 
  st-events:
    module: output-sematext-events
    receiver: https://event-receiver.apps.sematext.com

```

Start Logagent:

```bash
logagent --config github.yml
```

This will start a Node.js server and run on port 9200.

Once you've done that, go ahead and create a Monitoring App in Sematext. Grab the TOKEN and keep it somewhere safe.

The Logagent server will listen for API calls on port 9200 (default) to the `/github/<MONITORING_APP_TOKEN>` route. To configure routing GitHub Webhook Events to Sematext Events you need to enable it through the GitHub API.

The final full URL you need to configure the GitHub API will be `https://<YOUR_DOMAIN>/github/<MONITORING_APP_TOKEN>`.

You need to run the command below to tell the GitHub API to send Webhooks events to this Logagent GitHub input plugin.

```bash
curl -X POST \
  https://api.github.com/repos/<YOUR_GITHUB_USERNAME>/<YOUR_GITHUB_REPO>/hooks \
  -H 'authorization: token <YOUR_GITHUB_API_V3_TOKEN>' \
  -H 'cache-control: no-cache' \
  -d '{
  "config": {
  	"url": "https://<YOUR_DOMAIN>/github/<TOKEN>"
  },
  "events": [
	"issues",
    "issue_comment",
    "pull_request",
    "pull_request_review",
    "pull_request_review_comment",
    "commit_comment",
    "push",
    "release",
    "create",
    "delete"
  ]
}'
```

That's it. GitHub will send events to your Logagent instance and this GitHub input plugin will funnel events to the Sematext Events stream.

![](https://sematext.com/wp-content/uploads/2020/02/apps.test_.sematext.com_ui_events_endDate1581951767431startDate1581857899717.png)