const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    color: String,
    quantity: {
      type: Number, 
      required: true,
    },
  },

}, {_id: false}
);

const orderSchema = new mongoose.Schema({
  user: {
    type: 
  }
})