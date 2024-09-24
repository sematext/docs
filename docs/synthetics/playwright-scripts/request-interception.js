// Block requests to certain URLs
const blockList = [
    'google-analytics',
    'googleadservices.com',
    'googlesyndication',
];

// This script uses Playwright to block requests to certain URLs and take a screenshot of the page
export default async function testPage(page) {
    await page.route('**/*', (route) => {
        if (blockList.some(resource => route.request().url().includes(resource))) {
            // Remove this log statement once you verify that the requests are being blocked
            console.log("Blocked:", route.request().url());
            route.abort();
        }
        else route.continue();
    });
    await page.goto('https://sematext.com/');
    await page.screenshot({ path: 'screenshot.jpg' });
}
