import test from "@playwright/test";

test.describe("スクリーンショットのサンプル", () => {
  test.skip("オプション指定なし", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.screenshot({ path: "screenshot.png" });
  });

  test.skip("ページ全体", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.screenshot({ path: "screenshot_full.png", fullPage: true });
  });

  test.skip("要素を指定", async ({ page }) => {
    await page.goto("https://playwright.dev");
    const element = page.getByRole("heading", {
      name: "Playwright enables reliable",
    });
    await element.screenshot({ path: "screenshot-element.png" });
  });
});
