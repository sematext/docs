title: Tips & Tricks
description: Tips and Tricks for writing Playwright scripts

Even though it might seem daunting at first to dive right in and start writing your own Playwright scripts, it's actually fairly simple for the vast majority of use-cases. This page will show you some tips and tricks on how to write Playwright scripts as painlessly as possible, especially if you aren't familiar with Javascript or Playwright.



## Make use of the various examples we provide

If you haven't already, then check out our [various examples](examples.md) on tackling various use-cases with Playwright, such as:
* Logging in
* Searching for text on a page
* Adding an item to a shopping cart
* Intercepting and modifying requests

and many more! By emulating what we do in those examples, you should be able to implement most of the flows you want. If your use-case isn't covered in those examples or if you can't quite get your script to work the way it's supposed to, then read on.



## Using generative AI to help you create your script

You can also use GenAI to write Playwright scripts. Check out [the dedicated page for this topic](./generating-playwright-scripts.md) to learn more.



## Running your scripts locally for easier troubleshooting

It's always neat to be able to run your scripts locally, since it'll allow you to see how the automated Chrome browser behaves as Playwright executes each action in your script. This can help you see which parts of the page load slowly and add the appropriate logic to remedy that, or catch some things that might never even pop up when you access the page through your regular browser (cookie warnings, various one-time banners which you've dismissed long ago, bot protection etc.).

A step-by-step guide on how to set up this local environment, along with all the files you'll need, can be found [here](https://github.com/sematext/docs/blob/master/docs/synthetics/playwright-template/README.md).



## Consult the official Playwright docs

Playwright is constantly updated and improved, and it features many useful functions out of the box. It's possible that there might be a function for exactly the use-case you need listed in [the official docs](https://playwright.dev/docs/api/class-locator), so make sure to check those out if you want to improve the robustness and reduce the complexity of your scripts.



## Using the official Playwright test generator

Playwright also offers their excellent Test Generator tool that opens up a browser for you and records the actions you take, converting each action into Playwright code. As you browse the page, Playwright will try to automatically deduce the best selectors for each element you interact with, thus (usually) avoiding the hassle of having to find them yourself.

Here's a demo on how it works.
<div class="video_container">
<iframe src="https://www.youtube.com/watch?v=5XIZPqKkdBA" 
frameborder="0" allow="autoplay; encrypted-media" 
allowfullscreen class="video"></iframe>
</div>

You can use the Playwright Test Generator with or without Visual Studio Code.
* If you want to use it with [Visual Studio Code](https://code.visualstudio.com/download), you can follow [this guide](https://playwright.dev/docs/codegen) to set everything up and start recording scripts.
* If you'd like to run it without Visual Studio Code, you first have to [download and install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your computer, after which you can follow [this guide](https://playwright.dev/docs/codegen#generate-tests-with-the-playwright-inspector) to get started

Once you've recorded a script and ensured it works the way you'd like, copy everything from the generated `test` function over to the `testPage` function we use in Sematext Cloud and try the monitor out. For simple actions these scripts can work out of the box, but there are cases where the script recorder doesn't have the full context needed to get everything running smoothly (such as dynamic elements that only appear when you hover over others, or geolocation-dependent elements). If there are certain issues, you can see where the script gets stuck when you run it locally, then you can make the necessary modifications to get everything up and running again.



## When in doubt - reach out!

If you run into further trouble, remember that you can always contact our support email (support@sematext.com) with questions regarding what to do with your Playwright scripts if they aren't running properly on Sematext Cloud.
