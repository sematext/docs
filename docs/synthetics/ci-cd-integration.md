title: CI/CD Integration
description: Guide to how to run HTTP/Browser monitors from your CI/CD pipeline.

In addition to scheduled monitor runs, you can also trigger monitor runs by using an API. You can use this API to trigger monitor runs as part of your CI/CD pipeline and block deployments if runs fail. When a run fails, you'll be alerted via your configured alert [notification hooks](../alerts/alert-notifications.md). Please see [Using the API](./using-the-api.md) for more information.

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

Create a secret from the repository's **Settings** page for the Sematext API Key.

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
  alt="CI/CD GitHub Actions Logs"
  src="../../images/synthetics/ci-cd-github-actions-log.png"
  title="GitHub Actions Logs"
/>


### Bitbucket Pipelines

**Create API Key Secret**

Create a secret from the **Repository Settings** -> **Repository Variables**, for Sematext API Key.

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

Create a CI/CD variable from **Settings** -> **CI/CD** -> **Variables** for the Sematext API Key.

<img
  class="content-modal-image"
  alt="CI/CD GitLab Secret"
  src="../../images/synthetics/ci-cd-gitlab-secret.png"
  title="Add Secret in GitLab"
/>

**Configure Run Monitor Step in Pipeline YAML**

Configure the run monitor stage in `.gitlab-ci.yml` to trigger a run after deployment and upload the artifacts.

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

Configure a [GitHub Action](#github-actions) to run the monitor on a deployment event. If the Vercel project repository is on GitHub, the action will be automatically triggered on a PR or production deployment.

### Netlify

Configure a [GitHub Action](#github-actions) to run the monitor on a deployment event. If the Netlify project repository is on GitHub, the action will be automatically triggered on a production deployment.
