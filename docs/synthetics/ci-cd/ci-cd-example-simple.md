title: Example - Simple Deployment Setup
description: A showcase of how to set up the CI/CD integration when our deployment setup is handled within GitHub and contains contextual information needed to link the deployment event to a specific commit

If your setup is such that you create deployments within GitHub (like through automatic deployment tools such as Vercel), you can make the workflow for this action trigger on the `deployment_status` event and simply configure the variables needed for the action. Because of the simplicity of such a setup, the only required permissions are those that allow the workflow to read the deployment event and extract the URL of the environment that's being tested.


## Workflow example

Save the following file as `.github/workflows/sematext_synthetics_check.yaml`. Make sure to push it to your **main branch**, as that's where GitHub fetches workflows from when it's about to execute them.

Remember that you should edit the variables which are sent to the action as per the instructions provided in the comments next to them. 

```
MONITOR_GROUP_ID: <your_monitor_group_id>               # Replace with your actual [Monitor Group ID](/docs/synthetics/ci-cd/ci-cd-installation#the-sematext-cicd-github-action)
REGION: <region>                                        # Replace with your Sematext Cloud Region ('EU' or 'US')
```

The first step is to extract the URLs. If you're using Vercel, this is already handled for you, so no further action is needed.  If you're not using Vercel, then simply extract the URL you want to run the tests for (the `DEPLOYMENT_URL` variable) in a way compatible with how your setup is configured. If there's only one URL that you plan on monitoring, then you can turn the **Dynamic URL** option off for your monitors and avoid passing any `TARGET_URL` to the action.

```yaml
name: Trigger Sematext Synthetics Tests

on:
  deployment_status

permissions:
  contents: read   # Allows us to read the URL from the deployment event

jobs:
  sematext_synthetics_check:
    runs-on: ubuntu-latest
    steps:
      - name: Get Vercel Deployment URL
        id: vercel_deployment_url
        run: |
          echo "DEPLOYMENT_URL=$(cat "$GITHUB_EVENT_PATH" | jq .deployment_status.target_url)" >> $GITHUB_ENV

      - name: Run Sematext Synthetics CI/CD Integration
        id: sematext_action
        uses: hssalman/cicd-repo-action@v0.9.3
        with:
          MONITOR_GROUP_ID: 42                                # Replace with your actual Monitor Group ID
          REGION: 'US'                                        # Replace with your Sematext Cloud Region ('EU' or 'US')
          SEMATEXT_API_KEY: ${{ secrets.SEMATEXT_API_KEY }}   # Make sure to add your Sematext API key as a repository secret first
          TARGET_URL: ${{ env.DEPLOYMENT_URL }}               # Use the URL that's autodeployed by Vercel as the replacement for <DYNAMIC_URL>
          USE_HEAD_SHA: true

      - name: Process Results
        if: always()
        run: |
          if [ "${{ steps.sematext_action.outputs.status }}" == "failed" ]; then
            echo "::error::Sematext Synthetics Tests Failed!"
            echo "Group Run URL: ${{ steps.sematext_action.outputs.group_run_url }}"
            echo "Error details: ${{ steps.sematext_action.outputs.error }}"
            echo "Test Result: ${{ steps.sematext_action.outputs.result }}"
            exit 1
          fi

          echo "::notice::Sematext Synthetics Tests Passed!"
          echo "Group Run URL: ${{ steps.sematext_action.outputs.group_run_url }}"
          echo "Test Result: ${{ steps.sematext_action.outputs.result }}"
```

Here's an quick overview of how the workflow works:

- It's initiated on the `deployment_status` event
  - Note that this means it can also initiate if the deployment isn't successful, so tweak the workflow as needed if you also create events for deployments in progress or failed deployments
- Minimal permissions are needed - to read the deployment event from which we extract the URL of the deployed environment
- The first step (`vercel_deployment_url`) fetches the URL that'll be used as the replacement for [Dynamic URL monitors](/docs/synthetics/ci-cd/ci-cd-monitors/#dynamic-urls) from the deployment event
  - If your deployment setup handles the URL differently, then update this step to change how you fetch the URL
- The second step (`sematext_action`) calls the main action which runs the **CI/CD Monitors** associated with our **CI/CD Group**
  - Remember to update the variables that are passed here so that they match your setup
- The third and final step processes the results to inform us whether the tests were successful or not, logging out the information for review


## Triggering the workflow

With this setup, your **CI/CD Group** will run its Synthetics tests whenever the `deployment_status` event is sent. If your repository is being managed by Vercel, then this will happen on every push - both for PRs and for the main branch.

Here's what this check will look like next to your commits.

![Commit Check on the main branch](/docs/images/synthetics/cicd-check-commit-master.png)

![Commit Check on a PR](/docs/images/synthetics/cicd-check-commit-pr.png)


You can also see see additional details, including individual monitor runs, links to further details in the Sematext Cloud UI, and the URL for the Group Run. The `Run` step above the results contains additional information such as which URL and commit hash is being used, which can be useful for troubleshooting issues if they arise.

![Check Details](/docs/images/synthetics/cicd-check-details.png)

### Run Results in Sematext Cloud

Each workflow trigger is linked to multiple monitors, which we've organized into CI/CD groups on [this page](docs/synthetics/ci-cd/github-overview#cicd-groups). After the workflow is triggered, you can view the run results for each group in Sematext Cloud, providing a clear overview of the number of successful and failed monitors. You'll also find additional information, such as the associated Git commit SHA and Git branch, for each G**roup Run**.

![CI/CD Group Runs Overview](/docs/images/synthetics/cicd-group-run-list.png)

You can then use that information to quickly see what went wrong, navigate to the relevant changes and speed up the process of troubleshooting the buggy code.

![CI/CD Group Run](/docs/images/synthetics/cicd-group-run.png)
