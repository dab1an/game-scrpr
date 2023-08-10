import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./tmp",
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.amazon.com/s?bbn=468642&rh=n:468642,p_n_deal_type:23566064011&dc&qid=1691454769&rnid=23566063011"
  );

  const products = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  for (const product of products) {
    let title = null;
    let price = null;
    let salePrice = null;
    let proudctImage = null;

    try {
      const title = await page.evaluate(
        (el) => el.querySelector("h2 > a > span").textContent,
        product
      );
    } catch (error) {}

    try {
      const price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent,
        product
      );
    } catch (error) {}

    try {
      const salePrice = await page.evaluate(
        (el) =>
          el.querySelector(
            "a > div > span.a-price.a-text-price > span.a-offscreen"
          ).textContent,
        product
      );
    } catch (error) {}

    try {
      const proudctImage = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        product
      );
    } catch (error) {}

    console.log(salePrice);
    console.log();
  }
})();
