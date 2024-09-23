import { expect } from '@playwright/test';

export default async function testPage(page) {
    await page.goto('https://duckduckgo.com/');
    await page.getByLabel('Search with DuckDuckGo').fill('google');
    await page.getByLabel('Search', { exact: true }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('a[href="https://www.google.com/"]').first()).toBeAttached();
}
