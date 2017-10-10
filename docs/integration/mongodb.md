<div class="video_container">
<iframe class="video" src="https://www.youtube.com/embed/BIERrXzbiNM" frameborder="0" allowfullscreen ></iframe>
</div>

## Overview

The client for "SPM for MongoDB" is an open-source [mongodb monitoring
agent](https://github.com/sematext/spm-agent-mongodb) that collects
MongoDB metrics and sends them to SPM. It is available
as[ npm](https://www.npmjs.com/package/spm-agent-mongodb)[ package](https://www.npmjs.com/package/spm-agent-mongodb) (see
Installation & Configuration section below).

In addition to collecting MongoDB metrics, you can send [Custom Metrics](custom-metrics), such as the number of concurrent
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

## Metrics

### Report: MongoDB Background Flushes

#### Chart: Background Flushes
Metric Name | Metric Description
--- | ---
flushes count | Flushes in collection interval
flushes time | Time spend in flushes during the collection interval
avg. flush time | Avg. flush duration



### Report: MongoDB Network

#### Chart: Traffic
Metric Name | Metric Description
--- | ---
received | The value of 'received' reflects the amount of network traffic, in bytes, received by this database.
transmitted | The value of 'transmitted' reflects the amount of network traffic, in bytes, sent by this database.

#### Chart: Connections
Metric Name | Metric Description
--- | ---
current | The value of current corresponds to the number of connections to the database server from clients.
created | Created provides a count of all incoming connections created to the server. This number includes connections that have since closed.

#### Chart: Requests
Metric Name | Metric Description
--- | ---
num requests | Number of network requests
requests rate | Network request rate



### Report: MongoDB LockScope

#### Chart: Locks
Metric Name | Metric Description
--- | ---
acquire count | Lock count
acquire count waits | Number of times the acquireCount lock acquisitions encountered waits because the locks were held in a conflicting mode.
deadlock count | Number of times the lock acquisitions encountered deadlocks.
wait time | Cumulative wait time for the lock acquisitions.



### Report: MongoDB Journal

#### Chart: Journal Commits
Metric Name | Metric Description
--- | ---
commits | Number of transactions written to the journal during the last journal group commit interval.
early commits | Number of times MongoDB requested a commit before the scheduled journal group commit interval. Use this value to ensure that your journal group commit intervalis not too long for your deployment.
commits time | Amount of time spent for commits.
commits write-lock time | Amount of time spent for commits that occurred while a write lock was held. Commits in a write lock indicate a MongoDB node under a heavy write load and call for further diagnosis.

#### Chart: Journal Data
Metric Name | Metric Description
--- | ---
written journal data | Amount of data written to journal during the last journal group commit interval.
written files data | Amount of data written from journal to the data files during the last journal group commit interval.



### Report: MongoDB Storage

#### Chart: Storage
Metric Name | Metric Description
--- | ---
data size | The total size in bytes of the data held in this database including the padding factor.
storage size | The total amount of space in bytes allocated to collections in this database for document storage.
index size | The total size in bytes of all indexes created on this database.
file size | The total size in bytes of the data files that hold the database. This value includes preallocated space and the padding factor.
namespace size | The total size of the namespace files (i.e. that end with .ns) for this database.

#### Chart: Objects
Metric Name | Metric Description
--- | ---
objects count | Count of objects in db
avg. object size | Average object size

#### Chart: Collections
Metric Name | Metric Description
--- | ---
collections count | Count of collections/tables



### Report: MongoDB Memory

#### Chart: Memory
Metric Name | Metric Description
--- | ---
resident mem | The value of resident is roughly equivalent to the amount of RAM, in megabytes (MB), currently used by the database process. In normal use this value tends to grow.
virtual mem | Virtual displays the quantity, in megabytes (MB), of virtual memory used by the mongod process. With journaling enabled, the value of virtual is at least twice the value of mapped. If virtual value is significantly larger than mapped (e.g. 3 or more times), this may indicate a memory leak.
mapped mem | The value of mapped provides the amount of mapped memory, in megabytes (MB), by the database. Because MongoDB uses memory-mapped files, this value is likely to be to be roughly equivalent to the total size of your database or databases.
mapped mem with journal | mappedWithJournal provides the amount of mapped memory, in megabytes (MB), including the memory used for journaling. This value will always be twice the value of mapped. This field is only included if journaling is enabled.



### Report: MongoDB Documents

#### Chart: Documents
Metric Name | Metric Description
--- | ---
inserted | Number of inserted documents.
updated | Number of updated documents.
deleted | Number of deleted documents.
returned | Total number of documents returned by queries.



### Report: MongoDB Operations

#### Chart: Commands
Metric Name | Metric Description
--- | ---
failed | Failed commands / operations (all DB commands/functions)
succeeded | Successful commands / operations (all DB commands/functions)

#### Chart: Replica Operations
Metric Name | Metric Description
--- | ---
insert | Insert operations
query | Query operations
update | Update operations
delete | Delete operations
getmore | Getmore operations
commands | Commands

#### Chart: Operations
Metric Name | Metric Description
--- | ---
insert | Insert operations
query | Query operations
update | Update operations
delete | Delete operations
getmore | Getmore operations
commands | Commands


 

 

