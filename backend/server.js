const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("../backend/routes/userRoutes");
const productRoutes = require("../backend/routes/productRoutes");
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

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});