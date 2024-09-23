import { expect } from '@playwright/test';

export default async function testPage(page) {
    await page.goto('https://www.saucedemo.com/');

    // Uses Secret Keys instead of actual credentials
    await page.locator('#user-name').fill('$__username__');
    await page.locator('#password').fill('$__password__');
    await page.locator('data-test=login-button').click();
    await expect(page.locator('body')).toContainText('Products');
    await page.screenshot({ path: 'screenshot.jpg' });
}