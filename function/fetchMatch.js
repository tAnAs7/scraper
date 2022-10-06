import * as cheerio from "cheerio";

function fetchMatch(keyword, data) {
  switch (keyword) {
    case "EPL":
      return getEplJson(data);
  }
}

const getEplJson = (data) => {
  const $ = cheerio.load(data);
  const listItems = $("section.fixtures div.fixtures__matches-list");
  const temp = [];
  listItems.each((idx, el) => {
    $(el)
      .find("ul > li")
      .each((i, e) => {
        const match = {
          matchId: "",
          home: "",
          away: "",
          competition: "",
          venue: "",
          datetime: "",
        };
        match.matchId = $(e).attr("data-comp-match-item");
        match.home = $(e).attr("data-home");
        match.away = $(e).attr("data-away");
        match.competition = $(e).attr("data-competition");
        match.venue = $(e)
          .attr("data-venue")
          .replace(/<[^>]*>?/gm, "");
        match.datetime = new Date(
          $(el).attr("data-competition-matches-list") +
            " " +
            $(e).find("div > span > span > time").text()
        );
        temp.push(match);
      });
  });
  return temp;
};

export default fetchMatch;
