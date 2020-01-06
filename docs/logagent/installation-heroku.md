title: Installation on Heroku
description: Forward logs to Sematext logging management and analytics SaaS using Heroku Log Drains. Deploy logagent and easily handle high logs volume, visualize and create dashboards and alerts, and use Sematext logging and monitoring tools with Heroku cloud application platform 

## Run Logagent as Heroku Log Drain

You can forward your [Heroku](http://www.heroku.com) logs to Sematext using Heroku [Log Drain](https://devcenter.heroku.com/articles/log-drains) like this:
``` bash
heroku drain:add --app HerokuAppName URL
```
Here are the steps:

To ship your Heroku logs to Sematext or Elasticsearch deploy Logagent on Heroku. It will act as an HTTPS log drain. 

1. Get a free account [apps.sematext.com](https://apps.sematext.com/ui/registration)
2. Create a [Logs](http://www.sematext.com/logsene/) App to obtain the App Token
3. Deploy Logagent to Heroku using the Deploy to Heroku button

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/sematext/logagent-js) 
... or use the following commands:

``` bash
  git clone https://github.com/sematext/logagent-js.git
  cd logagent-js
  heroku login 
  heroku create
  git push heroku master
```

4. Add the log drain using the URL format like https://loggerAppName.herokuapps.com/LOGSENE_TOKEN.
  Use the following command to grab the dynamically assigned name from "heroku create" command.

``` bash
  export LOGSENE_TOKEN=YOUR_LOGSENE_TOKEN
  heroku drains:add --app YOUR_HEROKU_MAIN_APPLICATION `heroku info -s | grep web-url | cut -d= -f2`$LOGSENE_TOKEN
```

When you see logs in Sematext you can define Alert Queries, build Dashboards, create Saved Queries, etc. 

5. Scale Logagent service on Heroku

To handle high log volume, scale Logagent on demand using 
``` bash
heroku scale web=3
```
See also:
- [How to Ship Heroku Logs to Sematext / Managed ELK Stack](https://sematext.com/blog/how-to-ship-heroku-logs-to-logsene-managed-elk-stack/)
