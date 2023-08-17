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

  let itemList = [];
  let j = 0;

  for (const product of products) {
    let item = new Object();

    try {
      item.title = await page.evaluate(
        (el) => el.querySelector("h2 > a > span").textContent,
        product
      );

      item.salePrice = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent,
        product
      );

      item.price = await page.evaluate(
        (el) =>
          el.querySelector(
            "a > div > span.a-price.a-text-price > span.a-offscreen"
          ).textContent,
        product
      );

      const proudctImage = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        product
      );
    } catch (error) {}

    itemList.push(item);
    j++;
  }

  itemList = itemList.filter((item) => item.title);

  for (let i = 0; i < itemList.length; i++) {
    console.log(i + " " + itemList[i].title);
    console.log();
  }
})();
