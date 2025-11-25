import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('button', { name: 'Comedy' })).toBeVisible();
  await page.getByRole('button', { name: 'Comedy' }).click();
  await expect(page.locator('.absolute.inset-0')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mafalda' })).toBeVisible();
  await expect(page.getByText('Quino')).toBeVisible();
});