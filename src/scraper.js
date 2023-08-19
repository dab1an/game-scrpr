import puppeteer from "puppeteer";

export const scraper = async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./tmp",
    defaultViewport: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.amazon.com/s?bbn=468642&rh=n%3A468642%2Cp_n_deal_type%3A23566064011&dc&qid=1691454769&rnid=23566063011"
  );

  const products = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  let itemList = [];
  let j = 0;

  for (const product of products) {
    let item = new Object();
    // let btnDisabled = false;

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

      item.discount = Math.round(
        ((parseFloat(item.price.substring(1)) -
          parseFloat(item.salePrice.substring(1))) /
          parseFloat(item.price.substring(1))) *
          100
      );

      item.productImage = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        product
      );
    } catch (error) {
      console.log(error);
    }

    itemList.push(item);
    j++;

    // await page.waitForSelector(
    //   "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator",
    //   { visible: true }
    // ); //waits for button to be visible on page

    // const isDisabled =
    //   (await page.$(
    //     "span.s-pagination-item.s-pagination-next.s-pagination-disabled"
    //   )) !== null;

    // btnDisabled = isDisabled;

    // if (!btnDisabled) {
    //   await page.click(
    //     "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"
    //   );
    // }
  }

  itemList = itemList.filter((item) => item.title);
  itemList = itemList.filter((item) => item.price);
  itemList = itemList.filter((item) => item.discount);

  for (let i = 0; i < itemList.length; i++) {
    console.log(i + " " + itemList[i].price);
    console.log();
  }

  await browser.close();

  return itemList;
};

// scraper();
