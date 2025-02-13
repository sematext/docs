# Playwright local testing environment

This project is used to help you quickly set up a Playwright testing environment on your machine. Follow the installation instructions to set things up initially, and then follow the section below the installation instructions to get started on writing and testing scripts.


## Installation instructions

1. Install [NodeJS v18.17.0 or above](https://nodejs.org/en/download/package-manager)
2. Verify that NodeJS has been installed by running `node -v`
3. Download these two files: [package.json](https://github.com/sematext/docs/blob/master/docs/synthetics/playwright-template/package.json) and [template.js](https://github.com/sematext/docs/blob/master/docs/synthetics/playwright-template/template.js) and create a directory for them
4. Navigate to where you moved these files in your terminal
5. Run `npm i` to install the required dependencies
6. Run `npx playwright install` to install the browsers which Playwright will run
7. Run `node _template.js` to run the template script and confirm that everything is working fine. A screenshot of the page called `screenshot.png` should be saved to this directory.



## Writing and running scripts

1. Make a copy of `_template.js` and rename the copy to whatever you like (for example `loginPage.js`)
2. Write your script by modifying the contents of the `testPage` function
3. Test the script by running `node SCRIPT_FILE_NAME.js` (in this example it'd be `node loginPage.js`) and watch how it works in the Chromium window that opens
4. Make changes as needed and test again
5. When you feel that the script is working fine, copy over everything under the `UJS CODE` comment (the `testPage` function and any imports or helper functions you might have added) over to your Browser monitor in Sematext Cloud



## Guides and tips

For some examples on how to write your scripts with Playwright, check out the following resources:
- [The official Playwright documentation](https://playwright.dev/docs/intro)
- [How to convert Puppeteer scripts into their Playwright equivalents](https://playwright.dev/docs/puppeteer)
- [Examples of some common use cases](https://github.com/mxschmitt/awesome-playwright?tab=readme-ov-file#showcases)
- [Examples seen in Sematext Cloud](https://sematext.com/docs/synthetics/user-journey-scripts/examples/)
- [Our 'Tips & Tricks' page](https://github.com/sematext/docs/blob/master/docs/synthetics/playwright-template/README.md)
