title: ServiceNow Alerts Integration
description: Sematext threshold, anomaly and/or heartbeat Alerts integration with ServiceNow. Use them together to get the information about each notification quickly and on any device.

## In ServiceNow

**1.** In the ServiceNow Service Management screen, search and select the option "Scripted REST APIs"

<img class="content-modal-image" alt="Create Service Now Integration - Search for Scripted REST APIs" src="../../images/integrations/create-servicenow-integration-search.png" title="Create Service Now Integration - Search for Scripted REST APIs">

**2.** Create a new Scripted REST API by clicking **New** on the top bar above the table.

<img class="content-modal-image" alt="Create Service Now Integration - Scripted REST APIs" src="../../images/integrations/create-servicenow-integration-scripted-apis.png" title="Create Service Now Integration - Scripted REST APIs">

**3.** Fill out the name and API ID and then click **Submit**.

<img class="content-modal-image" alt="Create Service Now Integration - Scripted REST API Creation" src="../../images/integrations/create-servicenow-integration-scripted-api-creation.png" title="Create Service Now Integration - Scripted REST API Creation">

**4.** Once you've created the API, you will be taken to the initial Scripted Rest API screen. You can find your application by entering the app name in the search bar and clicking Enter on your keyboard. The app should be shown in the results. Click on the name of the application to continue the setup.

<img class="content-modal-image" alt="Create Service Now Integration - Scripted REST API Search" src="../../images/integrations/create-servicenow-integration-scripted-api-search.png" title="Create Service Now Integration - Scripted REST API Search">

**5.** At the bottom of the page, a table titled "Resources" will be shown. To handle the incoming data, a resource needs to be created. Resource creation can be done by clicking on the "New" button. 

<img class="content-modal-image" alt="Create Service Now Integration - Scripted REST API Resource" src="../../images/integrations/create-servicenow-integration-scripted-api-resource.png" title="Create Service Now Integration - Scripted REST API Resource">

**6.** After clicking, a new screen will be opened where information about the HTTP resource can be added such as the name of the resource, the HTTP method, the relative path, and the script that will be executed when a request is received. The name of the resource and the relative path are arbitrary but the HTTP method should be **POST**. Once you are done with the configuration, click on "Submit" to finish the resource creation.

<img class="content-modal-image" alt="Create Service Now Integration - Scripted REST API Resource Creation" src="../../images/integrations/create-servicenow-integration-scripted-api-resource-creation.png" title="Create Service Now Integration - Scripted REST API Resource Creation">

You can verify the resource was properly created by going to the Resources table. The created entry should be visible there. 

<img class="content-modal-image" alt="Create Service Now Integration - Scripted REST API Resource Explore" src="../../images/integrations/create-servicenow-integration-scripted-api-resource-explore.png" title="Create Service Now Integration - Scripted REST API Resource Explore">

**7.** Above the table, there should be a link with the text "Explore REST API". Click on it. The link should take you to a site where you can test your ServiceNow API resource. On the screen, you should be able to see the full URL to the API. The part after **https://** will be necessary for Web Hook setup in Sematext.

<img class="content-modal-image" alt="Create Service Now Integration - Scripted REST API Resource URL" src="../../images/integrations/create-servicenow-integration-scripted-api-resource-url.png" title="Create Service Now Integration - Scripted REST API Resource URL">


With the **scripted REST API resource** created and configured, the ServiceNow notification hook can be set up in Sematext.

## In Sematext

**1.** Navigate to [Notification Hooks](https://apps.sematext.com/ui/hooks/create) (in [EU](https://apps.eu.sematext.com/ui/hooks/create)) and select ServiceNow card to create a new ServiceNow notification hook.

<img class="content-modal-image" alt="Create Service Now Integration - ServiceNow Web Hook" src="../../images/integrations/create-servicenow-integration-webhooks.png" title="Create Service Now Integration - ServiceNow Web Hook">


**2.** Give your webhook a name. Add the credentials for Service Now and the link to your API obtained in step 7 in the ServiceNow guide.

<img class="content-modal-image" alt="Create Service Now Integration - ServiceNow Web Hook Creation" src="../../images/integrations/create-servicenow-integration-webhook-creation.png" title="Create Service Now Integration - ServiceNow Web Hook Creation">


**3.** Next, click the **Send Test Notification** button. ServiceNow should return **200 (OK)** indicating everything is configured correctly.

<img class="content-modal-image" alt="Create Service Now Integration - ServiceNow Web Hook Test" src="../../images/integrations/create-servicenow-integration-webhook-test.png" title="Create Service Now Integration - ServiceNow Web Hook Test">

Once the test message is visible, click the **Save Notification Hook** button to save your configuration. 
