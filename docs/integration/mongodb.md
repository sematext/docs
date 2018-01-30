<div class="video_container">
<iframe class="video" src="https://www.youtube.com/embed/BIERrXzbiNM" frameborder="0" allowfullscreen ></iframe>
</div>

## Overview

The client for "SPM for MongoDB" is an open-source [mongodb monitoring agent](https://github.com/sematext/spm-agent-mongodb) that collects MongoDB metrics and sends them to SPM. It is available as[ npm](https://www.npmjs.com/package/spm-agent-mongodb)[ package](https://www.npmjs.com/package/spm-agent-mongodb) (see Installation & Configuration section below).

In addition to collecting MongoDB metrics, you can send [Custom Metrics](monitoring/custom-metrics), such as the number of concurrent
users, the number of items placed in a shopping cart, or any other kind
of business transaction or KPI.

## Installation and Configuration

1.  Create an SPM App of type "MongoDB" in SPM 
2.  Click the "**Install Monitor**" button and follow the customized
    instructions for the created SPM App (basically how to install
    the [NPM package](https://www.npmjs.com/package/spm-agent-mongodb)
    and configure the SPM App Token)

## Troubleshooting and "How To"

### Generate diagnostics file for Sematext Support

If you are not seeing some or all MongoDB metrics, you can create a
"diagnostics dump" and contact us via chat or email. To create the
diagnostics dump just run the following in your application directory:

    spm-client-diagnostics

The output of this script points to the ZIP file and shows the Sematext
Support email address to which the ZIP file should be sent. 

### Using SPM for MongoDB behind Firewalls / Proxy servers   

By default data is transmitted to SPM via HTTPS. If no direct connection
is possible, a proxy server can be used by setting the environment
variable HTTPS\_PROXY=[https://your-proxy](https://your-proxy/).

### Installation of native modules on Windows

The native modules are automatically compiled during "npm install"
(using node-gyp). On Windows the required build tools like python or C++
compilers are typically not installed by default.  
In this case please check <https://github.com/TooTallNate/node-gyp> for
details about the required compiler and build tools.

### Upgrading to a new node.js version

If you switch the node.js version (e.g. from 0.12 to 4.x), the
spm-agent-mongodb package will need to be installed again (due to the
fact that included native modules may change from version to version).
  After the version change please run a fresh installation "npm i
spm-agent-mongodb -g" 

### Upgrading to the latest version of spm-agent-mongodb

To use the latest version of spm-agent-mongodb we recommend you
install/upgrade using:

    npm i spm-agent-mongodb@latest -g

## Github Repository

The latest version and related information is available in the Github
repository
 [sematext/spm-agent-mongodb](https://github.com/sematext/spm-agent-mongodb)

## Integration

- Instructions: [https://apps.sematext.com/ui/howto/MongoDB/overview](https://apps.sematext.com/ui/howto/MongoDB/overview)

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
flushes time | mongo.flushes.time | Sum | Long | Time spend in flushes during the collection interval
flushes count | mongo.flushes | Sum | Long | Flushes in collection interval
created | mongo.network.connections.total | Sum | Long | Created provides a count of all incoming connections created to the server. This number includes connections that have since closed.
current | mongo.network.connections | Avg | Double | The value of current corresponds to the number of connections to the database server from clients.
num requests | mongo.network.requests | Sum | Long | Number of network requests
received | mongo.network.transfer.rx.rate | Sum | Long | The value of 'received' reflects the amount of network traffic, in bytes, received by this database.
transmitted | mongo.network.transfer.tx.rate | Sum | Long | The value of 'transmitted' reflects the amount of network traffic, in bytes, sent by this database.
acquire count | mongo.locks | Sum | Long | Lock count
acquire count waits | mongo.locks.wait | Sum | Long | Number of times the acquireCount lock acquisitions encountered waits because the locks were held in a conflicting mode.
wait time | mongo.locks.acquiring.time.microsec | Sum | Long | Cumulative wait time for the lock acquisitions.
deadlock count | mongo.locks.deadlock | Sum | Long | Number of times the lock acquisitions encountered deadlocks.
early commits | mongo.journal.commits.early | Sum | Long | Number of times MongoDB requested a commit before the scheduled journal group commit interval. Use this value to ensure that your journal group commit intervalis not too long for your deployment.
commits write-lock time | mongo.journal.commits.locked.time | Sum | Long | Amount of time spent for commits that occurred while a write lock was held. Commits in a write lock indicate a MongoDB node under a heavy write load and call for further diagnosis.
written files data | mongo.journal.data.written | Sum | Long | Amount of data written from journal to the data files during the last journal group commit interval.
written journal data | mongo.journal.data | Sum | Long | Amount of data written to journal during the last journal group commit interval.
commits time | mongo.journal.commits.time | Sum | Long | Amount of time spent for commits.
commits | mongo.journal.commits | Sum | Long | Number of transactions written to the journal during the last journal group commit interval.
collections count | mongo.database.collections | Avg | Long | Count of collections/tables
data size | mongo.database.data.size | Avg | Long | The total size in bytes of the data held in this database including the padding factor.
index size | mongo.database.index.size | Avg | Long | The total size in bytes of all indexes created on this database.
namespace size | mongo.database.namespace.size | Avg | Long | The total size of the namespace files (i.e. that end with .ns) for this database.
storage size | mongo.database.storage.size | Avg | Long | The total amount of space in bytes allocated to collections in this database for document storage.
objects count | mongo.database.objects | Avg | Long | Count of objects in db
file size | mongo.database.file.size | Avg | Long | The total size in bytes of the data files that hold the database. This value includes preallocated space and the padding factor.
mapped mem | mongo.memory.mapped | Avg | Long | The value of mapped provides the amount of mapped memory, in megabytes (MB), by the database. Because MongoDB uses memory-mapped files, this value is likely to be to be roughly equivalent to the total size of your database or databases.
resident mem | mongo.memory.resident | Avg | Long | The value of resident is roughly equivalent to the amount of RAM, in megabytes (MB), currently used by the database process. In normal use this value tends to grow.
virtual mem | mongo.memory.virtual | Avg | Long | Virtual displays the quantity, in megabytes (MB), of virtual memory used by the mongod process. With journaling enabled, the value of virtual is at least twice the value of mapped. If virtual value is significantly larger than mapped (e.g. 3 or more times), this may indicate a memory leak.
mapped mem with journal | mongo.memory.mapped.withjournal | Avg | Long | mappedWithJournal provides the amount of mapped memory, in megabytes (MB), including the memory used for journaling. This value will always be twice the value of mapped. This field is only included if journaling is enabled.
inserted | mongo.documents.inserted | Sum | Long | Number of inserted documents.
returned | mongo.documents.returned | Sum | Long | Total number of documents returned by queries.
updated | mongo.documents.updated | Sum | Long | Number of updated documents.
deleted | mongo.documents.deleted | Sum | Long | Number of deleted documents.
query | mongo.ops.query | Sum | Long | Query operations
commands | mongo.ops.command | Sum | Long | Commands
query | mongo.replica.ops.query | Sum | Long | Query operations
insert | mongo.ops.insert | Sum | Long | Insert operations
insert | mongo.replica.ops.insert | Sum | Long | Insert operations
update | mongo.replica.ops.update | Sum | Long | Update operations
failed | mongo.commands.failed | Sum | Long | Failed commands / operations (all DB commands/functions)
delete | mongo.replica.ops.delete | Sum | Long | Delete operations
commands | mongo.replica.ops.command | Sum | Long | Commands
update | mongo.ops.update | Sum | Long | Update operations
delete | mongo.ops.delete | Sum | Long | Delete operations
getmore | mongo.ops.getmore | Sum | Long | Getmore operations
getmore | mongo.replica.ops.getmore | Sum | Long | Getmore operations
