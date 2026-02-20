const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/place", async (req, res) => {
  await new Order(req.body).save();
  res.send({ success: true });
});

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

module.exports = router;
const auth = require("../middleware/auth");

router.post("/pay", auth, async (req, res) => {
  await new Order({
    username: req.user.username,
    products: req.body.products,
    total: req.body.total,
    paid: true
  }).save();

  res.send({ success: true });
});
