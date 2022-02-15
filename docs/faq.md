title: Sematext FAQ
description: FAQ about Sematext monitoring and logging products, integrations, alerts, api, billing, security, private vs SaaS options and more. APM, Log Management, Tracing, RUM are part of the Sematext solutions, available both on premises and in cloud SaaS

## General

### What should I do if I can't find the answer to my question in the FAQ?

Check out [monitoring FAQ](/monitoring/spm-faq) and [logging
FAQ](/logs/faq). If you can't find the answer to your question please
email <support@sematext.com> or use our live chat.

### Is there an On Premises version of Sematext I can run on my own servers? 

Yes there is.  Please see [Sematext Enterprise](/sematext-enterprise).

### Does Sematext integrate with ChatOps like Slack and HipChat? How about PagerDuty or custom WebHooks?

Yes, see [integrations](/integration), [alerts FAQ](#alerts), and [alerts docs](/alerts).

### Can I use Sematext for (business) transaction tracing?

Yes, see [Transaction Tracing](/tracing).

### Is there an HTTP API?

Yes, see [API Reference](/api).

## Organizing Apps

### I have N environments (production, staging, test, etc). How many Apps for Logs/Monitoring should I create?

Keep data separate between environments: you'll get better visibility if you see aggregate metrics/logs per environment instead of overall. It will cost less because you can choose different plans: for example, less retention for testing than for prod.

The easiest way is to have different [Infra Apps](/monitoring/infrastructure) for each environment, then a [Logs](/logs)/[Monitoring](/monitoring) App for each environment as well. The Infra App of each enviromnet will be linked to the right Logs App via [Logs Discovery](/logs/discovery/intro) and to the right Monitoring App via [Autodiscovery](/monitoring/autodiscovery).

### Can you give me an example?

Say you want to monitor two Solr clusters: one in production and one in staging. You'll start by creating two [Infra Apps](/monitoring/infrastructure): one for each environment. Even if you don't need [Infrastructure Monitoring](/monitoring/infrastructure), you have to have those Infra Apps, you can set them up with the [Basic (free) plan](https://sematext.com/pricing/#spm). Install Sematext Agent on all hosts and make them send data to their respective App, as written in the [instructions](/monitoring/quick-start).

Then you'd set up [Solr Monitoring](/integration/solr) Apps: one per environment. At this point, you shouldn't need to touch the hosts: when it comes to shipping Solr metrics, simply select the corresponding Infra App and use [Autodiscovery](/monitoring/autodiscovery) to set up monitoring.

You'll do the same with [Solr Logs](/integration/solr-logs): create one App per environment, select the right Infra App and use [Logs Discovery](/logs/discovery/intro).

At this point, if you add a new host in an environment, all you have to do is to install Sematext Agent and point it to the right Infra App. Your Solr logs and metrics will automatically be shipped to the right Apps.

## Sharing

### How can I share my Sematext Apps with other users?

There are two options: **Account Sharing** or **App Sharing**.  With
Account Sharing, you invite others to your **whole account**, so they
get access to **all** your Apps, dashboards, notification
hooks, alert rules, etc. They can also create new Apps under your
account and invite other users. Depending on the role you assign to
invitees, they may be able to administer your Apps, dashboards, users
or even billing info (change app plan, assign credit card,
etc). Account Sharing is very convenient because as soon as a new
Sematext App is added to your account or new dashboard is created, all
users added to your account get access to it.  Of course, the level of
access depends on the role you initially assigned to each person.

Unlike Account Sharing, App Sharing is restricted only to a particular
app. Nothing besides the shared app is accessible to the invited user
(for example, dashboards are at the account level can can thus be shared
only through Account Sharing). This option is useful if you want to be
very restrictive about which apps can be seen by others or what kind of
effect those others have on your team. With plain App Sharing guest
can't see or edit alert rules created by your team, they can't use your
team's notification hooks, etc.  
  
Account Sharing and App Sharing is not exclusive.  You can use both of
these two sharing types at the same time. You could Share Account with
some users, and use App Sharing to share specific apps with other
users.
  
To share Account with other users, go to
<https://apps.sematext.com/ui/team/account-members>  
To share App, go
to <https://apps.sematext.com/ui/team/app-guests>

### What is the difference between OWNER, ADMIN, BILLING_ADMIN, and USER roles?

There are 3 common roles available when Sharing Account and
Sharing App (**OWNER**, **ADMIN**, **USER**), and one role which is
specific only to Account Sharing (**BILLING_ADMIN**).  
  
Each account has one OWNER (if you created some account, you are its
OWNER). Each app also has one OWNER (The OWNER of an app is OWNER of
account under which some app was created. If you create an app under
your account, you are the OWNER of that app. If some user with whom
you've shared your account creates a new app under your account, you are
again the OWNER of that app. However, if that user creates a new app
under his own account, he will be its OWNER).  
  
Each account and app can have 0 or more ADMINS and USERS. If you added
some user as ADMIN to your account, he also automatically gets the ADMIN
role for all your apps (account role is transitive to app role).  
  
ADMIN users can modify everything under your account/app except billing
related info. They can: create/delete/update all
dashboards/alerts/subscriptions/users... Users with USER role have read
rights on everything except billing info (they can view all reports,
dashboards, alerts...). They can even create/edit their own alerts and
subscriptions on apps from shared account (but can't edit other user's
alerts/subscriptions, only ADMINs can do that). If they were added to an
Account (not to an App), they can also create their own dashboards and
add other USERs to your account.  
  
There is a special role available when Sharing Account - BILLING_ADMIN.
This role has all rights as the standard ADMIN, but can also access/edit
billing-related info. The only thing this role cannot do is change
password of your account.

### When would I want to add someone as BILLING_ADMIN?

When you don't have a credit card that should be used for
charging, but some other person has it, you should invite this person
and give them the BILLING_ADMIN role. Similarly, if you created an
account and defined a credit card, but now want somebody else to take
care of all billing related activity (assigning plans and credit cards
to various apps), you'd give them the BILLING_ADMIN role.

### What might a typical use of roles for an organization with many employees look like?

Typically you might have one person create an account
via <https://apps.sematext.com/ui/registration>. This account might be
considered a "parent" account for your whole organization.  
Since the person who created the account would be its OWNER, this person
is typically (but not necessarily) a team leader or manager, or somebody
whose responsibility is to oversee servers/operations, typically in
production. This person might then choose to share his/her whole Account
with every other person from the team/organization to allow others to
easily access all apps created under that account.

Some of the invited users might be given the ADMIN role, which gives
them read and write (and invite) rights. Other invitees might get the
USER role, which gives mostly just read rights (plus ability to
create/edit their own dashboards/alerts/subscriptions which are
available to everyone under the shared account). In some cases, account
OWNER will not be able to handle billing related info and will want to
invite 1 or more BILLING_ADMINs who will be able to define/edit/delete
credit cards and choose plans to be used for apps under your account.

## Alerts

### Can I send alerts to HipChat, Slack, Nagios, or other WebHooks?

Sematext has integrations for Slack, HipChat, PagerDuty, VictorOps,
OpsGenie, BigPanda, general WebHooks, email, and more.  See
[integrations](/integration) and [alerts docs](/alerts).

### What are Threshold-based Alerts?

Threshold-based alerts are classic alerts where you choose a metric
and a numeric value (a threshold) that, when reached or crossed,
triggers an alert.

### What is Anomaly Detection?

Anomaly Detection uses a number of statistical algorithms to determine
if a metric has become anomalous, meaning that its recent values have
become significantly different from the "base" – the normal/typical
values of that metric.  An example of an anomaly is a sudden spike or
a sudden dip in a metric value.  Sematext can trigger alerts when such
anomalies are detected.

### What are Heartbeat Alerts?

Heartbeat Alerts are extremely useful for keeping an eye on your
applications.  You create a single Heartbeat Alert for each Monitoring
App.  From then on, Sematext will watch all instances of your
application that are a part of that Monitoring App. Should Sematext
not hear from any one of your application's instances for more than N
minutes, it will alert you.  N can be as low as 2 minutes and you
choose it yourself when you create a Heartbeat Alert.


## Security

See [monitoring FAQ](/monitoring/spm-faq) and [logging FAQ](/logs/faq).

## Billing

### How do you bill for infrastructure and server monitoring?

See [monitoring billing FAQ](/monitoring/spm-faq#billing).

### How do you bill for Docker container monitoring?

See [monitoring billing FAQ](/monitoring/spm-faq#billing).

### Which credit cards are accepted?

We accept all major credit cards - Visa, MasterCard, American
Express, JCB, Discover, and Diners Club.  We can also invoice you if you
want to pay via ACH or bank wires.

### Can I receive monthly invoices instead of paying with a credit card?

Yes, simply let us know and we'll switch you to monthly invoices.  Invoices can be emailed to you
and/or to an alternative email address (e.g. your Accounts Payable department).

### Can I make a one-time payment and avoid monthly invoices or credit card?

Yes, we offer a pre-payment option through invoicing.  When you select
this option simply email us and let us know how much you want to
pre-pay.  If you want that credit to cover some period of time you'll
want to consider how many apps/servers/containers you need to monitor,
whether they are running 24/7, or your daily log volume and retention,
and which plan(s) you'd like.  We'll invoice you and, once we receive
your payment, we'll add this amount as credit towards your Sematext
account balance.  Every month, we will subtract from this balance according to your
previous month's usage.  We'll notify you before your balance gets
too low, so that we can repeat the invoicing process before your
credit runs out.

### How often will I get billed?

We bill on a monthly basis and send an email to notify you of the
amount.

### Can the billing email be sent to our Accounts Payable/Accounting instead of me?

Yes, when you select your plan and payment method you will also
be able to enter an alternative billing email address.  Also, search
this FAQ for information about BILLING_ADMIN role.

### Do I have to commit or can I stop using Sematext at any time?

There is no commitment and no contract. When/if you want to stop
using Sematext you simply stop sending us your metrics and/or switch to the
Free plan.

### Can I download our invoices?

Yes, just log in and look under Account \> Billing \> Invoices.  If
you don't see invoices there then you likely need to switch to a
different account.  To do that look for a pull-down menu at the
top-right of the UI.
