title: Licensing
description: Licenisng details for Sematext infrastructure & application performance monitoring, and log management service.

## Licensing

<div class="accordion">
  <div class="option">
    <input type="checkbox" id="toggle15" class="toggle" />
    <label class="title" for="toggle15">
      How do I get a new license
    </label>
    <div class="content">
      <p>
      The SematextApps VM has an initial trial license that will expire in 30
      days.  When the trial license or the real license expires, you will not
      be able log into the Web UI.  To get a new license, please <a href="https://sematext.com/contact/">contact Sematext</a>.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle16" class="toggle" />
    <label class="title" for="toggle16">Where do I put a new license file
    </label>
    <div class="content">
      <p>
      The license file location is /opt/sematext/license.jar on any of your
      SUA servers.
<br><br>
      License files are automatically loaded as soon as you copy them to said
      location.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle17" class="toggle" />
    <label class="title" for="toggle17">
      License expiry
    </label>
    <div class="content">
        <p>
        All Sematext on-premises licenses are limited by their expiry date. As
        expiry date approaches (and passes), license holders and owner of
        default on-premises account will be notified by email.
<br><br>
        After the license expires, you will be able to continue using
        applications only for a few more days, so <a href="https://sematext.com/contact/">contact Sematext</a> early about the new license to avoid any service interruptions.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle18" class="toggle" />
    <label class="title" for="toggle18">
      How do SPM license limits work
    </label>
    <div class="content">
      <p>
      SPM licenses have additional limit on concurrent number of
      "server-apps". This "server-apps" is a combination of SPM App token and
      server where SPM monitor client is installed. For example, if you have 4
      servers, and on each of them you've installed 3 SPM App tokens, that is
      counted as 12 server-apps (regardless of whether those servers use same
      or different SPM App tokens).
<br><br>
      If during the day your number of server-apps goes over the limit defined
      by license, you will be notified by email and by Notification displayed
      at the top of SPM UI. You will have until the end of the day (counted by
      UTC timezone) to reduce the number of server-apps below the license
      limit. If reduction doesn't happen until the end of the day, that day
      will be counted as "over the limit" incident.
<br><br>
      You are allowed to have a maximum of 4 such incidents over the trailing
      30 days window. Once you have 5 or more such incidents over the last 30
      days (check is done each day at 02:00 AM UTC), read-access to data will
      be blocked. This means that performance metrics will continue to be
      collected by SPM, but until the number of "over the limit" incidents
      falls back below 5 or you get a fresh license with higher limits, you
      will be unable to view data in charts.
      </p>
    </div>
  </div>
  <div class="option">
    <input type="checkbox" id="toggle19" class="toggle" />
    <label class="title" for="toggle19">How do Logsene license limits work
    </label>
    <div class="content">
      <p>
      Logsene licenses have additional limit on the amount of log data per
      day. The limit is expressed in MB, GB, TB... per day, and is compared
      with the total amount of log data used by all your Logsene Apps
      combined.
<br><br>
      If during the day your amount of data goes over the license limit, you
      will be notified by email and by Notification displayed at the top of
      Logsene UI. You will have time until the end of the day (counted by UTC
      timezone) to reduce the amount of logs below the limit (e.g. by deleting
      some data manually). If reduction doesn't happen until the end of the
      day, that day will be counted as "over the limit" incident.
<br><br>
      You are allowed to have a maximum of 4 such incidents over the trailing
      30 days window. Once you hit 5 or more such incidents over the last 30
      days (check is done each day at 02:00 AM UTC), read-access to data will
      be blocked. This means that logs data will continue to be accepted by
      Logsene, but until the number of "over the limit" incidents falls back
      below 5 or you get a fresh license with higher limits, you will be
      unable to view data in charts.
      </p>
    </div>
  </div>
</div>
