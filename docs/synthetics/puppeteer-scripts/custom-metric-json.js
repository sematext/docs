// This script gets the exchange rates of various currencies and defines the results as custom metrics
async function testPage(page, context) {
    const response = await page.goto("https://api.frankfurter.app/latest?from=EUR");
    bodyJSON = await response.json();

    // Extract the values from the response JSON and define them as custom metrics
    const USD = bodyJSON.rates.USD;
    const AUD = bodyJSON.rates.AUD;
    const CNY = bodyJSON.rates.CNY;
    // Metric names should be alphanumeric, otherwise they will be ignored
    context.setMetric('currency.EUR_USD', USD);
    context.setMetric('currency.EUR_AUD', AUD);
    context.setMetric('currency.EUR_CNY', CNY);

    // Log out the values at the start to make sure you're getting the metrics
    console.log(USD);
    console.log(AUD);
    console.log(CNY);
}

module.exports = testPage;