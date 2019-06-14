title: Identifying Users
description: Overview on how to identify users

By default, all users that interact with your application that's monitored by Sematext Experience will be anonymous. You will get an overview of the number of sessions for each given user, page loads and network requests, as well as User Satisfaction for these events, which browser was used and the country from which the user is interacting with your site. 

<img
  class="content-modal-image"
  alt="Users Overview"
  src="../../images/experience/users.png"
  title="Users Overview"
/>

This behavior can be altered by including a call to the `identifyUser` function that allows you to inform the Sematext Experience beacon about the user's identity. Here's an example. If the user interacting with your application is already logged in, you can pass along their name and identifier so that our Real User Monitoring solution can correlate the data for this user and display it accordingly.

In order to properly identify the user you need to call the `identifyUser` function just before you configure the Real User Monitoring script by calling the `config` function described in the [Getting Started](getting-started.md) section, i.e.:

```javascript
<script type="text/javascript">
  strum('identify', { accountName: 'mike', loginName: 'mike@doesnt.exist.com' })
</script>
```