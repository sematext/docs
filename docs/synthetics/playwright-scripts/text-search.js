import { expect } from '@playwright/test';

export default async function testPage(page) {
    await page.goto('https://sematext.com/');
    await expect(page.getByText('Sematext provides Monitoring & Alerting')).toBeVisible();
    await page.screenshot({ path: 'screenshot.jpg' });
}
