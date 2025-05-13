title: CI/CD GitHub Integration Installation
description: A general guide on how to set up the CI/CD integration

After you've created a **CI/CD Group**, you'll need a way to trigger Group Runs within your CI/CD pipelines. To accomplish this, we've created the [Sematext CI/CD GitHub Action](TODO_INSERT_OFFICIAL_GH_ACTION_LINK) which you can call within your GitHub workflows.


## The Sematext CI/CD GitHub Action

The Sematext CI/CD GitHub Action is a straightforward way to execute a **CI/CD Group Run** and collect its results. To set it up, you'll need the following:
- A Sematext Cloud account with a Synthetics **CI/CD Group** configured
  - You'll need the ID of your **CI/CD Group**, which you can see in the initial installation instructions when creating the group, or in the URL (for example for `https://apps.sematext.com/ui/synthetics/groups/15` the ID is `15`)
- Your Sematext Cloud account's API key
  - You can copy your API key from the **Settings** -> **API** page in the UI, which can be found:
    - [here](https://apps.sematext.com/ui/account/api), if your account is registered in the US region, or
    - [here](https://apps.eu.sematext.com/ui/account/api), for the EU region
  - You then have to add the API key as a repository secret to the GitHub repository you wish to run these CI/CD monitors for.
    - Go to your repository's **Settings**
      - If you can't see the **Settings** tab for your repository, then you might not have permissions to edit them - contact your repository's administrator to take care of this step
    - In the sidebar under **Security** click **Secrets and variables** and then **Actions**
    - Create a new repository secret and name it `SEMATEXT_API_KEY`, then paste in your Sematext Cloud account's API key

![CI/CD GitHub Secret](/docs/synthetics/ci-cd/images/ci-cd-github-secret.png)


### Usage

Add the following to your GitHub workflow file:

```yaml
steps:
  - name: Run Sematext Synthetics Tests
    uses: sematext/synthetics-cicd-action@v1
    with:
      MONITOR_GROUP_ID: 42                                          # Replace with your actual Monitor Group ID
      REGION: 'US'                                                  # Replace with your Sematext Cloud Region ('EU' or 'US')
      SEMATEXT_API_KEY: ${{ secrets.SEMATEXT_API_KEY }}             # Make sure to add your Sematext API key as a repository secret first
      TARGET_URL: 'https://your-deployment-url.com'                 # Pass dynamically from your setup, used as the replacement for <DYNAMIC_URL>
      GIT_COMMIT_HASH: '5a24a0f8cd48be7f315787dcc23ad418ecdb36f2'   # Pass dynamically from your setup
      USE_HEAD_SHA: false                                           # Set to true if the invoking event is linked to the commit you're testing
```


### Inputs

| Input | Description | Required |
|-------|-------------|----------|
| `MONITOR_GROUP_ID` | The ID of the **CI/CD Group** which contains the tests (e.g., `42`) | Yes |
| `REGION` | The region where your Sematext Cloud account is located (`EU` or `US`) | Yes |
| `SEMATEXT_API_KEY` | Your Sematext Cloud account's API key | Yes |
| `TARGET_URL` | The URL to run the Synthetics tests against, mandatory for monitors with [Dynamic URLs](/docs/synthetics/ci-cd/ci-cd-monitors/#dynamic-urls) | No |
| `GIT_COMMIT_HASH` | The commit hash that the Synthetics tests will be triggered for | No |
| `USE_HEAD_SHA` | Whether to use the HEAD SHA for the Synthetics tests | No |

> **Note**: Either `GIT_COMMIT_HASH` must be provided or `USE_HEAD_SHA` must be set to `true`.


### Outputs

| Output | Description |
|--------|-------------|
| `result` | The full result output from the Synthetics **Group Run** |
| `status` | The status of the **Group Run** (`passed` or `failed`) |
| `error` | The error message if the **Group Run** failed |
| `group_run_url` | The URL of the **Group Run** in the Sematext Cloud UI |


## Examples

These two examples illustrate how the action can be set up depending on how complex your deployment setup is:
- [Workflow that triggers on the `deployment_status` event](/docs/synthetics/ci-cd/ci-cd-example-simple.md) (simpler)
- [Workflow that triggers on the `repository_dispatch` event](/docs/synthetics/ci-cd/ci-cd-example-complex.md) (more complex)
