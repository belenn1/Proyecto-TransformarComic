import { test, expect } from '@playwright/test';

test('Filtrado por genero', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: 'Mafalda' })).toBeVisible();
  await page.getByRole('button', { name: 'Sci-Fi' }).click();
  await expect(page.getByRole('heading', { name: 'Mafalda' })).not.toBeVisible();

});