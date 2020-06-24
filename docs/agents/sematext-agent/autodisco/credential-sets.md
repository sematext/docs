title: Defining credential sets
description:  Defining credential sets

When running in Kubernetes, Sematext Agent fetches the credentials from user-defined secrets. Typically, you create one secret per service type.  For example, if you are running Redis you might have `st-redis-creds`. However, if you're deploying various clusters of Redis services in the same Kubernetes cluster and you want to assign each cluster a different set of credentials, you'll have to adjust your manifests to include the following label or annotation:

- `st-credential-set` label that contains some meaningful value agent can map to secret name. For example, if you add the `st-credential-set: west` label to your Redis pods, the agent will look for `st-redis-west-creds` secret from which to read the credentials.
- similarly, you can add the `sematext.com/credential-set` annotation to your pods.
