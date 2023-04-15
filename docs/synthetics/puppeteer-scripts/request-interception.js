// Block requests to certain URLs
const blockList = [
    'google-analytics',
    'googleadservices.com',
    'googlesyndication',
];

async function testPage(page) {
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (blockList.some(resource => request.url().includes(resource))) {
            // Remove this log statement once you verify that the requests are being blocked
            console.log("Blocked:", request.url());
            request.abort();
        }
        else request.continue();
    });
    await page.goto('https://sematext.com/');
    await page.screenshot({ path: 'screenshot.jpg' });
}

module.exports = testPage;