title: CI/CD GitHub Integration Installation
description: A guide on how to set up the CI/CD

After you've created a **CI/CD Group**, you'll need a way to trigger Group Runs within your CI/CD pipelines. To accomplish this, we've created the [Sematext CI/CD GitHub Action](TODO_INSERT_OFFICIAL_GH_ACTION_LINK) which you can call within your GitHub workflows.


## The Sematext CI/CD GitHub Action

The Sematext CI/CD GitHub Action is a straightforward way to execute a **CI/CD Group Run** and collect its results. To set it up, you'll need the following:
- A Sematext Cloud account with a Synthetics **CI/CD Group** configured
  - You'll need the ID of your **CI/CD Group**, which you can see in the initial installation instructions when creating the group, or in the URL (for example for `https://apps.sematext.com/ui/synthetics/groups/15` the ID is `15`)
- Your Sematext Cloud account's API key
  - You can copy your API key from the **Settings** -> **API** page in the UI, which can be found:
    - [here](https://apps.sematext.com/ui/account/api), if your account is registered in the US region, or
    - [here](https://apps.eu.sematext.com/ui/account/api), for the EU region
  - You then have to add the API key as a repository secret to the GitHub repository you wish to run these CI/CD monitors for. Go to your repository's **Settings**, and then in the sidebar under **Security** click **Secrets and variables** and then **Actions**. Create a new repository secret and name it `SEMATEXT_API_KEY`, then paste in your Sematext Cloud account's API key.
    - If you can't see the **Settings** tab for your repository, then you might not have permissions to edit them - contact your repository's administrator to take care of this step.

![CI/CD GitHub Secret](/docs/synthetics/ci-cd/images/ci-cd-github-secret.png)


### Usage

Add the following to your GitHub workflow file:

```yaml
steps:
  - name: Run Sematext Synthetics Check
    uses: sematext/synthetics-cicd-action@v1
    with:
      MONITOR_GROUP_ID: 42
      REGION: "US"
      SEMATEXT_API_KEY: ${{ secrets.SEMATEXT_API_KEY }}
      TARGET_URL: 'https://your-deployment-url.com'                 # Pass dynamically
      GIT_COMMIT_HASH: '5a24a0f8cd48be7f315787dcc23ad418ecdb36f2'   # Pass dynamically
      USE_HEAD_SHA: false
```


### Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `MONITOR_GROUP_ID` | The ID of the monitor group to run the checks against (e.g., `42`) | Yes | - |
| `REGION` | The region where your Sematext Cloud account is located (`EU` or `US`) | Yes | - |
| `SEMATEXT_API_KEY` | Your Sematext Cloud account's API key | Yes | - |
| `TARGET_URL` | The URL to run the Synthetics check against | No | - |
| `GIT_COMMIT_HASH` | The commit hash that the Synthetics check will be triggered for | No | - |
| `USE_HEAD_SHA` | Whether to use the HEAD SHA for the Synthetics check | No | `false` |

> **Note**: Either `GIT_COMMIT_HASH` must be provided or `USE_HEAD_SHA` must be set to `true`.


### Outputs

| Output | Description |
|--------|-------------|
| `result` | The full result output from the Synthetics check |
| `status` | The status of the check (`passed` or `failed`) |
| `error` | The error message if the check failed |
| `group_run_url` | The URL of the Group Run in the Sematext Cloud UI |



## Examples

Here are some examples which illustrate how the action can be used depending on how complex your deployment setup is.


### Workflow for a simple setup

If your setup is such that you create deployments within GitHub (like through automatic deployment tools such as Vercel), you can make the workflow for this action trigger on the `deployment_status` event and simply configure the variables needed for the action:

```yaml
name: Trigger Sematext Synthetics Checks

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
        id: sematext_check
        uses: hssalman/cicd-repo-action@v0.9.3
        with:
          MONITOR_GROUP_ID: 42                                # Replace with your actual Monitor Group ID
          REGION: 'US'                                        # Replace with your Sematext Cloud Region ('EU' or 'US')
          SEMATEXT_API_KEY: ${{ secrets.SEMATEXT_API_KEY }}   # Make sure to add your Sematext API key as a repository secret first
          TARGET_URL: ${{ env.DEPLOYMENT_URL }}               # Use the URL that's autodeployed by Vercel
          USE_HEAD_SHA: true

      - name: Process Results
        if: always()
        run: |
          if [ "${{ steps.sematext_check.outputs.status }}" == "failed" ]; then
            echo "::error::Sematext Synthetics check failed!"
            echo "Group Run URL: ${{ steps.sematext_check.outputs.group_run_url }}"
            echo "Error details: ${{ steps.sematext_check.outputs.error }}"
            echo "Check Result: ${{ steps.sematext_check.outputs.result }}"
            exit 1
          fi

          echo "::notice::Sematext Synthetics check passed!"
          echo "Group Run URL: ${{ steps.sematext_check.outputs.group_run_url }}"
          echo "Check Result: ${{ steps.sematext_check.outputs.result }}"
```

With this setup, your **CI/CD Group** will run a test whenever the `deployment_status` event is sent. If your repository is being managed by Vercel, then this will happen on every push - both for PRs and for the main branch.

Here's what this check will look like next to your commits.

![Commit Check on the main branch](/docs/images/synthetics/cicd-check-commit-master.png)

![Commit Check on a PR](/docs/images/synthetics/cicd-check-commit-pr.png)


You can also see browse additional details, including individual monitor runs, links to further details in the Sematext Cloud UI, and the URL for the Group Run. The `Run` step above the results contains additional information such as which URL and commit hash is being used, which can be useful for troubleshooting issues if they arise.

![Check Details](/docs/images/synthetics/cicd-check-details.png)



### Workflow for a complex setup

If your setup is such that your deployments are handled by systems outside of GitHub (such as Jenkins and ArgoCD), then you'll need to add some extra steps because GitHub won't know which commit to associate the tests with otherwise. We'll invoke the action with a `repository_dispatch` event, pass the commit SHA we're running the tests for in the event payload, and manually create checks which will be linked to the commit.


```yaml
name: Deployment Complete Test

on:
  repository_dispatch:
    types: [environment_ready]

permissions:
  contents: read   # Required to access the repo
  checks: write    # Required to create a new check run

jobs:
  run-tests:
    runs-on: ubuntu-latest
    # We'll manage most variables we need here
    env:
      MONITOR_GROUP_ID: 42                                       # Your Sematext Synthetics Monitor Group ID
      REGION: "US"                                               # Your Sematext Cloud Region ('EU' or 'US')
      SEMATEXT_API_KEY: ${{ secrets.SEMATEXT_API_KEY }}          # Make sure to add your Sematext API key as a repository secret
      REPO: ${{ github.repository }}                             # Repository name, retrieved from GitHub
      SHA: ${{ github.event.client_payload.commitHash }}         # SHA of the commit we want to run tests for, passed from the event which invokes this workflow
      SOURCE: ${{ github.event.client_payload.sourceName }}      # Additional info you may need to create your deployment URL, passed from the invoking event
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}                      # Automatically created by GitHub for every repository
    steps:
      - name: Print info
        run: |
          echo "Current time is $(date)"
          echo "Source is: ${{ env.SOURCE }}"
          echo "Commit is: ${{ env.SHA }}"
          
          # Set the TARGET_URL to the URL of the deployed application, depending on your setup
          TARGET_URL="ASSIGN-YOUR-DEPLOYMENT-URL-HERE"
          echo "TARGET_URL is: $TARGET_URL"
          echo "TARGET_URL=$TARGET_URL" >> $GITHUB_ENV

      - name: Create a GitHub Check Run to attach it to the appropriate commit
        id: create_check
        run: |
          check_run_id=$(gh api -X POST "repos/${{ env.REPO }}/check-runs" \
            -F "name=Sematext CI/CD Test" \
            -F "output[title]=Sematext Synthetics Check Initiated" \
            -F "output[summary]=The deployment check has started." \
            -F "head_sha=${{ env.SHA }}" \
            -F "status=in_progress" \
            --jq '.id')

          echo "check_run_id=$check_run_id" >> $GITHUB_ENV
          echo "check_result=failed" >> $GITHUB_ENV
      
      - name: Run Sematext Synthetics CI/CD Integration
        id: sematext_check
        uses: hssalman/cicd-repo-action@v0.9.3
        with:                                                 # All of these inputs are set near the top of the workflow
          GIT_COMMIT_HASH: ${{ env.SHA }}                     # Pass the SHA of the commit for which you're running the tests
          MONITOR_GROUP_ID: ${{ env.MONITOR_GROUP_ID }}       # Manually set near the top of the workflow
          REGION: ${{ env.REGION }}                           # Manually set near the top of the workflow
          SEMATEXT_API_KEY: ${{ env.SEMATEXT_API_KEY }}       # Set as a repository secret
          TARGET_URL: ${{ env.TARGET_URL }}                   # The URL of the deployment which you want to test
          USE_HEAD_SHA: false                                 # Set to true to use the HEAD SHA for the check run instead of GIT_COMMIT_HASH

      - name: Update Job Status
        id: update_status
        if: always() && steps.create_check.outcome == 'success'
        run: |
          JOB_DETAILS="---- Job Details -----<br>"
          
          # Optionally add a URL to the PR for which these tests are being run, if you passed that info in the invoking event
          #PR_URL="${{ github.server_url }}/${{ github.repository }}/pull/$PR_NUMBER"
          #JOB_DETAILS="$JOB_DETAILS- **GitHub PR '${{ env.SOURCE }}' is available** <a href='$PR_URL' target='_blank'>here</a><br>"

          RUN_URL="${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
          GROUP_RUN_URL="${{ steps.sematext_check.outputs.group_run_url }}"
          JOB_DETAILS="$JOB_DETAILS- **GitHub Workflow Run is available** <a href='$RUN_URL' target='_blank'>here</a><br>"
          if [ -n "$GROUP_RUN_URL" ]; then
            JOB_DETAILS="$JOB_DETAILS- **Sematext Group Run is available** <a href='$GROUP_RUN_URL' target='_blank'>here</a><br>"
          fi
          JOB_DETAILS="$JOB_DETAILS- **Testing finished at:** $(date)<br>"
          JOB_DETAILS="$JOB_DETAILS- **Commit:** <a href='${{ github.server_url }}/${{ github.repository }}/commit/${{ env.SHA }}' target='_blank'>${{ env.SHA }}</a><br>"
          JOB_DETAILS="$JOB_DETAILS- **TARGET_URL:** ${{ env.TARGET_URL }}<br><br>"
          JOB_DETAILS="$JOB_DETAILS----- Test Results -----"

          # Print out the invididual action outputs for debugging, if needed
          echo "Sematext Check Status: '${{ steps.sematext_check.outputs.status }}'"
          echo "Sematext Check Result: '${{ steps.sematext_check.outputs.result }}'"
          echo "Sematext Check Error: '${{ steps.sematext_check.outputs.error }}'"

          # Process the result to ensure proper formatting in GitHub Markdown
          if [[ -n "${{ steps.sematext_check.outputs.result }}" ]]; then
            FORMATTED_RESULT=$(echo '${{ steps.sematext_check.outputs.result }}' | sed 's/\\n/\n/g')
            RESULTS_BLOCK="<pre>${FORMATTED_RESULT}</pre>"
          else
            RESULTS_BLOCK=""
          fi

          if [[ "${{ steps.sematext_check.outputs.status }}" == "passed" ]]; then
            gh api "repos/${{ env.REPO }}/check-runs/${{ env.check_run_id }}" -X PATCH \
              -F "name=Sematext CI/CD Test" \
              -F "output[title]=Sematext Synthetics Check Passed" \
              -F "output[summary]=All monitors finished successfully." \
              -F "output[text]=$JOB_DETAILS<br>${RESULTS_BLOCK}" \
              -F "status=completed" \
              -F "conclusion=success"
          else
            FAILURE_REASON="Some monitors have failed."
            if [[ -n "${{ steps.sematext_check.outputs.error }}" ]]; then
              JOB_DETAILS="$JOB_DETAILS<br>${{ steps.sematext_check.outputs.error }}"
              FAILURE_REASON="An error occurred while running the monitors."
              if [[ "${{ steps.sematext_check.outputs.error }}" == *"403"* ]]; then
                FAILURE_REASON="Got error 403 from Sematext API, check your Sematext API key."
              elif [[ "${{ steps.sematext_check.outputs.error }}" == *"500"* ]]; then
                FAILURE_REASON="Got error 500 from Sematext API, please try again in a few minutes."
              fi
            fi

            echo "Job Details after error check: $JOB_DETAILS"

            gh api "repos/${{ env.REPO }}/check-runs/${{ env.check_run_id }}" -X PATCH \
              -F "name=Sematext CI/CD Test" \
              -F "output[title]=Sematext Synthetics Check Failed" \
              -F "output[summary]=$FAILURE_REASON" \
              -F "output[text]=$JOB_DETAILS<br>${RESULTS_BLOCK}" \
              -F "status=completed" \
              -F "conclusion=failure"
          fi
```

This is an example of what gets displayed when you open the check details on GitHub. Tweak the code of the `Update Job Status` step to modify this to your liking.

![Check Run Details Example](/docs/images/synthetics/cicd-check-run-example.jpg)
