title: CI/CD Integration
description: Guide to how to run HTTP/Browser monitors from your CI/CD pipeline.

In addition to scheduled monitor runs, you can also trigger monitor runs by using an API. You can use this API to trigger monitor runs as part of your CI/CD pipeline and block deployments if runs fail. When a run fails, you'll be alerted via your configured alert [notification hooks](../alerts/alert-notifications.md). The run monitor API can be used to:

* Test the APIs, websites, and the user journeys in your PR and staging environments and annotate the pull requests with the results. 
* Test the APIs, websites, and the user journeys in production immediately after deployment and alert when it fails.
* Track and catch major changes in website metrics like page load time, page size, request count, 3rd Party API performance, etc introduced as part of code changes.

## Run Monitor API

The run monitor API can be triggered by sending an HTTP request with the below configuration:

**US Region Endpoint** - `https://apps.sematext.com/synthetics-api/api/v3/apps/<appId>/monitors/runs`

**EU Region Endpoint** - `https://apps.eu.sematext.com/synthetics-api/api/v3/apps/<appId>/monitors/runs`

**HTTP Method** - `POST`

**Request Headers** - `Authorization: apiKey <apiKey>`

**Request Body**
```json
[
    {
        "monitorId": <monitorId-1>,
        "locations": [<locationId-1>, <locationId-2>,...],
    },
    {
        "monitorId": <monitorId-2>,
        "locations": [<locationId-1>, <locationId-2>,...],
    },
    ...
]
```

* The `<appId>` and `<monitorId>` values can be extracted from the URL of the Monitor Overview page. For example, if the Monitor Overview page URL is `https://apps.sematext.com/ui/synthetics/12345/monitors/276` then the `appId` is `12345` and `monitorId` is `276`.
* `<apiKey>` of your account can be copied from Settings -> API page.
* `<locationId>` - List of locations to run the monitor from. If not specified, the monitor will be run from all locations specified in the monitor configuration. The supported locations are:

| Location ID  | Location |
|---|---|
| us-east-1      | N. Virginia, USA   |
| eu-west-1      | Ireland            |
| ap-south-1     | Mumbai, India      |
| ap-southeast-1 | Singapore          |
| ap-southeast-2 | Sydney, Australia  |
| eu-central-1   | Frankfurt, Germany |
| sa-east-1      | São Paulo, Brazil  |
| us-west-1      | N. California, USA |


**Example Request**

The below API triggers runs for monitors with ID `276` and `335` belonging to App with ID `12345` from locations `N.Virginia, USA`, `Mumbai, India` and `N.Virginia, USA`, `Ireland, Europe` respectively.

```sh
curl --request POST \
  --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
  --header 'Authorization: apiKey 1d7a2d6b-xxxx-xxxx-xxxx-10f83c5c8da7' \
  --header 'Content-Type: application/json' \
  --data '[
    {
        "monitorId": 276,
        "regions": ["us-east-1","ap-south-1"]
    },
    {
        "monitorId": 335,
        "regions": ["us-east-1","eu-west-1"]
    }
]'
```

### Customize Request Configuration

There are cases where you might want to customize request parameters depending on the environment. For example, the deployment URL for running the monitor in a PR env or a different HTTP header for the staging environment. You can pass these custom configurations as part of run monitor API data. When the custom values are passed the configured values for scheduled runs will be overridden with the custom values.

For [HTTP monitors](./http-monitor.md), the following fields can be customized:

* URL
* Request Headers
* Request Cookies
* Request Params
* Request Body

Below is an example, where we are override the HTTP configuration parameters:

```sh
curl --request POST \
  --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
  --header 'Authorization: apiKey 1d7a2d6b-xxxx-xxxx-xxxx-10f83c5c8da7' \
  --header 'Content-Type: application/json' \
  --data '[
    {
        "monitorId": 276,
        "url": "https://pr-2589.app.acme.com",
        "headers": [
            {
                "name": "Authorization",
                "value": "pr-env-key"
            }
        ]
    }
]'
```

For [Browser monitors](./browser-monitor.md), the URL of the website can be customized.

For Browser monitors with a script, you can pass custom parameters as variables, that could be referenced in the script.

### Customize Output Format

By default the API output will be in JSON format. While invoking the API in build pipelines, it might be useful to display the output in a table format, so that the output could be easily interpreted. To get the output in table format, set the `Accept` header to `text/plain`. The API response contains the summary of the request and lists the individual run results with the link to the run result page. Below is an example request along with the output:

```sh
curl -s --request POST --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs --header 'authorization: apiKey 1d7e2d6b-xxxx-xxxx-xxxx-10f83c5a8da7' --header 'accept: text/plain'        --header 'content-type: application/json' --data '[{"monitorId": 276}]' 

All monitors passed successfully.
Name            ID  Region      Status  Conditions  URL
AllLocations    276 us-east-1   passed  3/3 Passed  https://apps.sematext.com/ui/synthetics/12345/monitors/276/runs/5173798
AllLocations    276 us-west-1   passed  3/3 Passed  https://apps.sematext.com/ui/synthetics/12345/monitors/276/runs/5173805
AllLocations    276 ap-south-1  passed  3/3 Passed  https://apps.sematext.com/ui/synthetics/12345/monitors/276/runs/5173800
```

## Integrations

Using the run monitor API, you can integrate [Sematext Synthetics](./index.md) to your CI/CD pipeline. Below are the steps to trigger monitor runs from various CI/CD tools.

### Jenkins

**Create API Key Secret**

Create a secret credential for Sematext API Key to be used in the run monitor API request.

<img
  class="content-modal-image"
  alt="CI/CD Jenkins Credentials"
  src="../../images/synthetics/ci-cd-jenkins-secret.png"
  title="Add Secret Credential in Jenkins"
