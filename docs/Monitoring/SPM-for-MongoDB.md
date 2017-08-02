<iframe width="400" height="300" src="https://www.youtube.com/embed/BIERrXzbiNM" frameborder="0" allowfullscreen ></iframe>

## Overview

The client for "SPM for MongoDB" is an open-source [mongodb monitoring
agent](https://github.com/sematext/spm-agent-mongodb) that collects
MongoDB metrics and sends them to SPM. It is available
as[ npm](https://www.npmjs.com/package/spm-agent-mongodb)[ package](https://www.npmjs.com/package/spm-agent-mongodb) (see
Installation & Configuration section below).

In addition to collecting MongoDB metrics, you can send [Custom Metrics](Custom-Metrics), such as the number of concurrent
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

 

 

 

