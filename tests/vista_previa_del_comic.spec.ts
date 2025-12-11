import { test, expect } from '@playwright/test';

test('vista previa', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Panel de Creador' }).click();
  await page.getByRole('button', { name: 'Nuevo Cómic' }).click();
  await page.getByText('Arrastra tu PDF aquí o haz clicSoporta archivos de cualquier tamaño').click();
  await page.locator('input').setInputFiles('./assets/El Eternauta.pdf');
  await expect(page.locator('body')).toContainText('El Eternauta.pdf');
  await expect(page.getByText('El Eternauta.pdf')).toBeVisible();
  await page.getByRole('combobox').selectOption('Sci-Fi');
  await page.getByRole('button', { name: 'Ver Vista Previa' }).click();
  await expect(page.locator('body')).toContainText('El Eternauta');
  await expect(page.getByRole('paragraph').filter({ hasText: /^El Eternauta$/ })).toBeVisible();
});