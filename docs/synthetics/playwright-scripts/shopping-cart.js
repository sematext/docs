import { expect } from '@playwright/test';

export default async function testPage(page) {
  await page.goto('https://www.saucedemo.com/');

  // Set the screen resolution, as things render differently on different screen widths
  await page.setViewportSize({
    width: 1200,
    height: 800,
  });

  // Login
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('data-test=login-button').click();
  
  // Go to item and add to cart
  await page.getByText('Sauce Labs Backpack').click();
  await page.getByText('ADD TO CART').click();

  // Go to cart
  await page.locator('data-test=shopping-cart-link').click();
  await page.getByText('Checkout').click();

  // Fill out form
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#postal-code').fill('12345');
  await page.getByText('Continue').click();

  // Confirm page has the expected content
  await expect(page.locator('data-test=inventory-item')).toContainText('Sauce Labs Backpack');
  await page.getByText('Finish').click();

  // Confirm order
  await expect(page.locator('body')).toContainText('Thank you for your order!');

  await page.screenshot({ path: 'shoppingCart.jpg' });
}
