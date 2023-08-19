import express from "express";
import { scraper } from "../scraper.js";
import cors from "cors";

const app = express();

app.use(cors());
app.get("/", async function (req, res) {
  let data = await scraper();

  res.json(data);
});

app.listen(8001);
