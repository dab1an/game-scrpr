import cors from "cors";
import express from "express";
import { scraper } from "./scraper.js";

const app = express();
app.use(express.json());

app.use(cors());
app.get("/zip", async function (req, res) {
  const zip = req.query.paramZip;
  const searchTerm = req.query.searchTerm;
  console.log(zip);
  console.log(searchTerm);
  let data = await scraper(zip, searchTerm);
  res.json({ scraperData: data });
  // res.json(data);
});

app.listen(8001, () => {
  console.log(`Example app listening on port ${8001}`);
});
