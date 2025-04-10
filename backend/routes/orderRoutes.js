const express = require("express");
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get Logged-in user's orders
// @access Private
router.get("/my-orders", protect, async(req, res) => {
  try {
    //Find orders for the aunthenticated user
    const orders = await Order.find({user: req.user._id}).sort({
      createdAt: -1,
    }); //sort by recent orders
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});


// @route GET /api/orders/:id
// @desc Get order details by ID
// @access Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if(!order){
      return res.status(404).json({message: "Order not found"});
    }

    //Return the full order details
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

module.exports = router;
