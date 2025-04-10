const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("../backend/routes/userRoutes");
const productRoutes = require("../backend/routes/productRoutes");
const cartRoutes = require("../backend/routes/cartRoutes");
const checkoutRoutes = require("../backend/routes/checkoutRoutes");
const orderRoutes = require("../backend/routes/orderRoutes");
const uploadRoutes = require("../backend/routes/uploadRoutes");
const subscribeRoutes = require("../backend/routes/subscriberRoute");
const adminRoutes = require("../backend/routes/adminRoutes");
const productAdminRoutes = require("../backend/routes/productAdminRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to MongoDB database
connectDB();

app.get("/", (req, res)=> {
  res.send("Welcome to Fashion Fits");
});

//API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/", subscribeRoutes);


//Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);


app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});