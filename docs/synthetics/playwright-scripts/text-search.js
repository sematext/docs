export default async function testPage(page) {
    await page.goto('https://sematext.com/');
    await page.getByText('Sematext provides Monitoring & Alerting').isVisible();
    await page.screenshot({ path: 'screenshot.jpg' });
}
