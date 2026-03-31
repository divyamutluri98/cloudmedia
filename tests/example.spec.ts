import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Cloud Media News/);
});

test('check footer credits', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const credit = page.getByText('www.guideitsol.com');
  await expect(credit).toBeVisible();
});
