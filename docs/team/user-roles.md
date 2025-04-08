title: Sematext User Roles
description: Inviting team members to your account means they get access to all your Apps, dashboards, notification hooks, alert rules, and everything else!

Typically you might have one person create an account by [signing up](https://apps.sematext.com/ui/registration). 
When using Sematext as a team we recommend creating a [team account](/docs/team/#team-account).  Such an account can then serve as a _parent_ account for your whole organization or team.  

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
Create [Alert Rule](/docs/alerts/) | ✔️ | ✔️ | ✔️
View [Alert Rules](/docs/alerts/) created by Others | ✔️ | ✔️ | ✔️
Edit/Delete/Disable [Alert Rule](/docs/alerts/) created by them | ✔️ | ✔️ | ✔️
Edit/Delete/Disable [Alert Rule](/docs/alerts/) created by other users  | ✔️ | ✔️ | ✖️
Ship Logs to an existing [Logs App](/docs/logs/)| ✔️ | ✔️ | ✔️
Create/Edit [Logs Pipelines](/docs/logs/pipelines/) <a href="#1">[1]</a> | ✔️ | ✔️ | ✔️
Ship Metrics to an existing [Monitoring/Infra App](/docs/monitoring/) | ✔️ | ✔️ | ✔️
Ship RUM data to an existing [Experience App](/docs/experience/) | ✔️ | ✔️ | ✔️
Create/Edit/Disable [Synthetics](/docs/synthetics/getting-started/) Monitors | ✔️ | ✔️ | ✖️
View [App](/docs/guide/app-guide/) Usage Screen | ✔️ | ✔️ | ✖️
Disable [Apps](/docs/guide/app-guide/)  | ✔️ | ✔️ | ✖️
Invite Others | ✔️ | ✔️ | ✖️
Upgrade/downgrade Apps <a href="#2">[2]</a>  | ✔️ | ✔️ | ✖️

### Account Level Actions
Action | Billing Admin | Admin | User 
--- | :---:  | :---: | :---:
Create [App](/docs/guide/app-guide/) <a href="#3">[3]</a>  | ✔️ | ✔️ | ✖️
[Invite Others](/docs/team/account-members/) to the account | ✔️ | ✔️ | ✖️
See discovered [log sources](/docs/logs/discovery/intro/) & [services](/docs/monitoring/autodiscovery/)  | ✔️ | ✔️ | ✔️
Ship logs & metrics from discovered log sources & services | ✔️ | ✔️ | ✖️
Convert to [team account](/docs/team/#team-account) | ✔️ | ✔️ | ✖️
Close the account | ✔️ | ✔️ | ✖️
Close the team account | ✔️ | ✖️ | ✖️
Update payment info  | ✔️ | ✖️ | ✖️

<li id="1">App guests with ADMIN or USER role cannot access and create/edit Logs Pipelines but account members with ADMIN or USER role can.</li>
<li id="2">App guests with ADMIN role cannot upgrade/downgrade the Apps but account members with ADMIN role can.</li>
<li id="3">Account members with USER role can create Logs & Monitoring Apps with free plan but they cannot create Synthetics & Experience Apps because these solutions don't have free plans.</li>


See [Sematext pricing](https://sematext.com/pricing/) page for more info.


