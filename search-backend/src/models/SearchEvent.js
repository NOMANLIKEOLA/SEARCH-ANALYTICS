const mongoose = require("mongoose");

const searchEventSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model("SearchEvent", searchEventSchema);