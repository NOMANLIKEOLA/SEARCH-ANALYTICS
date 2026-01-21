const express = require("express");
const {
  trackSearch,
  getTopQueries,
  getSearchTrends,
} = require("../controllers/analyticsController");

const router = express.Router();

router.post("/search-event", trackSearch);
router.get("/analytics/top", getTopQueries);
router.get("/analytics/trends", getSearchTrends);

module.exports = router;
