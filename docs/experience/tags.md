title: Tags
description: Overview on how to add Custom Tags for additional attributes

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
