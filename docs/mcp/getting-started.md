title: Getting Started
description: Installation instructions for the Sematext MCP Server

Installing the Sematext MCP Server is fairly simple, with the setup varying based on which AI agent provider you use. This page contains guides on how to install it with various providers.



## Getting your API Key

While the setup may vary based on which AI agent provider you're using, all of them will require your Sematext Cloud API Key in order to authenticate.

Your account's API Key can be found on the **Settings → API** page:

- [here](https://apps.sematext.com/ui/account/api), if your account is registered in the US region, or
- [here](https://apps.eu.sematext.com/ui/account/api), for the EU region



## Setup guides

This section contains the setup guides for different agent providers.


### Claude Code

Installing the Sematext MCP Server for Claude Code is super simple - it can be done with a single command! Just make sure to replace the `apiKey` here with your real API Key.

If your account is in the US region, run this command:

```bash
claude mcp add --transport http --scope user sematext-cloud https://mcp.sematext.com/mcp --header "Authorization: apiKey xxxx-xx-xx-xxxx"
```

If you're in EU, run this command instead:

```bash
claude mcp add --transport http --scope user sematext-cloud https://mcp.eu.sematext.com/mcp --header "Authorization: apiKey xxxx-xx-xx-xxxx"
```

Once you have installed the MCP Server, you can verify that it works with the following command:
```bash
claude mcp list
```

The output should be this:
```
sematext-cloud: https://mcp.sematext.com/mcp (HTTP) - ✔ Connected
```

If you see any errors, please check that you have provided the correct API key.


### OpenCode

Installing the Sematext MCP Server for OpenCode is still simple, but requires a bit of tinkering in the OpenCode config file. 

First, locate and open the `opencode.json` file that you use for OpenCode settings. On various linux distributions (WSL included) it can be found either in `~/.config/opencode/opencode.json` or `~/.opencode/opencode.json`, if current linux user is the one who installed OpenCode.

Under `"mcp"` block add the following content if your Sematext Cloud account is in the US region:

    "sematext-cloud": {
      "type": "remote",
      "url": "https://mcp.sematext.com/mcp",
      "headers": {
        "Authorization": "apiKey xxxx-xx-xx-xxxx"
      }
    }

and if your Sematext Cloud account is in the EU region:

    "sematext-cloud": {
      "type": "remote",
      "url": "https://mcp.eu.sematext.com/mcp",
      "headers": {
        "Authorization": "apiKey xxxx-xx-xx-xxxx"
      }
    }

Saving the file and reloading/opening OpenCode should install the Sematext MCP server, so verify that it works with the following command:

```bash
opencode mcp list
```

The output should contain this message (example for US account):
```
●  ✓ sematext-cloud connected
│      https://mcp.sematext.com/mcp
```

If you see any errors, please check that you provided the correct Sematext Cloud API key. If you did and there is still a failure connecting to an MCP server, there might be a misconfiguration issue or a bug regarding regarding HTTP handler. So instead of "remote MCP server type" instructions mentioned above, put the following content under your `"mcp"` block inside `opencode.json` file:

    "sematext-cloud": {
      "type": "local",
      "command": ["npx", "-y", "mcp-remote",
          "https://mcp.sematext.com/mcp",
          "--transport", "http-only",
          "--header", "Authorization: apiKey xxxx-xx-xx-xxxx"
      ],
      "enabled": true
    }

Note: in order for this "local MCP server type" approach to work with Sematext MCP Server, your machine (under the user you are running OpenCode) should have `nodejs` and `npx` packages installed and accessible.



### Visual Studio Code MCP servers

In order to use Sematext MCP server via VS Code Chat interface (regardless of an AI model that is currently "powering" your VS Code panel), put the following content into the `mcp.json` file under `"servers"` block that you created by following the [official VS Code instructions](https://code.visualstudio.com/docs/agent-customization/mcp-servers) (US account example):

    		"sematext-cloud": {
    			"url": "https://mcp.sematext.com/mcp",
    			"type": "http",
    			"headers": {
    				"Authorization": "apiKey xxxx-xx-xx-xxxx"
    			}
    		}

If you are unsure which `mcp.json` file to use or you don't have any such file at all, follow these steps:
1. In VS Code, open `Command Pallete...` (Under `View` tab in uppermost Action Bar)
2. Type and select `MCP: Add Server...`
3. Choose `HTTP (HTTP or Server-Sent Events)`
4. For URL type `https://mcp.sematext.com/mcp`
5. For MCP server label type `sematext-cloud`
6. choose `Remote` as a handler

By following these steps your VS Code will automatically open the generated `mcp.json` file for you. Make sure that the contents of that file looks like this:

    {
    	"servers": {
    		"sematext-cloud": {
    			"url": "https://mcp.eu.sematext.com/mcp",
    			"type": "http",
    			"headers": {
    				"Authorization": "apiKey xxxx-xx-xx-xxxx"
    			}
    		}
    	},
    	"inputs": []
    }

Finally, start the MCP server: one way to do it is to click on "Start" option that is shown above MCP server's name (in your case, `sematext-cloud`) inside `mcp.json` file.

If you are presented with a pop-up message titled "Dynamic Client Registration not supported", do not proceed or add OAuth client id information - select "Cancel" or press ESC key. Instead, check if your `mcp.json` file content is actually saved and if you have provided the correct API key, then try starting the server again.
