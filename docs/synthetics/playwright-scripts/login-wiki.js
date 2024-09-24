import { expect } from '@playwright/test';

export default async function testPage(page) {
    // Navigate to wikipedia
    await page.goto('https://en.wikipedia.org/');
    await page.locator('#pt-login-2').click();
    const userName = 'Sematext-wiki';
    // Fill in the username and password then login
    await page.locator('#wpName1').fill(userName);
    await page.locator('#wpPassword1').fill('semapassword');
    await page.locator('#wpLoginAttempt').click();
    // Click on the user page
    await page.locator('#pt-userpage-2').click();
    const userNameFromPage = await page.locator('#firstHeading').textContent();
    // Match username against the one used to login
    expect(userNameFromPage.split(',')[1].toLowerCase()).toContain(userName.toLowerCase());
}
