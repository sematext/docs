title: Creative Use Cases
description: Ideas for using Sematext Synthetics for things other than performance and uptime monitoring

Sematext Synthetics is great for monitoring website performance, measuring website uptimes, testing API performance and responses, getting notified if any of your SSL certificates are either invalid or expiring in the near future, but you can use it for so much more!

If you start thinking of Sematext Synthetic as your little cronjob executioner in the cloud you’ll start seeing new interesting and valuable uses for it.  Here are some interesting use cases.

## Extraction of Numerical Data from a Web Page

If there is any web page with any sort of numerical data that you would like to extract periodically so that you can chart it and see its trend over time, 
or alert when it goes over or below some threshold, you can use Sematext Synthetics to do that for you.  The web page doesn’t have to be yours.  
Here are some examples of such data:
* Product ratings on review sites - if you want to track how your or somebody else’s rating changes over time.
* A price of a product - if you want to be alerted when the price goes up or down and get alerted about it, or simply to see how it’s changed over time.
* Competitor pricing - if you want to track when your competitors change their pricing
* Weather data like temperature, rainfall, etc.
* Mortgage rates, currency exchange rates, numeric of matches for a search, etc.
* ...

Have a look at [Browser Monitor Custom Metrics](https://sematext.com/docs/synthetics/metrics/#browser-monitors) docs, or the 
[How to Track Your Company’s Rating on a Website](https://sematext.com/blog/how-to-track-your-companys-rating-on-a-website/) article.

## Extraction of Numerical Data from an API

If you have your own APIs you can not only monitor their availability and performance, but also their responses.  More specifically, in addition to simply 
checking the contents of their response in order to determine if the APIs returned a desired response, you can extract any numerical data from their responses.  
Such numerical data can be charted in Sematext Synthetics and you can create alerts on it.  If you have such APIs, but they are behind your firewall, simply 
use Private Location functionality.  Of course, you can use this with any public APIs whose responses you want to parse, chart, or alert on.  
You can use an HTTP Monitor and Custom Metrics for that.

There’s more on how to do that in [How to Extract Numerical Values from API Responses](https://sematext.com/blog/how-to-extract-numerical-values-from-api-responses/)
where we use the example of getting the currency exchange rate from a public API.


## Extraction of Performance Data from a Browser API

Web browsers expose a lot of APIs. A number of them return performance information about the page the browser has opened.  
With the help of User Journey Scripts you can extract numeric responses from any browser API and plot it, whether it’s about performance or anything else.

See [How to Periodically Extract Webpage Performance Metrics from Browser API](https://sematext.com/blog/how-to-periodically-extract-webpage-performance-metrics-from-browser-api/) to learn how to do that.

## Track Your Position in a List on a Web Page

Do you want to track your position on any sort of list?  For example, maybe something you care about is listed in some Top N list. 
Maybe your want to track your product’s placement in one or more categories on a review site.  
Or maybe you just want to track your position in Google’s search results.  Or your competitors’ positions.  You can do that with [User Journey Scripts](https://sematext.com/docs/synthetics/user-journey-scripts/).  
Have a look at [examples](https://sematext.com/docs/synthetics/user-journey-scripts/#user-journey-script-examples) to get started.

## Competitor’s Website or API Performance

While most of the time we use synthetic monitoring for keeping an eye on your own performance, you can also use it to watch your competitor’s performance and uptime.
You can watch their website, specific web pages, APIs, etc.  A little like “keep your friends close, but your enemies closer”.
