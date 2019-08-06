title: Sematext User Roles
description: Inviting team members to your account means they get access to all your Apps, dashboards, notification hooks, alert rules, and everything else!

**What is the difference between OWNER, ADMIN, BILLING_ADMIN, and USER roles?**

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

**When would I want to add someone as BILLING_ADMIN?**

When you don't have a credit card that should be used for
charging, but some other person has it, you should invite this person
and give them the BILLING_ADMIN role. Similarly, if you created an
account and defined a credit card, but now want somebody else to take
care of all billing related activity (assigning plans and credit cards
to various apps), you'd give them the BILLING_ADMIN role.