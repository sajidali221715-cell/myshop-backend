const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROOT TEST ================= */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ================= MONGODB ATLAS CONNECTION ================= */
mongoose
  .connect(
    "mongodb+srv://sajidali221715_db_user:F3dSGyGe98s7ME9q@cluster0.ejycrdp.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Atlas connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

/* ================= LOGIN ROUTE ================= */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required",
    });
  }

  // TEMP LOGIN (testing purpose)
  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      success: true,
      message: "Login successful",
      user: { email },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

/* ================= PRODUCT ROUTES ================= */
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

/* ================= ORDER ROUTES ================= */
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

/* ================= SERVER START ================= */
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
