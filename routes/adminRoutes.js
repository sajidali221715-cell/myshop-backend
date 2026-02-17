const express = require("express");
const router = express.Router();

// TEST ROUTE
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin route working",
  });
});

module.exports = router;
