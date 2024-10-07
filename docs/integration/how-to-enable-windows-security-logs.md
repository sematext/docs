title: How to Enable Windows Security Logs
description: Important Windows Security Logs to keep track of.

By default, some critical security events are not tracked by Windows Servers. To improve security monitoring, you need to manually enable logging for these events. Below is a list of the top 10 security events and steps to enable them.

## File Audit

Keeps track of who accessed or changed important files.

**How to enable auditing for specific files or folders:**

1. **Enable Object Access Auditing:** (Allows Windows to start tracking access to any files or folders you specify later.)

   - Open **Group Policy Editor** (type `gpedit.msc` in the Start menu).
   - Go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Object Access > Audit File System`.
   - Set both **Success** and **Failure** to track all actions.

2. **Set Auditing on a Specific File or Folder:**

   - Right-click on the file or folder you want to audit and select **Properties**.
   - Go to the **Security** tab and click **Advanced**.
   - In the Advanced Security Settings window, go to the **Auditing** tab.
   - Click **Add**, then select **Principal**. In the box that appears, type **Everyone**, and click **OK**.
   - Under **Type**, select **Success** (to track successful access) and **Failure** (to track failed access attempts).
   - Under **Basic Permissions**, select the activities you want to audit (e.g., **Read, Write, Delete**).
   - Click **OK** to apply the settings, and close the windows.

## Process Creation

Helps detect suspicious software by tracking what processes are running.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Detailed Tracking > Audit Process Creation`.
2. Set **Success** to log every new process.

## Registry Changes

Monitors changes to the Windows Registry. The Registry is often targeted by malware, so monitoring changes is key.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Object Access > Audit Registry`.
2. Enable both Success and Failure.

## Logon/Logoff Events

Tracks when users log in and out, helping to identify unauthorized access.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Logon/Logoff > Audit Logon`.
2. Enable both **Success** and **Failure**.

## Privilege Use

Monitors the use of sensitive privileges that could affect system security.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Privilege Use > Audit Sensitive Privilege Use`.
2. Enable **Success** to track when special permissions are used.

## Audit Policy Changes

Tracks any changes to logging settings, which might signal tampering attempts.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Policy Change > Audit Audit Policy Change`.
2. Enable **Success** and **Failure**.

## Object Access

Tracks access to sensitive system objects like files or shared resources might lead to detect unauthorized access.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Object Access > Audit Object Access`.
2. Enable both **Success** and **Failure**.

## Account Lockouts

Helps detect brute-force attacks and login issues.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Account Logon > Audit Account Lockout`.
2. Enable **Success** and **Failure**.

## User Account Management

Tracks when user accounts are created, deleted, or modified.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Account Management > Audit User Account Management`.
2. Enable both **Success** and **Failure**.

## System Integrity

Tracks system integrity violations, such as failed checks of important files or drivers. Helps detect tampering or issues that compromise the system’s integrity.

**How to enable:**

1. In **Group Policy Editor**, go to: `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > System Integrity > Audit System Integrity`.
2. Enable both **Success** and **Failure**.