/>

**Add Run Monitor stage to the pipeline in Jenkinsfile**

Add a stage in the Jenkinsfile to invoke the run monitor API, check the results, and exit the pipeline on failure. 

```groovy
stage('Run Sematext monitors') {
      withCredentials([string(credentialsId: 'SEMATEXT_API_KEY', variable: 'SEMATEXT_API_KEY')]) {
        sh """
            curl -s --request POST \
              --url https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs \
                --header 'authorization: apiKey ${SEMATEXT_API_KEY}' \
                  --header 'accept: text/plain' \
                    --header 'content-type: application/json' \
                      --data '[{"monitorId": 276}]' > results.txt
            cat results.txt
            if [ \$(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
          """
      }
    }
```

### Travis CI

Update `.travis.yaml` to include `after_deploy` phase to trigger a monitor run after the deployment. Define `SEMATEXT_API_KEY` as an environment variable in [Repository Settings](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings).

```yaml
# This example deploys a nodejs project in heroku and triggers a monitor run after the deployment. 
language: node_js
node_js:
  - 10
cache:
  directories:
    - node_modules
script:
  - npm run test:unit
  - npm run build
before_deploy: "echo 'Deploying.'"
deploy:
  provider: heroku
  api_key: $HEROKU_API_KEY
  app: my-heroku-website

after_deploy: 
  - echo 'Deployment finished. Running Sematext Synthetics monitors..'
  - curl -H "authorization:apiKey $SEMATEXT_API_KEY" -H "accept:text/plain" -H "content-type:application/json" -s -X POST -d "[{\"monitorId\":276}]" https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs > results.txt
  - cat results.txt
  - if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
```

### Circle CI

Update `.circleci/config.yml` to trigger a monitor run after the deployment. Define `SEMATEXT_API_KEY` as an environment variable under [Project Settings](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project).

```yaml
version: 2.1
jobs:
  build:
    docker:
      - image: circleci/node:15.0.1
    steps:
      - checkout
      - run:
          name: Setup
          command: |
            echo "Setup starting..."
            npm install
      - run:
          name: Build
          command: |
            echo "Building..."
            npm run build
      - run:
          name: Test
          command: |
            echo "Running tests..."
            npm run test:unit
      - run:
          name: Deploy
          command: 
            echo "Deploying the App..."
            # Deploy your App
      - run:
          name: Trigger Sematext run monitor
          command: |
            echo 'Deployment finished. Running Sematext Synthetics monitors..'
            curl -H "authorization:apiKey $SEMATEXT_API_KEY" -H "accept:text/plain" -H "content-type:application/json" -s -X POST -d "[{\"monitorId\":276}]" https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs > results.txt
            cat results.txt
            if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
```

### Github Actions

**Create API Key Secret**

Create a secret from the Repository Settings, for Sematext API Key.

<img
  class="content-modal-image"
  alt="CI/CD GitHub Secret"
  src="../../images/synthetics/ci-cd-github-secret.png"
  title="Add Secret in Github"
/>

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

<img
  class="content-modal-image"
  alt="CI/CD GitHub Secret"
  src="../../images/synthetics/ci-cd-github-actions-log.png"
  title="Add Secret in Github"
/>


### Bitbucket Pipelines

**Create API Key Secret**

Create a secret from the Repository Settings -> Repository Variables, for Sematext API Key.

<img
  class="content-modal-image"
  alt="CI/CD Bitbucket Secret"
  src="../../images/synthetics/ci-cd-bitbucket-secret.png"
  title="Add Secret in BitBucket"
/>

**Add Run Monitor Job to Bitbucket Pipeline Workflow YAML**

Add Run Monitor step to `bitbucket-pipelines.yml`. Add the below steps after the deploy step in your pipeline configuration.

```yaml
image: node:10.15.3

pipelines:
  custom:
    sematext:
      - step:
          script:
            - curl -H "authorization:apiKey $SEMATEXT_API_KEY" -H "accept:text/plain" -H "content-type:application/json" -s -X POST -d "[{\"monitorId\":276}]" https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs > results.txt
            - cat results.txt
            - if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi

```

### GitLab CI/CD

**Create API Key Variable**

Create a CI/CD variable from the Settings -> CI/CD -> Variables, for Sematext API Key.

<img
  class="content-modal-image"
  alt="CI/CD GitLab Secret"
  src="../../images/synthetics/ci-cd-gitlab-secret.png"
  title="Add Secret in GitLab"
/>

**Configure Run Monitor Step in Pipeline YAML**

Configure run monitor stage in `.gitlab-ci.yml` to trigger run after deployment and upload the artifacts.

```yaml
stages:
  - deploy
deploy-app:
    stage: deploy
    image: docker:stable
    script:
      - echo "script to deploy your App"
run-sematext-monitor:
    stage: .post
    image: docker:stable
    before_script:
    - apk add --update curl && rm -rf /var/cache/apk/*
    script:
        - curl -H "authorization:apiKey $SEMATEXT_API_KEY" -H "accept:text/plain" -H "content-type:application/json" -s -X POST -d "[{\"monitorId\":276}]" https://apps.sematext.com/synthetics-api/api/v3/apps/12345/monitors/runs > results.txt
        - cat results.txt
        - if [ $(head -1 results.txt | grep -c 'failed') -ne 0 ]; then exit 1; fi
    artifacts:
        expose_as: 'Sematext Monitor Results'
        paths: ['results.txt']
```

### Vercel

Configure [GitHub Action](#github-actions) to run the monitor on deployment event. If the Vercel project repository is GitHub, the action will be automatically triggered on PR or production deployment.

### Netlify

Configure [GitHub Action](#github-actions) to run the monitor on deployment event. If the Netlify project repository is GitHub, the action will be automatically triggered on production deployment.