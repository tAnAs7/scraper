import { launch } from "puppeteer";
import getTournamentJson from "../function/fetcher.js";
import { autoScroll } from "./autoScroll.js";
import { saveTempRecords } from "./saveRecords.js";

export async function fetchEach(date, target, cookieAccept, index) {
  const browser = await launch({ headless: true, defaultViewport: null });
  const page = await browser.newPage();

  // console.log(String(date).split("-")[2]);
  let queryDate =
    String(date).split("-")[2] === undefined ? date + "-" + index : date;
  const url = target + "?date=" + queryDate;
  console.log("\n\t┓ Start scraping with parameter: " + queryDate);
  await page.goto(
    url,
    { timeout: 30000, waitUntil: "networkidle2" },
    console.log("\t┃ Target exist...")
  );

  await page.waitForSelector(cookieAccept).then(() => page.click(cookieAccept));

  await autoScroll(page);

  var data = await page.content();
  var result = getTournamentJson(data);

  if (result === null) console.log("\t┃ Return an empty result");
  else saveTempRecords(result, date, "football", "tournaments");

  browser.close();
  return result;
}

export function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
