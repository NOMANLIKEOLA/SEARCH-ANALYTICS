const SearchEvent = require("../models/SearchEvent");

// POST /api/search-event
exports.trackSearch = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  await SearchEvent.create({ query });

  res.status(201).json({ message: "Search tracked" });
};

// GET /api/analytics/top
exports.getTopQueries = async (req, res) => {
  const results = await SearchEvent.aggregate([
    {
      $group: {
        _id: "$query",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  res.json(results);
};

// GET /api/analytics/trends
exports.getSearchTrends = async (req, res) => {
  const results = await SearchEvent.aggregate([
    {
      $group: {
        _id: {
          day: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ]);

  res.json(results);
};
