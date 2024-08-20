import test, { expect } from "@playwright/test";
import Jimp from "jimp";
import dayjs from "dayjs";
import { join } from "path";

test("フォーム画面への遷移", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /入力フォーム/ }).click();
  await expect(page).toHaveURL("/form");
  await expect(
    page.getByRole("heading", { name: /入力フォーム/ })
  ).toBeVisible();
});

test("フォーム操作のテスト", async ({ page }) => {
  await page.goto("/form");
  await page.getByRole("textbox", { name: /1人目/ }).fill("項羽");
  await page.getByRole("textbox", { name: /2人目/ }).fill("劉邦");
  await page.getByRole("button", { name: /シャッフル/ }).click();
  await expect(page.getByRole("status", { name: /結果/ })).toHaveText(
    /(項羽→劉邦)|(劉邦→項羽)/
  );
});

test("スクリーンショット", async ({ page }, testInfo) => {
  // ページ遷移してスクリーンショットを取得
  await page.goto("/form");
  const buffer = await page.screenshot();

  // 取得したスクリーンショットを画像処理ライブラリで読み込み
  const image = await Jimp.read(buffer);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  // スクリーンショットにテキストを書き込み、別ファイルに保存する
  await image.print(
    font,
    0,
    0,
    {
      alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
      alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
      text: `${dayjs().format("YYYY/MM/DD HH:mm:ss")}`,
    },
    image.getWidth(),
    image.getHeight()
  );
  await image.write(join(testInfo.outputDir, "screenshot_timestamp.png"));
});
