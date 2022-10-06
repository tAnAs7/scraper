import fs from "fs";
import path from "path";
import { padLeadingZeros } from "./fetchFunction.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

export function saveTempRecords(text, date, name, target) {
  fs.appendFile(
    path.join(
      __dirname,
      "/temp/",
      "tempData" +
        parseDate(date) +
        "-" +
        name +
        "-" +
        target +
        "-at" +
        parseDate(null) +
        ".txt"
    ),
    JSON.stringify(text, null, 2),
    (err) => {
      const length = Object.keys(text).length;
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        "\nSuccessfully written " +
          length +
          " records from " +
          date +
          " to file."
      );
    }
  );
}

export function saveRequestLog(text, date, name, target, end) {
  var postProcessText = text.replace("[", "").replace("]", "") + "\r\n";
  var log =
    end === false
      ? postProcessText
      : postProcessText +
        "\r\n=========================================================\r\n\r\n";

  fs.appendFile(
    path.join(
      __dirname,
      "/log/",
      "log" + parseDate(date) + "-" + name + "-" + target + ".txt"
    ),
    log,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
}

function parseDate(input) {
  var date = input === null ? new Date() : new Date(input);
  return (
    date.getFullYear().toString() +
    padLeadingZeros((date.getMonth() + 1).toString(), 2) +
    padLeadingZeros(date.getDate().toString(), 2)
  );
}
