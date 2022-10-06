import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import scraperRoutes from "./routes/football.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/scrapers", scraperRoutes);

const CONNECTION_URL =
  "mongodb+srv://scraperAdmin:KgUv2QUvM4DrO9jg@clusterpersonaltan001.sycsazt.mongodb.net/Sports";
const PORT = process.env.PORT || 5001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
