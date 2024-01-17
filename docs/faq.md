title: Sematext Cloud FAQ
description: Sematext Cloud Frequently Asked Questions

## General

### What should I do if I can't find the answer to my question in the FAQ?

Check out the FAQs for each of Sematext Cloud solutions:

- [Sematext Monitoring FAQ](/monitoring/spm-faq)
- [Sematext Logs FAQ](/logs/faq)
- [Sematext Synthetics FAQ](/synthetics/faq)
- [Sematext Experience FAQ](/experience/faq)

If you can't find the answer to your question please email <support@sematext.com> or use our live chat.

### Does Sematext integrate with Slack? How about PagerDuty or custom WebHooks?

Yes, see [integrations](/integration), [alerts FAQ](#alerts), and [alerts docs](/alerts).

## Organizing Apps

### I have N environments (production, staging, test, etc). How many Apps for Logs/Monitoring should I create?

Keep data separate between environments: you'll get better visibility if you see aggregate metrics/logs per environment instead of overall. It will cost less because you can choose different plans: for example, shorter retention for testing than for production.

The easiest way is to have different [Infra Apps](/monitoring/infrastructure) for each environment, then a [Logs](/logs)/[Monitoring](/monitoring) App for each environment as well. The Infra App of each enviromnet will be linked to the right Logs App via [Logs Discovery](/logs/discovery/intro) and to the right Monitoring App via [Service Discovery](/monitoring/autodiscovery). An alternative to using separate Apps is using a shared App and relying on [Custom Tags](/tags/custom-tags) to keep your data separate. The data can then be further isolated with the use of [Saved Views](/guide/saved-views).

### Can you give me an example?

Say you want to monitor two Solr clusters: one in production and one in staging. You'll start by creating two [Infra Apps](/monitoring/infrastructure): one for each environment. Even if you don't need [Infrastructure Monitoring](/monitoring/infrastructure), you'll need to have those Infra Apps.  You can have them on the [Basic (free) plan](https://sematext.com/pricing/#spm) to avoid any costs. Install Sematext Agent on all hosts and make them send data to their respective App, as written in the [instructions](/monitoring/quick-start).

Then you'd set up [Solr Monitoring](/integration/solr) Apps: one per environment. At this point, you shouldn't need to touch the hosts: when it comes to shipping Solr metrics, simply select the corresponding Infra App and use [Autodiscovery](/monitoring/autodiscovery) to set up monitoring.

You'll do the same with [Solr Logs](/integration/solr-logs): create one App per environment, select the right Infra App and use [Logs Discovery](/logs/discovery/intro).

At this point, if you add a new host in an environment, all you have to do is to install Sematext Agent and point it to the right Infra App. Your Solr logs and metrics will automatically be shipped to the right Apps.

## Sharing

### How can I share my Sematext Apps with other users?

There are two options:

 - Account sharing
 - App sharing

Account sharing is recommended for teams.  It's easier to add and remove access, easier to manage.
We recommend creating a [team account](/team/#team-account) and sharing that with the team members.
If you've already set up Apps, Alert Rules, etc. under your own account you can [convert your account to team account](/team/#converting-to-team-account).

See [Team Account Members](/team/#account-members) for more info about account sharing and [App Guests](/team/#app-guests) for info about App sharing.

Account sharing and App sharing is not exclusive.  You can use both of
these two sharing types at the same time. You could share your account with
some users, and use App sharing to share specific Apps with other
users.

### What is the difference between OWNER, ADMIN, BILLING_ADMIN, and USER roles?

There are 3 common roles available when Sharing Account and
Sharing App (**OWNER**, **ADMIN**, **USER**), and one role which is
specific only to Account Sharing (**BILLING_ADMIN**).  
  
Each account has one OWNER (if you created some account, you are its
OWNER). Each App also has one OWNER. The OWNER of an App is OWNER of
account under which that App was created. If you create an App under
your account, you are the OWNER of that App. If some user with whom
you've shared your account creates a new App under your account, you are
again the OWNER of that App. However, if that user creates a new App
under their own account, then they will be its OWNER.
  
Each account and App can have 0 or more ADMINS and USERS. If you added
some user as ADMIN to your account, they also automatically gets the ADMIN
role for all your Apps (account role is transitive to App role).  
  
ADMIN users can modify everything under your account/App except billing
related info. They can: create, delete, and update all
dashboards, alerts, scheduled reports, users... Users with USER role have read
rights on everything except billing info (they can view all reports,
dashboards, alerts...). They can even create/edit their own alerts and
scheduled reports for Apps from the shared account.  They cannot, however, edit other user's
alerts or scheduled reports, only ADMINs can do that. If they were added to an
Account (not to an App), then they can also create their own dashboards and
add other USERs to your account.  
  
There is a special role available when Sharing Account - BILLING_ADMIN.
This role has all rights as the standard ADMIN, but can also access/edit
billing-related info. The only thing this role cannot do is change
password of your account.

See [typical roles in an organization](/team/#typical-use-of-roles-in-an-organization-or-team) and [Sematext user roles](/team/user-roles/) for more info.

### When would I want to add someone as BILLING_ADMIN?

When you don't have a credit card that should be used for
charging, but some other person has it, you should invite this person
and give them the BILLING_ADMIN role. Similarly, if you created an
account and defined a credit card, but now want somebody else to take
care of all billing related activity (assigning plans and credit cards
to various Apps), you'd give them the BILLING_ADMIN role.

### What might a typical use of roles for an organization with many employees look like?

Typically you might have one person create an account
via <https://apps.sematext.com/ui/registration>. This account might be
considered a "parent" account for your whole organization.  
Since the person who created the account would be its OWNER, this person
is typically (but not necessarily) a team leader or manager, or somebody
whose responsibility is to oversee servers/operations, typically in
production. This person might then choose to share his/her whole Account
with every other person from the team/organization to allow others to
easily access all Apps created under that account.

Some of the invited users might be given the ADMIN role, which gives
them read and write (and invite) rights. Other invitees might get the
USER role, which gives mostly just read rights (plus ability to
create/edit their own dashboards/alerts/subscriptions which are
available to everyone under the shared account). In some cases, account
OWNER will not be able to handle billing related info and will want to
invite 1 or more BILLING_ADMINs who will be able to define/edit/delete
credit cards and choose plans to be used for Apps under your account.

## Alerts

### Can I send alerts to Slack, Nagios, or other WebHooks?

Sematext has integrations for Slack, PagerDuty, VictorOps,
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

### How do you bill for infrastructure (servers, containers, kubernetes, VMs...) monitoring?

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
want to consider how many Apps/servers/containers you need to monitor,
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

Yes, just log in and look under Account \> Settings \> Plans & Billing \> Invoices.  If
you don't see invoices there then you likely need to switch to a
different account.  To do that look for a pull-down menu at the
bottom-left of the UI.
