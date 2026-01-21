const SearchEvent = require("../models/SearchEvent");

const startAggregationJob = () => {
  setInterval(async () => {
    const count = await SearchEvent.countDocuments();
    console.log(`Total search events: ${count}`);
  }, 60 * 1000);
};

module.exports = startAggregationJob;
