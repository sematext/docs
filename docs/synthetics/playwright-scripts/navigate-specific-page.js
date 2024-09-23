import { expect } from '@playwright/test';

export default async function testPage(page) {
  
  // Visit the home page
  await page.goto('https://www.apple.com/');

  // Click on the Mac link
  await page.getByLabel('Mac', { exact: true }).click();
  await page.waitForURL('https://www.apple.com/mac/');

  // Get the h1 element text and verify it is 'Mac'
  const h1 = await page.locator('h1').textContent();
  expect(h1).toBe('Mac')
}