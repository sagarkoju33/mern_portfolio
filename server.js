require("dotenv").config();

const express = require("express");
const connectDB = require("./config/dbConfig");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
connectDB();

const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());

app.use("/api/portfolio", portfolioRoute);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
const upload = require("./routes/multer");
const uploadController = require("./routes/uploadController");
app.post("/upload-file", upload.single("file"), (req, res) => {
  const isProfile = req.body.isProfile === "true";
  uploadController.uploadFile(req, res, isProfile);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // console.log(process.env.NODE_ENV);
  console.log(`🚀 Server is running on port ${port}`);
});
