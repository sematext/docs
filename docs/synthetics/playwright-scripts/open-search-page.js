import { expect } from '@playwright/test';

export default async function testPage(page) {
    await page.goto('https://github.com');

    // Click on search button
    await page.getByLabel('Search or jump to').click();
  
    // Fill in search input
    await page.getByRole('combobox').fill('playwright');
  
    // Press Enter
    await page.getByRole('combobox').press('Enter');
  
    // Confirm search results
    await expect(page.getByRole('link', { name: 'playwright' }).first()).toBeVisible();
  
    await page.screenshot({ path: 'screenshot.png' });
}
