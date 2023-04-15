title: Travis CI Integration
description: Guide on how to integrate Sematext Synthetics with Travis CI.

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