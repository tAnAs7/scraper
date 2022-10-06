import express from "express";

import {
  fetchTournamentsByMonth,
  fetchTournamentsByDate,
} from "../controllers/sports/football.js";

const router = express.Router();

router.get("/fetch/tournaments-by-month/:date", fetchTournamentsByMonth);
router.get("/fetch/tournaments-by-date/:date", fetchTournamentsByDate);

export default router;
