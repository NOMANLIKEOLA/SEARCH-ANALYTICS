require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const analyticsRoutes = require("./routes/analyticsRoute");
const startAggregationJob = require("./jobs/aggregationJob");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analyticsRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Search Analytics API running" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    startAggregationJob();
  });
});
