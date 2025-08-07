const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
    required: true,
  },
});
module.exports = {
  Blog: mongoose.model("blogs", blogSchema),
};
