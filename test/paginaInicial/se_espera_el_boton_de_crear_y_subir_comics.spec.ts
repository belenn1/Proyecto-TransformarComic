import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Crear" }).click();
  await page.locator("div").nth(3).click();
});
