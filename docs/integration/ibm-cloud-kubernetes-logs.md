title: IBM Cloud Kubernetes Logs Integration
description: Sematext IBM Cloud Kubernetes Logs integration is configured by running Logagent as a Daemonset in your cluster.

Sematext offers a Kubernetes Audit logs receiver endpoint. Everything you need to do is to configure the Kubernetes API Server to send logs to it.

## Sematext Kubernetes Audit Logs Quick Start

Kubernetes audit logs are detailed descriptions of each call made to the Kubernetes API Server. They provide a chronological sequence of activities that lead to the state of the system at a specific moment. They are extremely useful for security and compliance purposes, telling you exactly who did what, when, and how. You can configure Kubernetes Audit Logs by using any of the two options below.