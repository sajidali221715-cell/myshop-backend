const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const auth = require("../middleware/auth");

// PLACE ORDER (without payment)
router.post("/place", async (req, res) => {
  try {
    await new Order(req.body).save();
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// PAY & PLACE ORDER (protected)
router.post("/pay", auth, async (req, res) => {
  try {
    await new Order({
      username: req.user.username,
      products: req.body.products,
      total: req.body.total,
      paid: true
    }).save();

    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

module.exports = router;
