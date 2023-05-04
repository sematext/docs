title: CI/CD Integration
description: Guide to how to run HTTP/Browser monitors from your CI/CD pipeline.

In addition to scheduled monitor runs, you can also trigger monitor runs by using an API. You can use this API to trigger monitor runs as part of your CI/CD pipeline and block deployments if runs fail. When a run fails, you'll be alerted via your configured alert [notification hooks](../../alerts/alert-notifications.md). Please see [Using the API](../using-the-api.md) for more information.

## Integrations

Using the run monitor API, you can integrate [Sematext Synthetics](../index.md) to your CI/CD pipeline. Below are the steps to trigger monitor runs from various CI/CD tools.
- [Jenkins](./jenkins/)
- [Travis CI](./travis-ci/)
- [Circle CI](./circle-ci/)
- [GitHub Actions](./github-actions/)
- [Bitbucket Pipelines](./bitbucket-pipelines/)
- [GitLab CI/CD](./gitlab-ci-cd/)
- [Vercel](./vercel/)
- [Netlify](./netlify/)