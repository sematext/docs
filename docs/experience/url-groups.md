title: URL Groups
description: Guide for using URL Groups in Experience

Most websites follow certain URL patterns for their pages. For example, your website might show user profiles at `/user/123` or `/user/312`. Therefore, the URL pattern is `/user/{userId}`. Mapping these patterns with URL Groups in Sematext Experience can give you a better overview of the performance data for each part of your website. The idea is that all user profiles will have more or less the same performance characteristics, so it makes sense to monitor the "User Profile" page as a whole instead of monitoring individual user profile pages.

If we keep in mind the example above, here are the differences you will see if you use URL Groups.

Before using URL Groups to group all user profile pages, you would see each user profile page as a separate entry in the Top Pages table on the Overview screen. Clicking on one of the profile pages, eg. `/user/123` will open the Page Details screen with charts and tables that show performance metrics for all visitors that visited this particular user profile page. All entries in the Page Loads table will have the same url: `user/123`.

After using URL Groups to group all user profile pages, you would see only one entry in the Top Pages table on the Overview screen related to profile pages: `/user/{userId}`. Clicking on this entry would open the Page Details screen with charts and tables that show performance metrics for all visitors that visited any profile page. Individual page loads in the Page Loads table will have different URLs that belong to specific profile pages.

### URL Groups for HTTP Requests

Requests made via Javascript also use URL Groups so everything that we mention here related to page loads works equally well for requests.

### Create new URL Group

To create a new URL Group open your Experience App and do the following:

1. Open URL Groups in the left sidebar menu
2. Click on the Add button in the top left
3. Enter the URL pattern, use curly braces for placeholders. Eg. `/user/{userId}`. would match any url of this form (`/user/123`, `/user/122`, etc.)
4. You can also enter exact URLs without placeholders to match one specific part of your website (see URL Group Time Threshold below as to why this might be useful)
4. You can use the text area below to test if the pattern matches the list of provided URLs

<img
  class="content-modal-image"
  alt="Create Experience URL Group Form"
  src="../../images/experience/urlgroup-1.png"
  title="Create Experience URL Group Form"
  width=934
  height=573
/>

### URL Group Time Threshold

You can assign a different time threshold for each URL Group. For example, you might have more strict requirements for your sales page so you want to aim for 1 second instead of your website's default of 2 seconds.

You can read more about setting time thresholds in [Configuring Requirements](./configure-requirements).
