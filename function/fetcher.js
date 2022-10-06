import * as cheerio from "cheerio";

//http://localhost:5000/scrapers/fetch/tournament-by-month
function getTournamentJson(data) {
  const $ = cheerio.load(data);
  const listItems = $("section.ff-pb-32 > div.container");
  const temp = [];
  listItems.each((idx, el) => {
    $(el)
      .find("div.ff-my-16")
      .each((i, e) => {
        const tournament = {
          tournamentId: "",
          name: "",
          icon: "",
        };
        var str = $(e)
          .find("span.matches-container_CompetitionName__2AlFr")
          .parent()
          .attr("href");
        tournament.tournamentId = str.substring(
          str.lastIndexOf("/") + 1,
          str.lastIndexOf("?")
        );
        tournament.name = $(e)
          .find("span.matches-container_CompetitionName__2AlFr")
          .text();
        tournament.icon = $(e).find("img").attr("src");
        temp.push(tournament);
      });
  });
  return temp;
}

export default getTournamentJson;
