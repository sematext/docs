title: GitHub Webhook Events Integration
description: GitHub Webhooks allow you to build or set up integrations, such as GitHub Apps or OAuth Apps, which subscribe to certain events on GitHub.com.

By configuring the Webhook to point to Sematext, you can store all data about the triggered events in one place. Gain insight into your entire GitHub workflow in your Organization.

## GitHub Webhook Events Quick Start

When an events is triggered, GitHub sends an HTTP POST payload to the Webhook's configured URL. Webhooks can be used to update an external issue tracker, trigger CI builds, update a backup mirror, or even deploy to your production server. You're only limited by your imagination. 

Gain insights into your Organization's team pulse, patterns, metrics, development velocity, progress, trends, to spot opportunities for improvement in the daily workflow. Keep your team happy and help enable them to be happier and more productive.

The Sematext GitHub Logs Integrations supports these events:

- Commit comments
- Branch or tag creation
- Branch or tag deletion
- Issues
- Issue comments
- Pull requests
- Pull request reviews
- Pull request review comments
- Pushes
- Releases

You can configure a Webhook to send events to Sematext either through the Github UI or with their API.

## Set Up A GitHub Webhook In The GitHub UI

Open the Organization or Repository settings, navigate to Webhooks and click the Add webhook button.

![](https://cdn.sematext.com/images/github-settings-hooks-framed.png)

Add the Payload URL.

```
https://logs-github-receiver.sematext.com/github/<LOGS_TOKEN>

# Or for EU
https://logs-github-receiver.eu.sematext.com/github/<LOGS_TOKEN>
```

![](https://cdn.sematext.com/images/github-settings-manage-hooks-us-add-url-framed.png)

Check the supported Events and Save the Webhook.

![](https://cdn.sematext.com/images/github-settings-manage-hooks-pick-events-framed.png)

Save the Webhook.

## Set Up A GitHub Webhook Using The GitHub API

First create a new API token. Open the Personal Access tokens settings in your GitHub account. It should be <a href="https://github.com/settings/tokens" target="_blank" ref="nofollow">here</a>. Click `Generate new token`. The only permissions you need are related to hooks.

![](https://cdn.sematext.com/images/github-token-permissions-framed.png)

Finish creating the token and save it somewhere safe. You will need it in the next step.

Now you need to create a webhook. Using cURL you can now create a new Webhook in any Organization or Repository you have access to.

### Organization

```bash
curl -X POST \
  https://api.github.com/orgs/<ORGANIZATION_NAME>/hooks \
  -H 'authorization: token <YOUR_API_TOKEN>' \
  -H 'cache-control: no-cache' \
  -d '{ 
  "config": { 
    "url": "https://logs-github-receiver.sematext.com/github/<LOGS_TOKEN>" 
    # for EU "url": "https://logs-github-receiver.eu.sematext.com/github/<LOGS_TOKEN>" 
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

### Repository

```bash
curl -X POST \
  https://api.github.com/repos/<GITHUB_USERNAME>/<REPOSITORY_NAME>/hooks \
  -H 'authorization: token <YOUR_API_TOKEN>' \
  -H 'cache-control: no-cache' \
  -d '{ 
  "config": { 
    "url": "https://logs-github-receiver.sematext.com/github/<LOGS_TOKEN>" 
    # for EU "url": "https://logs-github-receiver.eu.sematext.com/github/<LOGS_TOKEN>" 
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
