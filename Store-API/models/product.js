// Setting database schema
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '必須提供商品名稱'],
  },
  price: {
    type: Number,
    required: [true, '必須提供商品價格'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported',
    },
  },
});

module.exports = mongoose.model('Product', productSchema);
