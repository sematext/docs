title: Sematext User Roles
description: Inviting team members to your account means they get access to all your Apps, dashboards, notification hooks, alert rules, and everything else!

Typically you might have one person create an account by [signing up](https://apps.sematext.com/ui/registration). 
When using Sematext as a team we recommend creating a [team account](../team/#team-account).  Such an account can then serve as a _parent_ account for your whole organization or team.  

### Owner
Since the person who created the account would be its `OWNER`, this person
is typically a team leader or manager, somebody with the responsibility to 
oversee the DevOps pipeline of the whole organization or team. They might then choose 
to share the whole Account with every other person from the team/organization 
to allow others to easily access all Apps, Dashboards, Alert Rules, etc. created under that account.

### Admin
Some invited users might be given the `ADMIN` role, which gives
them read, write, and invite rights. 

### User
Other invitees might get the
`USER` role, which mostly only grants read rights with the ability to
create and edit their own Dashboards, Alerts, and Subscriptions which are
available to everyone under the shared account. 

### Billing Admin
In some cases, the account `OWNER` will not be able to handle billing-related 
info and will want to invite one or more `BILLING_ADMIN`s who will be able to define, 
edit, and delete credit cards and choose plans to be used for Apps in the 
account.

## Roles & Permissions

### App Level Actions
Action | App Owner | Admin | User
--- | :---: | :---: | :---:
Create [Alert Rule](https://sematext.com/docs/alerts/) | ✔️ | ✔️ | ✔️
View [Alert Rules](https://sematext.com/docs/alerts/) created by Others | ✔️ | ✔️ | ✔️
Edit/Delete/Disable [Alert Rule](https://sematext.com/docs/alerts/) created by them | ✔️ | ✔️ | ✔️
Edit/Delete/Disable [Alert Rule](https://sematext.com/docs/alerts/) created by other users  | ✔️ | ✔️ | ✖️
Ship Logs to an existing [Logs App](https://sematext.com/docs/logs/)| ✔️ | ✔️ | ✔️
Ship Metrics to an existing [Monitoring/Infra App](https://sematext.com/docs/monitoring/) | ✔️ | ✔️ | ✔️
Ship RUM data to an existing [Experience App](https://sematext.com/docs/experience/) | ✔️ | ✔️ | ✔️
Create/Edit/Disable [Synthetics](https://sematext.com/docs/synthetics/getting-started/) Monitors | ✔️ | ✔️ | ✖️
View [App](https://sematext.com/docs/guide/app-guide/) Usage Screen | ✔️ | ✔️ | ✖️
Disable [Apps](https://sematext.com/docs/guide/app-guide/)  | ✔️ | ✔️ | ✖️
Invite Others | ✔️ | ✔️ | ✖️
Upgrade/downgrade Apps [^1] | ✔️ | ✔️ | ✖️

[^1]: App guests with ADMIN role cannot upgrade/downgrade the Apps but account members with ADMIN role can.

### Account Level Actions
Action | Admin | User
--- | :---: | :---:
Create [App](https://sematext.com/docs/guide/app-guide/) [^2] | ✔️ | ✖️
[Invite Others](https://sematext.com/docs/team/account-members/) to the account | ✔️ | ✖️
See discovered [log sources](https://sematext.com/docs/logs/discovery/intro/) & [services](https://sematext.com/docs/monitoring/autodiscovery/)  | ✔️ | ✔️
Ship logs & metrics from discovered log sources & services | ✔️ | ✖️
Convert to [team account](https://sematext.com/docs/team/#team-account) | ✔️ | ✖️
Close the account | ✔️ | ✖️

[^2]: Account members with USER role can create Logs & Monitoring Apps with free plan but they cannot create Synthetics & Experience Apps because these solutions don't have free plans.
See [Sematext pricing](https://sematext.com/pricing/) page for more info.


