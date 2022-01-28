title: Sync User Journey scripts from GitHub to Sematext
description: Guide to how to setup sync of User Journey scripts from GitHub to Sematext

One way to add User Journey scripts to Sematext is to do so directly, via the Sematext UI.  You can simply type in the scripts or paste them in.  Once they are in Sematext, you can also edit them at any point in time.  Another way to get User Journey scripts into Sematext is by setting up synchronization with a GitHub repository where you have your scripts.  This way you can manage them with GitHub, author and modify them with your preferred tools, benefit from version control, and automate their publishing to Sematext without doing any extra manual work, like typing or pasting them in.



## Setup GitHub Actions

To sync User Journey scripts, you will need to set up GitHub Actions in your GitHub repository. There are two available synchronization workflows. You can choose to use only one of them or you can use them both - they complement each other. The [sync_updated_scripts.yml](https://cdn.sematext.com/github-sync-scripts/sync_updated_scripts.yml) workflow detects updated script files and updates the [Browser monitor’s](./browser-monitor.md)) scripts in Sematext Cloud. The  [sync_added_scripts.yml](https://cdn.sematext.com/github-sync-scripts/sync_added_scripts.yml) workflow detects any added scripts and creates a new Browser monitor for each script added to your repository. The workflows will be executed every time you push new commits or merge a PR to your default branch.

Notes:
* These workflows don’t do anything with scripts you delete from your repository.  In other words, if you delete a script from your repository the script will remain in Sematext until you explicitly remove it from there by yourself.

* The sync is unidirectional. That is, syncing is only from GitHub to Sematext.  This means that if you modify a User Journey script in Sematext, the changes will not be propagated to the GitHub repository. If you update the script in your repository then all the changes to that script that were made directly in Sematext will be overwritten.

* If your default branch is not “master” you will need to update the workflows with the name of your default branch.

To enable syncing of your User Journey scripts, you need to do the following:


1. Go to `https://github.com/{ORGANIZATION}/{YOUR_REPO_NAME}/settings/secrets/actions` and create two repository secrets: `SC_API_KEY` and `SC_API_BASE_URL`, as shown in the image below.

    ![Add Repo secrets](../images/synthetics/sync-browser-scripts-adding-repo-secrets.png)

      - You should set your Sematext Cloud API key as the value for the `SC_API_KEY`. Your API key can be found at https://apps.sematext.com/ui/account/api for the US region, or alternatively at https://apps.eu.sematext.com/ui/account/api for the EU region. 
  
      - The value of `SC_API_BASE_URL` should be set to https://apps.sematext.com (US region) or https://apps.eu.sematext.com (EU region).

2. Add the `.github/workflows` directory inside the root directory of your repository and place the `sync_updated_scripts.yml` and `sync_added_scripts.yml` workflow files inside the newly created directory.


## Prepare User Journey scripts

Now that you’ve configured the workflows, it’s time to prepare the User Journey scripts for syncing:

1. All scripts must be located in a directory named `browser_monitor_scripts`.

2. For existing Browser Monitors the first line of the script must contain a special comment with the Sematext App ID and monitor ID(s).  That is how the workflows know which monitors need to be updated. ID(s) can be found in the browser address bar when you open the details for the particular Browser Monitor in Sematext. The URL will be in the following format: `https://apps.eu.sematext.com/ui/synthetics/{appID}/monitors/{monitorID}.` Example: 

    ```
        //appId=398;monitorId=1238 

        or

        //appId=398;monitorId=1238,1240
    ```
    
    Any spaces are ignored, so feel free to add spaces for readability.

3. If you are adding a new script and want to automatically create a new Browser Monitor, the first line of the script must contain a special comment with the App ID.
Example: `//appId=398`. The monitor will be created with the following values: 

      - Monitor name = name of the script file
      - Interval = 1h
      - Location = N. Virginia

Note that after the new monitor gets automatically created from such a script the `monitorID` will be automatically added to the comment in the script.  When that happens the author name displayed in the GitHub commit will be `SematextSyncBot`.
 
If you are using Sematext Cloud Europe then you’ll want to replace the default location.  You can do that by editing the workflow YML file(s).  Simply look for this:

```
​​body='{"name":"'$name'","interval":"1h","locations":[1],"scriptBased":'$scriptBased',"enabled":'$enabled',"script":"'$script_content'","isGitHubSync":'$isGitHubSync'}'
```

 
Replace `"locations":[1]` with `"locations":[2]` and the default location will be set to Ireland.

This is also where you may replace `1h` with another value you want to be used by default. Allowed values for interval are `10m`, `15m`, `30m` and `1h`.  
