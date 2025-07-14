require("dotenv").config();

const express = require("express");
const connectDB = require("./config/dbConfig");

const app = express();
connectDB();

const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
