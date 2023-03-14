const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create the model based on schema
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
