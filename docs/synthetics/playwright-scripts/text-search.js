import { expect } from '@playwright/test';

export default async function testPage(page) {
  await page.goto('https://sematext.com/');
  await expect(page.getByText('End-to-end visibility')).toBeVisible();
  await page.screenshot({ path: 'screenshot.jpg' });
}
