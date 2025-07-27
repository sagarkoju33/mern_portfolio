require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/dbConfig");

const app = express();

// ✅ Use JSON & URL-encoded body parsers before any routes
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to DB
connectDB();

// ✅ Mount routes after middleware
const portfolioRoute = require("./routes/portfolioRoute");
app.use("/api/portfolio", portfolioRoute);

// ✅ Upload & Static
app.use(express.static(path.resolve(__dirname, "public")));
const upload = require("./routes/multer");
const uploadController = require("./routes/uploadController");
app.post("/upload-file", upload.single("file"), (req, res) => {
  const isProfile = req.body.isProfile === "true";
  uploadController.uploadFile(req, res, isProfile);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
