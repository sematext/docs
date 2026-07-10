title: Getting Started
description: Installation instructions for the Sematext Cloud MCP Server

Installing the Sematext Cloud MCP Server is fairly simple, with the setup varying based on which AI agent provider you use. This page contains guides on how to install it with various providers.



## Getting your API Key

While the setup may vary based on which AI agent provider you're using, all of them will require your Sematext Cloud API Key in order to authenticate.

Your account's API Key can be found on the **Settings → API** page:

- [here](https://apps.sematext.com/ui/account/api), if your account is registered in the US region, or
- [here](https://apps.eu.sematext.com/ui/account/api), for the EU region



## Setup guides

This section contains the setup guides for different agent providers.


### Claude Code

Installing the Sematext Cloud MCP Server for Claude Code is super simple - it can be done with a single command! Just make sure to replace the `apiKey` here with your real API Key.

If your account is on the US region, run this command:

```bash
claude mcp add --transport http --scope user sematext-cloud https://mcp.sematext.com/mcp --header "Authorization: apiKey xxxx-xx-xx-xxxx"
```

If you're on EU, run this command instead:

```bash
claude mcp add --transport http --scope user sematext-cloud https://mcp.eu.sematext.com/mcp --header "Authorization: apiKey xxxx-xx-xx-xxxx"
```


#### Verifying the installation

Once you have installed the MCP Server, you can verify that it works with the following command:
```bash
claude mcp list
```

The output should be this:
```
sematext-cloud: https://mcp.sematext.com/mcp (HTTP) - ✔ Connected
```

If you see any errors, please check that you have provided the correct API key.

