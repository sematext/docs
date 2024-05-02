async function testPage(page) {
    // Set the screen resolution, as things render differently on different screen widths
    await page.setViewport({
        width: 1200,
        height: 800,
    })

    // Go to the URL which switches into the demo account and wait for domcontentloaded
    await page.goto('https://apps.sematext.com/demo', { waitUntil: 'domcontentloaded' });

    const SYNTHETICS_APP_SELECTOR = 'a[href="/ui/synthetics/monitors"]';
    await page.waitForSelector(SYNTHETICS_APP_SELECTOR);
    await page.click(SYNTHETICS_APP_SELECTOR);

    // Wait for the locations map to show up, then take a screenshot
    await page.waitForSelector('[id="locationsMap"]');
    await page.screenshot({ path: 'synthetics.png' });

    // Ensure the sidebar element for navigating to the Infra page exists, then click it
    const INFRA_APP_SELECTOR = 'a[href="/ui/infrastructure"]';
    await page.waitForSelector(INFRA_APP_SELECTOR);
    await page.click(INFRA_APP_SELECTOR);
    await page.screenshot({ path: '3_synthetics.png' });
}

module.exports = testPage