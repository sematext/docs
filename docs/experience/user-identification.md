title: Identifying Users
description: Overview on how to identify users

By default, all users that interact with your application monitored by Sematext Experience will be anonymous. You will get an overview of the number of sessions for the given user, page loads and network requests, User Satisfaction for those events, used browser and the country from which the user is interacting with your site. 

<img
  class="content-modal-image"
  alt="Users Overview"
  src="../../images/experience/users.png"
  title="Users Overview"
/>

This behavior can be altered by including a call to the `identifyUser` function that allows you to inform Sematext Experience beacon about the identity of the user. For example - if the user interacting with your application is already logged in you can pass its name and identifier so that our Real User Monitoring solution can correlate the data for that user for display purposes. 

In order to properly identify the user you need to call the `identifyUser` function just before you configure the RUM script by calling the `config` function described in the [Getting Started](getting-started.md) section, i.e.:

```javascript
<script type="text/javascript">
  strum('identify', { accountName: 'mike', loginName: 'mike@doesnt.exist.com' })
</script>
```