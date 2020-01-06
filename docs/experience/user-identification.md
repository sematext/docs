title: Identifying Users
description: Overview on how to identify users

By default, all users that interact with your website will be given an anonymous identifier. You will get an overview of the number of sessions for each given user, page loads and network requests, as well as User Satisfaction for these events, which browser was used and the country from which the user is interacting with your website. 

<img
  class="content-modal-image"
  alt="Users Overview"
  src="../../images/experience/users.png"
  title="Users Overview"
/>

This behavior can be altered by calling the `identify` function that allows you to inform the script about the user's identity. Here's an example. If the user interacting with your application is already logged in, you can pass along their name and identifier (email, email hash, or anything that is unique) so that later you can find data for this user in Experience.

In order to properly identify the user you need to call the `identify` function just before the `config` function described in the [Getting Started](getting-started.md) section, i.e.:

```javascript
<script type="text/javascript">
  strum('identify', { name: 'mike', identifier: 'mike@company.com' });
  strum('config', ...);
</script>
```

### Custom Tags

By default Experience allows you to filter by browser, country, operating system and other attributes that we automatically capture for each user. If you would like to be able to filter by some additional attributes you can use Custom Tags.

When identifying a user you can provide additional attributes that the script will tag to any events or metrics for that user. Later you can filter Experience data by these attributes.

For example, let's say that you are monitoring a SaaS web app with Experience and you would like to see data only for users that are on your free pricing plan. You would first adjust the script to include this attribute. We assume here that `isFreePlan()` returns `true` or `false` depending on if the user is on a free plan or not.

```javascript
<script type="text/javascript">
  strum('identify', {
    name: 'mike',
    identifier: 'mike@company.com',
    tags: {
      isFreePlan: isFreePlan(),
    },
  });
  strum('config', ...);
</script>
```

Deploy the changes to your website, and wait for new data to arrive.

Open your Experience app.

Add a new filter by clicking on the Add Filter button, selecting `isFreePlan` field and `true` as the value. Apply the filter and Experience will now show only data related to users that are on the free plan.

You can find the Add Filter button next to the "Connection Type" filter.
