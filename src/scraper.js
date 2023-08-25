import puppeteer from "puppeteer";

export const scraper = async (userZip) => {
  const browser = await puppeteer.launch({
    userDataDir: "./tmp",
    headless: false,
    defaultViewport: false,
    args: ["--incognito"],
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.amazon.com/s?bbn=468642&rh=n%3A468642%2Cp_n_deal_type%3A23566064011&dc&qid=1691454769&rnid=23566063011"
  );

  const popOverBox = await page.$("#nav-global-location-popover-link");
  await popOverBox.click();
  await page.waitForTimeout(2000);
  await page.type("#GLUXZipUpdateInput", "33183"), { delay: 800 };

  const applyZip = await page.$("#GLUXZipUpdate > span > input");
  await page.waitForTimeout(800);
  await applyZip.click();

  await page.waitForTimeout(800);
  const zipDone = await page.$(
    "#a-popover-2 > div > div.a-popover-footer > span > span"
  );

  // await zipDone.click();
  //   let btnDisabled = false;
  //   let itemList = [];

  //   while (!btnDisabled) {
  //     //wait for all pending requests to resolve

  //     await page.waitForSelector("div.s-result-list");
  //     const products = await page.$$("div.s-result-item");
  //     console.log("\n\nfound " + products.length + " products\n\n");

  //     for (const product of products) {
  //       let item = new Object();

  //       try {
  //         item.title = await page.evaluate(
  //           (el) =>
  //             el.querySelector(".s-title-instructions-style > h2 > a > span")
  //               .textContent,
  //           product
  //         );
  //         console.log("Title", item.title);

  //         item.salePrice = await page.evaluate(
  //           (el) => el.querySelector(".a-price > .a-offscreen").textContent,
  //           product
  //         );

  //         item.price = await page.evaluate(
  //           (el) =>
  //             el.querySelector(
  //               "a > div > span.a-price.a-text-price > span.a-offscreen"
  //             ).textContent,
  //           product
  //         );

  //         item.discount = Math.round(
  //           ((parseFloat(item.price.substring(1)) -
  //             parseFloat(item.salePrice.substring(1))) /
  //             parseFloat(item.price.substring(1))) *
  //             100
  //         );

  //         item.productImage = await page.evaluate(
  //           (el) => el.querySelector(".s-image").getAttribute("src"),
  //           product
  //         );

  //         itemList.push(item);
  //       } catch (error) {
  //         //console.log(product);
  //         //console.log(error);
  //       }
  //     }

  //     await page.waitForSelector(
  //       "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator",
  //       { visible: true }
  //     ); // Waits for the button to be visible on the page

  //     const nextButton = await page.$(
  //       "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"
  //     );

  //     if (nextButton) {
  //       const isDisabled = await nextButton.$(
  //         "span.s-pagination-item.s-pagination-next.s-pagination-disabled"
  //       );

  //       if (!isDisabled) {
  //         await nextButton.click();
  //       }

  //       if (isDisabled) {
  //         btnDisabled = true;
  //       }
  //     }

  //     await page.waitForTimeout(1500);
  //   }

  //   itemList = itemList.filter((item) => item.title);
  //   itemList = itemList.filter((item) => item.price);
  //   itemList = itemList.filter((item) => item.discount);
  //   itemList = itemList.filter((item) => item.productImage);

  //   for (let i = 0; i < itemList.length; i++) {
  //     console.log(i + " " + itemList[i].title);
  //     console.log();
  //   }

  //   await browser.close();

  //   return itemList;
  // };
};

scraper();
