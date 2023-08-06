import "./index.css";

import puppeteer from "puppeteer";

async function start() {
  const browser = await puppeteer.launch({
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.amazon.com/s?bbn=468642&rh=n%3A468642%2Cp_n_deal_type%3A23566064011&dc&qid=1691292089&rnid=23566063011&ref=lp_11846801_nr_p_n_deal_type_1https://www.amazon.com/s?bbn=468642&rh=n%3A468642%2Cp_n_deal_type%3A23566064011&dc&qid=1691292089&rnid=23566063011&ref=lp_11846801_nr_p_n_deal_type_1"
  );

  const productNames = await page.$$(
    ".s-main-slot .s-result-list .s-search-results .sg-row"
  );

  for (const productName of productNames) {
    const title = await page.evaluate(
      (el) => el.querySelector("a-text-normal").textContent,
      productName
    );
    console.log(title);
  }
}

start();
