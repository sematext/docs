title: Default Alert Notification Hooks
description: Default account notification hook(s) is used to easily change where alert notifications are sent without needing to modify each and every alert rule individually. 

Each alert rule can be configured to send notifications to one or more
notification hooks.  But what do you do when you want to change where
all alert notifications are sent?  For example, what if you had them
sent to VictorOps, but your team switched from VictorOps to OpsGenie?

To make it easy to change where alert notifications are sent for the
whole Sematext Cloud account, without needing to modify each and every
alert rule individually, Sematext has the concept of "account default
hook".

Each notification hook can be marked as "account default hook".  While
creating or modifying an alert rule one can choose whether to send
notifications to whichever hook (or hooks!) is defined as default.

<img alt="Alert rule default notification hook setting"
src="../../images/alerts/alert-rule-default-hook.png"
title="Alert rule default notification hook setting">

When alerts are defined to use default notification hooks then where
they send notifications can be changed by simply changing which
notification hooks are marked as default!

More than one notification hook can be marked as default.  Which hooks
are marked as default can be changed at any time.  The change is
instantaneous and applies to the whole account.  Only alert rules that
were defined to use the default notification hook(s) are affected.
Any additional notification hooks specified for the alert rule will
not be touched and will remain associated with the alert rule.
