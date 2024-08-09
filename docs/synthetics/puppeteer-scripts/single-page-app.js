async function testPage(page) {
    // Set the screen resolution, as things render differently on different screen widths
    await page.setViewport({
        width: 1200,
        height: 800,
    });

    await page.goto('https://www.airbnb.com/');
    const SEARCH_INPUT_SELECTOR = 'input[id="bigsearch-query-location-input"]';
    await page.waitForSelector(SEARCH_INPUT_SELECTOR);
    await page.screenshot({ path: '1_home.png' });
    await page.type(SEARCH_INPUT_SELECTOR, 'Reykjavik');
    const SEARCH_BUTTON_SELECTOR = 'button[data-testid="structured-search-input-search-button"]';
    await page.waitForSelector(SEARCH_BUTTON_SELECTOR);
    await page.click(SEARCH_BUTTON_SELECTOR);

    // Look for some elements on a page and wait for a second, to load the page before taking a screenshot
    const CARD_CONTAINER_SELECTOR = '[data-testid="card-container"]';
    await page.waitForSelector(CARD_CONTAINER_SELECTOR);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '2_search.png' });
}

module.exports = testPage