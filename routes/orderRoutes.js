const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/place", async (req, res) => {
  try {
    const { customerName, phone, address, city, pincode, paymentMethod, items, total, status, orderDate } = req.body;
    
    // Transform items to match Order schema
    const orderItems = items.map(item => ({
      name: item.name,
      qty: item.quantity || 1,
      price: item.price,
      image: item.image
    }));
    
    const newOrder = new Order({
      orderItems: orderItems,
      shippingAddress: {
        address: `${address}, ${city}, ${pincode}`
      },
      paymentMethod: paymentMethod || "COD",
      totalPrice: total,
      isPaid: false,
      isDelivered: false
    });
    
    await newOrder.save();
    res.send({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).send({ success: false, message: "Failed to place order" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
