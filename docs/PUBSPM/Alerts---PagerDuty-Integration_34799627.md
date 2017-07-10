### **1) In PagerDuty:**

**Create a new service:**

1.  In your account, under the Services tab, click “Add New Service”.
2.  Select an Escalation Policy (e.g. default)
3.  Start typing “**Sematext**” for the **Integration Type,** which will
    narrow your filtering.  
    ![](attachments/34799627/34865155.png?width=915)
4.  Click the **Add Service** button
5.  Once the service is created, you’ll be taken to the Service page. On
    this page, you’ll see the “**Service API key,”**which you will need
    when you configure Sematext products to send events to PagerDuty.
    Copy the “*Service API Key*“ to the clipboard.   
    ![](attachments/34799627/34865156.png?width=668) 

### **2) In SPM**

1\) Navigate to **SPM Application Settings** of your SPM App by clicking
the **App Settings** button in the top-right when you’re in the SPM
UI.  
    ![](attachments/34799627/34865158.png?width=196)

2\) Navigate to **Alerts / PagerDuty**“

![](attachments/34799627/34865159.png?width=945)

3\) Enter the API key from PagerDuty in the field **Service API key**

4\) Press the **Save** button

**Done. **Every alert from your SPM app will be forwarded to PagerDuty,
where you can manage escalation policies and configure notifications to
other services like HipChat, Slack, Zapier, Flowdock, and more.