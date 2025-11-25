import { test, expect } from '@playwright/test';

test('al ver las portadas tiene que aparecer los datos de los comics', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('div:nth-child(3) > .relative > .absolute').click();
  await page.getByRole('heading', { name: 'Akira' }).click();
  await page.getByText('Katsuhiro Otomo').click();
  await page.getByText('1.9k2.1k').click();
});