title: Browser SDK
description: Ship browser metrics to Sematext Experience.

Sematext [Browser SDK](https://github.com/sematext/browser-sdk) is an open-source framework used to ship web application metrics related to user interaction. Using [Browser SDK](https://github.com/sematext/browser-sdk) allows gathering metrics related to:
 
 - Hard page loads for traditional web applications as well as the single-page applications
 - Soft page loads generated via the `routeChange` command for the single-page applications
 - HTTP requests
 - [Web application resources, such as images, CSS files, etc.](/experience/resources/)
 - [Web vitals](/experience/webvitals/)
 - [Element timing](/experience/element-timing/)
 - [Long tasks](/experience/longtasks/)
 - [User sessions](/experience/user-identification/)
 - [On-page transactions](/experience/on-page-transaction/)

![Sematext Experience Overview](../images/experience/overview.png)

## Development

The RUM script is developed using [ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript) and uses a few tools to help with the build and working with the code. Those tools include:
 
 - `npm` - [Node package manager](https://npm.org)
 - `yarn` - [Package dependency manager](https://yarnpkg.com)
 - `flow` - [Static type checker](https://flow.org)
 - `Cypress.io` - [Integration tests framework](https://www.cypress.io)

### The Architecture of the RUM Script

There are two parts of the RUM script: 

 - The loader script,
 - The metrics gathering script itself.

The loader script is responsible for loading the main, metrics gathering script itself and adds the actual `<script>` tags with the content on the main metric script. 

The loader script will keep track and buffer any of the commands that need to be sent after the main metrics gathering script will be loaded and configured. When the main RUM script finally loads it will read any pending
commands will be executed.

### Working on the Loader Script

The main entry point of the loader script is located in `src/snippet.js`. This is the unminified [ES2015]((https://en.wikipedia.org/wiki/ECMAScript)) version of the loader script which is responsible for loading the main RUM script. 

To generate the minified snippet of the loader script use `yarn run generate-snippet`.

### Working on the Main RUM Script

The main entry point of the RUM script is located in `src/index.js`. Use `eslint` to catch any style issues and
`flow` to catch any type errors.

You can use the following commands:

 - `yarn run start` to start the development server
 - `yarn run lint` to run `lint` on the code
 - `yarn run flow` to run `flow` type checks
 - `yarn run build` to build the production bundle
 - `yarn run dev` to build the development (not minified) bundle

### Supported Commands

The following commands are currently supported by the RUM script:

 - `config` - Command used to configure the RUM script. It requires the `token` and `receiverUrl` configuration parameters. You can also provide the `ignoreBotData` Boolean parameter to ignore metrics coming from bots.   
 - `identify` - Command used to identify the user. Requires the `name` and the `identifier` keys to be present, which are used to identify a user.  
 - `routeChange` - Command used to inform the RUM script that a route change happened. It accepts a single parameter that should take the value of the new route. 
 - `startTransaction` - Command used to inform the RUM script that a transaction starts. It accepts a single parameter that should take the value of the transaction name.
 - `endTransaction` - Command used to inform the RUM script that a transaction ends. It accepts a single parameter that should take the value of the name of the transaction that we want to end.
 - `pageLoad` - Command used to provide metrics related to page load.
 - `ajax` - Command used to provide metrics related to HTTP requests.
 - `longTask` - Command used to provide metrics about [long tasks](/experience/longtasks/).
 - `elementTiming` - Command used to provide metrics about [element timing](/experience/element-timing/).
 - `vital-metric` - Command used to provide metrics about [web vitals](/experience/webvitals/).

### Global Variables

The RUM script uses global constants defined in the `constants.js` file. The file contains the following constants:

 - `GLOBAL_KEY` - The global key under which the script is available.
 - `DEBUG_PARAM_KEY` - When set to `true` turns on the debug level logging. 
 - `SESSION_COOKIE` - Name of the cookie related to a user session. 
 - `USER_COOKIE` - Name of the cookie related to the user.
 - `SESSION_KEEP_ALIVE_MINUTES` - The maximum time for the session to be kept alive.
 - `PAGELOAD_HARD_TIMEOUT` - Timeout after which the events are no longer considered to be part of the hard page load.
 - `PAGELOAD_SOFT_TIMEOUT` - Timeout after which the events are no longer considered to be part of the soft page load.
 - `BOT_USER_AGENT` - Regex used for bots identification.

## Installation

Installation of the RUM script contains the following steps:

### Adding the Loader Script

To add the loader script responsible for loading the main RUM script you need to add the RUM loader snippet generated via the `yarn generate-snippet` command to the header of the page before the closing `</head>` tag:

```
<script type="text/javascript">
  ...
  INSERT SCRIPT SNIPPET HERE
  ...
  (window,document,"script","/rum.js","strum");
</script>
```

The `/rum.js` should be pointing to the location of the built RUM script and the `strum` is the key under which the script will be available.

### Configuring the RUM Script

To configure the script the `config` command needs to be sent providing the URL of the receiver which accepts the data and the token, which identifies the Sematext Experience application. For example:

```
strum('config', { token: '8763d12d-1j3t-932v-b498-544290z98k43', receiverUrl: 'https://rum-receiver.sematext.com' });
```

### Integrating the RUM Script

For some web technologies, especially when it comes to single-page applications additional integration may be needed. Have a look at the [Sematext Experience Integrations](/experience/integrations/) page to learn more.

## Contributing

Pull requests for bug fixes, improvements and new features for the [Browser SDK](https://github.com/sematext/browser-sdk) are more than welcome. You can open a pull request on the [project Github page](https://github.com/sematext/browser-sdk). When opening a new pull request please take the time to briefly describe the changes. Make sure that the newly introduced code passes the `lint` and `flow` checks along with the integration tests. Once the PR is submitted Sematext will review and merge your changes.

## Learn More

Learn more about [Sematext Experience](/experience/). 