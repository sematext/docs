## Run Logagent as Heroku Log Drain

You can forward your [Heroku](http://www.heroku.com) logs to Logsene using Heroku [Log Drain](https://devcenter.heroku.com/articles/log-drains) like this:
``` bash
heroku drain:add --app HerokuAppName URL
```
Here are the steps:

To ship your Heroku logs to Logsene or Elasticsearch deploy Logagent on Heroku. It will act as an HTTPS log drain. 

1. Get a free account [apps.sematext.com](https://apps.sematext.com/users-web/register.do)
2. Create a [Logsene](http://www.sematext.com/logsene/) App to obtain the Logsene Token
3. Deploy logagent-js to Heroku using the Deploy to Heroku button

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

Now you can see your logs in Logsene, define Alert-Queries or use Kibana for Dashboards. 

3. Scale Logagent service on Heroku

In case of high log volume, scale logagent-js on demand using 
``` bash
heroku scale web=3
```
See also:
- [How to Ship Heroku Logs to Logsene / Managed ELK Stack](https://sematext.com/blog/2016/02/18/how-to-ship-heroku-logs-to-logsene-managed-elk-stack/)