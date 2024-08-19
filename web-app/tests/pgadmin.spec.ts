import test, { expect } from "@playwright/test";

test.skip("open About dialog", async ({page}) => {
  await page.goto("http://localhost:8888/browser/");

  await page.getByRole("button", {name: /Help/}).click();
  await page.getByText(/About pgAdmin 4/).click();

  await expect(page.getByText(/Application Mode/)).toBeVisible();
})
