title: Using GenAI to write Playwright scripts
description: A short guide on how you can write Playwright scripts using GenAI tools such as ChatGPT or Claude

Generative AI tools such as ChatGPT and Claude are getting better and better at writing code, including Playwright scripts. They can help you generate a general outline for your script which you may have to fix up a little depending on how descriptive you are with the requirements and how complex your flow is. If the flow you're looking to implement is very simple, then these AI models might even generate a working script outright.

>We wrote a guide that shows how to do it step by step using Chrome and ChatGPT: [How to Create Playwright Scripts for Website Monitoring with Chrome, ChatGPT](https://sematext.com/blog/how-to-create-playwright-scripts-for-website-monitoring-with-chrome-chatgpt-sematext/)

## Prompting generative AI to create Playwright scripts

Take a look at the following example that uses ChatGPT.

![ChatGPT Playwright Example](/docs/images/synthetics/chatgpt-playwright-example.png)

The first paragraph of the prompt is what we actually want the script to do - i.e. the User Journey which you're trying to emulate - while the second part is there just to let the AI know about the format used by Sematext Cloud Synthetics Monitors, making it easy for us to copy-paste the generated script right into Sematext Cloud.

Here's that second part so that you can easily use it in your own prompts:
```
Assume the `browser` and `page` objects are already created and are passed to a function with this prototype: `export default async function testPage(page)`, so only write the actual steps I asked about in that function and don't perform any setup or teardown steps.
```

In this case, we managed to get a fully working script right off the bat.

![ChatGPT Playwright Result](/docs/images/synthetics/chatgpt-playwright-result.png)

This script could definitely be improved upon, but it's a good start that you can work on and refine. Keep in mind that you also might have to look into your page a bit to find the exact selectors you want (especially if you're using a page that isn't public), but this shouldn't take long and it should be easy to iterate over the initial output you get from the AI.



## Using speech to text to create Playwright scripts

❗❗ If you find it convenient, you can also generate your prompts through speech to text, ***but** keep in mind that the AI will need a sufficient amount of details in the prompt for it to be able to generate a working script*. Describing the format used in Sematext Cloud's Synthetics monitors might also be challenging over voice, so you may have to manually edit some parts of the generated script if speech to text doesn't quite get it right.
