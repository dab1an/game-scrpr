import { error } from "console";
import fs from "fs";
import puppeteer from "puppeteer";

export const scraper = async (userZip) => {
  const browser = await puppeteer.launch({
    userDataDir: "./tmp",
    headless: false,
    defaultViewport: false,
    args: ["--incognito"],
  }); //Loads a headless chromium incognito window, incognito to avoid cache conflicts

  const context = await browser.createIncognitoBrowserContext(); //Setting browser to incognito
  const page = await context.newPage();

  await page.goto(
    "https://www.amazon.com/s?bbn=468642&rh=n%3A468642%2Cp_n_deal_type%3A23566064011&dc&qid=1691454769&rnid=23566063011"
  );

  try {
    await page.waitForSelector("#nav-global-location-popover-link", {
      timeout: 2000,
    });
  } catch (e) {
    await page.reload();
  } //Used for 404 error handling when loading page in incognito

  const popOverBox = await page.$("#nav-global-location-popover-link");
  await popOverBox.click(); //Opening user direction/zip information form
  await page.waitForTimeout(2000); //Timeout to avoid possible captcha
  await page.type("#GLUXZipUpdateInput", userZip), { delay: 600 };

  const applyZip = await page.$("#GLUXZipUpdate > span > input"); //Types provided user zip into form
  await page.waitForTimeout(800);
  await applyZip.click();

  await page.waitForTimeout(800);
  const zipDone = await page.$(
    "#a-popover-2 > div > div.a-popover-footer > span > span"
  );
  await zipDone.click(); //Confirms form information

  await page.waitForTimeout(5000);

  let itemList = [];
  let btnDisabled = false;

  while (!btnDisabled) {
    await page.waitForSelector('[data-cel-widget="search_result_0"]', {
      visible: true,
    }); //Waits for first product to load to ensure all get requests are resolved

    await page.waitForTimeout(800);

    const products = await page.$$(
      "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
    );
    console.log("\n\nfound " + products.length + " products\n\n");

    for (const product of products) {
      let item = new Object();

      try {
        item.title = await page.evaluate(
          (el) =>
            el.querySelector(".s-title-instructions-style > h2 > a > span")
              .textContent,
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

        item.productImage = await page.evaluate(
          (el) => el.querySelector(".s-image").getAttribute("src"),
          product
        );

        item.link =
          "https://www.amazon.com" +
          (await page.evaluate(
            (el) =>
              el
                .querySelector(
                  "div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a"
                )
                .getAttribute("href"),
            product
          ));

        item.discount = Math.round(
          ((parseFloat(item.price.substring(1)) -
            parseFloat(item.salePrice.substring(1))) /
            parseFloat(item.price.substring(1))) *
            100
        );
        console.log(item.discount);

        itemList.push(item);
      } catch (error) {}
    }

    await page.waitForSelector(".s-pagination-item.s-pagination-next", {
      visible: true,
    }); //Waits for next button to be visible on page before clicking

    const isDisabled =
      (await page.$(
        "span.s-pagination-item.s-pagination-next.s-pagination-disabled"
      )) !== null;

    btnDisabled = isDisabled;

    if (btnDisabled === true) {
      await browser.close();
    }

    if (!isDisabled) {
      await Promise.all([
        page.click(
          "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"
        ),
        page.waitForNavigation({ waitUntil: "networkidle2" }), //Awaits for the page navigation to allow products to load
      ]);
    }
  }

  //Filtering out unwanted items with null values
  itemList = itemList.filter((item) => item.title);
  itemList = itemList.filter((item) => item.price);
  itemList = itemList.filter((item) => item.discount);
  itemList = itemList.filter((item) => item.productImage);
  itemList = itemList.filter((item) => item.link);

  for (let i; i < itemList.length; i++) {
    fs.appendFile(
      "productInfo.csv",
      `${itemList[i].title.replace(/,/g, "/")}, ${itemList[i].price}, ${
        itemList[i].discount
      } \n`,
      function (error) {
        if (error) throw error;
      }
    );
  }

  await browser.close();

  return itemList;
};
