async function testPage(page, context) {
    // Create a Chrome DevTools Protocol (CDP) session and start measuring performance metrics
    const client = await page.target().createCDPSession();
    await client.send('Performance.enable');
    await page.goto('https://youtube.com/');

    // Fetch all the performance metrics and choose the ones we want
    const performanceMetrics = await client.send('Performance.getMetrics');
    const scriptDuration = performanceMetrics.metrics.find((x) => x.name === 'ScriptDuration').value;
    const usedHeap = performanceMetrics.metrics.find((x) => x.name === 'JSHeapUsedSize').value;

    // Define the chosen metrics as custom metrics in Sematext Synthetics
    // Metric names should be unique for this Synthetics application
    // Metric names should be alphanumeric, otherwise they will be ignored
    context.setMetric('heap.size', usedHeap);
    context.setMetric('script.time', scriptDuration);

    // Log out the values at the start to make sure you're getting the metrics
    console.log(usedHeap);
    console.log(scriptDuration);
}

module.exports = testPage;