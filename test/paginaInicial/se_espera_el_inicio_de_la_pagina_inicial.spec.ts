import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('button', { name: 'El Eternauta El Eternauta' })).toBeVisible();
  await expect(page.locator('#comics-carousel')).toContainText('El Eternauta');
});