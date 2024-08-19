import { test as setup, expect } from "@playwright/test";

const authFile = ".auth/user.json";

setup.skip("authenticate", async ({ page }) => {
  await page.goto("http://localhost:8888");
  await page
    .getByPlaceholder(/Email Address \/ Username/)
    .fill("admin@example.com");
  await page.getByPlaceholder(/Password/).fill("very-strong-password");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("http://localhost:8888/browser/");
  await expect(page.getByText(/Object Exproler/)).toBeVisible();
  await page.context().storageState({ path: authFile });
});
