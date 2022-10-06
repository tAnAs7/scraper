//Libs
import mongoose from "mongoose";
import plimit from "p-limit";

//Model
import Tournaments from "../../models/sport/football/tournaments.js";

//Func
import { fetchEach, padLeadingZeros } from "../../function/fetchFunction.js";
import { saveRequestLog } from "../../function/saveRecords.js";

//Element
import { FIFA_TARGET, FIFA_COOKIE } from "../../utils/scrapTarget.js";
import { END_REQUEST_SINGLE, START_REQUEST } from "../../utils/logElement.js";

export const fetchTournamentsByMonth = async (req, res) => {
  const { date } = req.params;

  //Start scrapping
  const startPoint = performance.now();
  console.log("\n" + START_REQUEST);
  saveRequestLog(START_REQUEST, date, "football", "tournaments", false);

  const dayOfMonth = new Date(
    date.split("-")[0],
    date.split("-")[1],
    0
  ).getDate(); //return 28, 29, 30, 31

  let target = FIFA_TARGET, //url target
    cookieAccept = FIFA_COOKIE; //button reject cookie

  const limit = plimit(5); //limit scraping request per time
  const promises = [];
  for (let i = 1; i <= dayOfMonth; i++) {
    let index = padLeadingZeros(i, 2);
    promises.push(limit(() => fetchEach(date, target, cookieAccept, index)));
  }

  //End scrapping
  Promise.all(promises)
    .then(() => {
      const endPoint = performance.now();
      console.log(
        `${dayOfMonth} request done in ${Math.round(
          (endPoint - startPoint) / 1000
        )} seconds.`
      );
      res.status(200).json("All done!");
    })
    .catch((err) => console.error(err));
};

export const fetchTournamentsByDate = async (req, res) => {
  const { date } = req.params;

  //Start scrapping
  const startPoint = performance.now();
  console.log("\n" + START_REQUEST);
  saveRequestLog(START_REQUEST, date, "football", "tournaments", false);

  let target = FIFA_TARGET, //url target
    cookieAccept = FIFA_COOKIE; //button reject cookie

  let day = date.split("-")[date.length - 1];

  fetchEach(date, target, cookieAccept, day)
    .catch((err) => console.error(err))
    .then((result) => {
      const endPoint = performance.now();
      console.log(
        "\n" + END_REQUEST_SINGLE(Math.round((endPoint - startPoint) / 1000))
      );
      saveRequestLog(
        END_REQUEST_SINGLE(Math.round((endPoint - startPoint) / 1000)),
        date,
        "football",
        "tournaments",
        true
      );
      res.status(200).json(result);
    });
};
