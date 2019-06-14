title: Transactions
description: Overview on how to use on page transactions

Sometimes it is useful to measure some user activity on your website. 
It may give you better understanding about users feeling during interaction with your site.
Measure how fast you reply on live-chat or how big a delay between user sees page and click on some button and other any kind of stuff you can imagine.

### Examples

First of all add transaction to App, press green + button on top-right corner

<img
  class="content-modal-image"
  alt="Add Transaction"
  src="../../images/experience/onPageTransactions/screen0.png"
  title="Add Transaction"
  width=1838
  height=604
/>

Specify Transaction name (name is important, it has to match name we will use on scripts side, see later), target time and description (optional), press save.

<img
  class="content-modal-image"
  alt="Specify Transaction"
  src="../../images/experience/onPageTransactions/screen1.png"
  title="Specify Transaction"
  width=1053
  height=485
/>

Transaction was added,

<img
  class="content-modal-image"
  alt="Transaction was added"
  src="../../images/experience/onPageTransactions/screen2.png"
  title="Transaction was added"
  width=1837
  height=607
/>

but there is no RUM data related to our transaction, let's improve this.

Add this call to start transaction (second parameter must match transaction name we previously created)

 ```javascript
 strum('startTransaction', 'ExampleTransaction');

```

And by this call transaction will be ended
 ```javascript
 strum('endTransaction', 'ExampleTransaction');

```

Finally you will see this picture after calls we created above will send data to us about users activity.

<img
  class="content-modal-image"
  alt="Transactions in action"
  src="../../images/experience/onPageTransactions/screen3.png"
  title="Transactions in action"
  width=1837
  height=607
/>

Enjoy your Transactions.

