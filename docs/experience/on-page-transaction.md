title: On-Page Transactions
description: Sematext Experience supports monitoring On-Page Transactions. Learn how to use and set up On-Page Transactions here.

Measuring user-activity can be crucial to understanding what your users are feeling while interacting with your website. This gives you a better understanding about your users needs. Measuring delays between when a user sees a page and clicks a button, versus how big of a delay users see when navigating between pages on your website, or how fast you reply to a live-chat question are all crucial when in understanding your users' needs.

### Adding On-Page Transactions

First of all, you need to add transactions to your App. Press the green plus button in the top right corner.

<img
  class="content-modal-image"
  alt="Add Transaction"
  src="../../images/experience/onPageTransactions/screen0.png"
  title="Add Transaction"
/>

Specify a Transaction `name`. Have in mind the name is important, it has to match the name you will use in the Real User Monitoring script. Also, add `target time` and `description` then press save.

<img
  class="content-modal-image"
  alt="Specify Transaction"
  src="../../images/experience/onPageTransactions/screen1.png"
  title="Specify Transaction"
/>

The Transaction was added, but there is no RUM data related to it, let's improve this.

<img
  class="content-modal-image"
  alt="Transaction was added"
  src="../../images/experience/onPageTransactions/screen2.png"
  title="Transaction was added"
/>

Add this function call to start the transaction. The second parameter must match the transaction name you previously created.

 ```javascript
 strum('startTransaction', 'ExampleTransaction');

```

And by this call transaction will be ended
 ```javascript
 strum('endTransaction', 'ExampleTransaction');

```

Finally, this is what you will see after the transactions start sending data to Sematext Experience about user activity.

<img
  class="content-modal-image"
  alt="Transactions in action"
  src="../../images/experience/onPageTransactions/screen3.png"
  title="Transactions in action"
/>

That's everything you need to configure. Enjoy your Transactions!

