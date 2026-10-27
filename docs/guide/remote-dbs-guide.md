title: Monitoring Remote Databases
description: This guide explains how to monitor remote databases (MySQL, PostgreSQL, etc.) hosted on external servers, cloud providers like AWS or any infrastructure outside your local environment using Sematext Agent in manual mode.

## Overview

When monitoring remote databases, you'll install the [Sematext Agent](/docs/agents/sematext-agent/) on a monitoring host (which can be different from the database server) and configure it to connect to the remote database instance. This approach is particularly useful for:

- Monitoring cloud-hosted databases (AWS RDS, Google Cloud SQL, Azure Database, etc.)
- Monitoring databases on remote servers or VMs

## Prerequisites

Before you begin, make sure you have:

- A [Sematext App](/docs/monitoring/quick-start/) created for your database monitoring
- Network connectivity from your monitoring host to the remote database
- Appropriate database credentials with monitoring privileges
- A Linux host where you'll install the Sematext Agent

## Step 1: Agent Installation

Add the Sematext repository and install the agent:

```bash
sudo apt-get install ca-certificates && \
curl -fsSL https://pub-repo.sematext.com/ubuntu/sematext.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/sematext-archive-keyring.gpg && \
echo "deb [signed-by=/usr/share/keyrings/sematext-archive-keyring.gpg] http://pub-repo.sematext.com/ubuntu sematext main" | sudo tee /etc/apt/sources.list.d/sematext.list > /dev/null && \
sudo apt-get update && \
sudo apt-get install sematext-agent
```

## Step 2: Database User Setup (Remote Database) - Optional

This step is **optional**. You can either create dedicated monitoring credentials or use existing database credentials in Step 3.

### Option A: Create Dedicated Monitoring User (Recommended)

**A. For MySQL/MariaDB**

Connect to your remote MySQL database and create a monitoring user:

```sql
CREATE USER 'spm-user'@'%' IDENTIFIED BY 'spm-password';
CREATE USER 'spm-user'@'127.0.0.1' IDENTIFIED BY 'spm-password';
```

**Important Notes:**

- Replace `spm-user` and `spm-password` with your desired credentials
- The `'%'` allows connections from any host, including your monitoring server
- Grant appropriate privileges based on your security requirements
- For enhanced security, replace `'%'` with the specific IP address of your monitoring host

**B. For Other Database Types**

Sematext supports monitoring for [many other database and data store types](/docs/integration/#databases-data-stores). Refer to your specific database documentation for creating monitoring users with appropriate privileges.

### Option B: Use Existing Database Credentials

If you prefer to use existing database credentials, you can skip this step and provide those credentials directly in Step 3. Make sure the existing user has sufficient privileges for monitoring operations.

**Required Privileges by Database Type**

**A. MySQL/MariaDB:**
```sql
GRANT SELECT ON *.* TO 'your-user';
GRANT PROCESS ON *.* TO 'your-user';
GRANT REPLICATION CLIENT ON *.* TO 'your-user';
```

**B. PostgreSQL:**

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO your_user;
GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO your_user;
-- For specific monitoring views
GRANT pg_monitor TO your_user;
```

For other database types, refer to your database's documentation for read-only monitoring privileges.

## Step 3: Configure Sematext Agent for Remote Database

**Important:** Each database integration has specific configuration parameters. Always refer to the Agent Installation instructions provided in your specific Sematext App for the exact command and parameters.

### Setup Process

1. Navigate to your Sematext App → Ship Metrics → Install Agent → Select Environmnent 
2. Select "Manual" installation mode
3. Copy the `sudo bash /opt/spm/bin/setup-sematext` command from **step 2 of Agent Setup** in the instructions
4. Modify the host/port parameters to point to your remote database instead of localhost
5. Update credentials with either the monitoring user from Step 2 or existing database credentials
6. Run the modified command on your monitoring host

### Common Parameter Patterns by Integration Type

**MySQL / MariaDB**
```bash
--ST_MONITOR_MYSQL_DB_HOST_PORT 'remote-host:3306'
--ST_MONITOR_MYSQL_DB_USER 'your-username'
--ST_MONITOR_MYSQL_DB_PASSWORD 'your-password'
```

**PostgreSQL**
```bash
--ST_MONITOR_POSTGRESQL_HOST_PORT 'remote-host:5432'
--ST_MONITOR_POSTGRESQL_DB_USER 'your-username'
--ST_MONITOR_POSTGRESQL_DB_PASSWORD 'your-password'
--ST_MONITOR_POSTGRESQL_DB_NAME 'your-database'
```

**OpenSearch**
```bash
--ST_MONITOR_OPENSEARCH_NODE_HOSTPORT 'remote-host:9200'
--ST_MONITOR_OPENSEARCH_NODE_BASICAUTH_USERNAME 'your-username'
--ST_MONITOR_OPENSEARCH_NODE_BASICAUTH_PASSWORD 'your-password'
```

**Elasticsearch**
```bash
    --ST_MONITOR_ES_NODE_HOSTPORT 'remote-host:9200'
    --ST_MONITOR_ES_NODE_BASICAUTH_USERNAME 'your-username'
    --ST_MONITOR_ES_NODE_BASICAUTH_PASSWORD 'your-password'
```

### Examples for Different Remote Database Scenarios

**AWS RDS MySQL Instance**
```bash
--ST_MONITOR_MYSQL_DB_HOST_PORT 'mydb.cluster-xyz.us-east-1.rds.amazonaws.com:3306'
```

**Google Cloud SQL PostgreSQL Instance**  
```bash
--ST_MONITOR_POSTGRESQL_HOST_PORT 'google-cloud-ip:5432'
```

**Remote Server with Custom Port**
```bash
--ST_MONITOR_MYSQL_DB_HOST_PORT '192.168.1.100:3307'
```

**Azure Database for MySQL**
```bash
--ST_MONITOR_MYSQL_DB_HOST_PORT 'myserver.mysql.database.azure.com:3306'
```

## Important Considerations

### Network Connectivity

- Make sure the monitoring host can reach the remote database on the specified port
- Configure security groups, firewalls, and network ACLs accordingly
- Test connectivity before running the setup command:
  ```bash
  nc -zv remote-db-host 3306
  ```

### Monitoring Host Placement

- Place the monitoring host in the same network region/data center as the database when possible to minimize network latency
- For cloud databases, deploy the monitoring host in the same region/availability zone when possible to avoid cross-AZ data transfer costs

## Verification

After configuration, verify that monitoring is working:

1. Check agent status:
   ```bash
   sudo systemctl status sematext-agent
   ```

2. Check your Sematext App for incoming metrics

## Next Steps

Once your remote database monitoring is configured:

- [Set up alerts](/docs/guide/alerts-guide) for key database metrics
- [Create custom dashboards](/docs/dashboards/) for your specific use case  
- Consider monitoring multiple database instances from the same monitoring host
