title: GitHub Actions Integration
description: Guide on how to integrate Sematext Synthetics with GitHub Actions.

**Create API Key Secret**

Create a secret from the repository's **Settings** page for the Sematext API Key.

![CI/CD GitHub Secret](./images/ci-cd-github-secret.png)

**Add Run Monitor Job to GitHub Action Workflow YAML**

Create `.github/workflows/run-monitor.yml` GitHub Actions YAML to run your monitors on various CI/CD events. For example, to run the monitor after a deployment event, create a GitHub Action Job that gets executed on `deployment_status` event. The below action uses the `deployment_status.target_url` to pass the custom URL to the run monitor API.

```yaml
name: CI

# Execute the run monitor job on deployment status event
on:
  deployment_status:

jobs:
  run_monitor:
    runs-on: ubuntu-latest
    outputs:
      output1: ${{ steps.run.outputs.test }}

    steps:
      - uses: actions/checkout@v2

      - name: Run Sematext Monitor
        env:
          API_KEY: ${{ secrets.SEMATEXT_API_KEY }}
        id: run
        run: |
          target_url=`cat "$GITHUB_EVENT_PATH" | jq .deployment_status.target_url`
          curl -s --request POST \
            --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
              --header 'authorization: apiKey '$API_KEY \
                --header 'accept: text/plain' \
                  --header 'content-type: application/json' \
                    --data '[{"monitorId": 276, "url":'$target_url'}]' > results.txt
          cat results.txt
          if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
```

**GitHub Actions Logs**

On every deployment event, the action will be invoked and the action logs will contain the results.

![CI/CD GitHub Actions Logs](./images/ci-cd-github-actions-log.png)