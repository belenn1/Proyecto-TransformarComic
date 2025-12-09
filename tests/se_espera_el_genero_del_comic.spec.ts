import { test, expect } from '@playwright/test';

test('Genero Asignado', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('button', { name: 'Fantasia' })).toBeVisible();
  await page.getByRole('button', { name: 'Fantasia' }).click();
  await expect(page.locator('div:nth-child(2) > .relative > .absolute')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sandman' })).toBeVisible();
  await expect(page.getByText('Neil Gaiman')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Comedia' })).toBeVisible();
  await page.getByRole('button', { name: 'Comedia' }).click();
  await page.getByRole('button', { name: 'Drama' }).click();
  await expect(page.locator('.absolute.inset-0').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Persépolis' })).toBeVisible();
  await expect(page.getByText('Marjane Satrapi')).toBeVisible();
});