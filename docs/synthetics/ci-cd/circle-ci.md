title: Circle CI Integration
description: Guide on how to integrate Sematext Synthetics with Circle CI.

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