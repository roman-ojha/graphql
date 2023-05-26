const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  authorID: {
    type: String,
  },
});

module.exports = mongoose.model("Books", bookSchema);
