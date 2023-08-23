import express from "express";
import { scraper } from "../scraper.js";
import cors from "cors";

const app = express();

app.use(cors());
app.get("/zip", async function (req, res) {
  // let data = await scraper();
  console.log("hi");
  console.log(req.body);
  // res.json(data);
});

app.listen(8001, () => {
  console.log(`Example app listening on port ${8001}`);
});
