import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./tmp",
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.amazon.com/s?k=computer+servers&i=computers&rh=n%3A541966%2Cp_101%3A19346686011%2Cp_72%3A1248879011%2Cp_36%3A1253507011&dc&crid=2IGL1IWUMRYBX&qid=1692316305&rnid=386442011&sprefix=servers%2Ccomputers%2C128&ref=sr_pg_1"
  );

  const products = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  let itemList = [];
  let j = 0;

  for (const product of products) {
    let item = new Object();
    let btnDisabled = false;

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

    await page.waitForSelector(
      "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator",
      { visible: true }
    ); //waits for button to be visible on page

    const isDisabled =
      (await page.$(
        "span.s-pagination-item.s-pagination-next.s-pagination-disabled"
      )) !== null;
    btnDisabled = isDisabled;

    if (!btnDisabled) {
      await page.click(
        "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"
      );
    }
  }

  itemList = itemList.filter((item) => item.title);

  for (let i = 0; i < itemList.length; i++) {
    console.log(i + " " + itemList[i].title);
    console.log();
  }
})();
