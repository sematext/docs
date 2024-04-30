title: Handling Sensitive Data
description: How to store your User Journey script credentials securely

Earlier on we mentioned that Browser monitors can be used to interact with a website in various ways. This interaction often includes logging in, so that one may access the features available only to registered users. Logging in is usually performed by passing certain credentials to a form on the page and then submitting it. Since these credentials must be supplied inside of the User Journey script, we understand that users might be concerned with their security. By using our **Add Sensitive Data** functionality, your credentials will be securely stored inside [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/). That means they won't be visible in a plaintext format inside of scripts, instead being replaced by a placeholder value which you specify. These placeholders are replaced with the actual values only during the User Journey script's execution.

### Using Secrets

To showcase an example of where Secrets could be used, we'll use the User Journey script in the screenshot below.

 ![Browser monitor script with plaintext credentials](../../images/synthetics/secrets-script-plaintext.png)

As you can see, this User Journey script navigates to some page, fills in input fields with a username and a password, logs in and takes a screenshot. However, note that the credentials in this example are in their plaintext form. You can avoid having plaintext credentials stored in your scripts and instead substitute them with placeholders, while the actual credentials themselves are securely stored inside AWS Secrets Manager. To do this, you can click on the **Add Sensitive Data** button located right above the script editor. Upon doing so, you'll see the menu for adding sensitive data appear on the right side.

 ![Adding sensitive data for Browser monitor scripts ](../../images/synthetics/secrets-script-creating-secret.png)

Here we can assign placeholder values which will be displayed instead of the actual credentials. Instead of our actual username, we'll use `$__username__` and we'll replace the password with `$__password__`. Note that these placeholders (or *Secret Keys*) must be in this format:

- `$__exampleSecretKey__`

meaning that they must start with `$__` and end with `__`, and they may only contain alphanumeric characters and underscores. Once you're satisfied with the values you've defined, click the Save button in the menu's bottom right corner. You'll then see the keyboard shortcut tooltip below the script editor, which will let you quickly insert the placeholders you've defined into your script, as seen in the screenshot below.

 ![Browser monitor script secrets autofill feature ](../../images/synthetics/secrets-script-autofill.png)

If we select the `$__password__` placeholder from the tooltip, it will be inserted at the cursor's position, as seen in the image below.

 ![Browser monitor script with secrets ](../../images/synthetics/secrets-script-with-secrets.png)

Once you finish adding your sensitive data, keep in mind that the secret values you've filled in won't be accessible on Sematext Cloud anymore. They will only be used while executing your script, allowing you to define the credentials once and avoid having to worry about who has access to them. Because we can't access these secrets from Sematext Cloud, that will also mean that you'll have to input ***all*** of your secret values if you decide to edit them. The only values we'll be able to display are the placeholders you've defined, so that you can conveniently edit your User Journey scripts and easily reference your credentials without having to edit them. An example of what the **Add Sensitive Data** menu will look like upon saving and then editing the monitor is shown in the screenshot below.

 ![Editing sensitive data ](../../images/synthetics/secrets-script-edit-secrets.png)