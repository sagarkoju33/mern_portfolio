const router = require("express").Router();
const express = require("express");
const multer = require("multer");
const path = require("path");


const {
  Intro,
  About,
  Experience,
  Project,
  Education,
  Contact,
} = require("../models/portfolioModel");
// get all the portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const about = await About.find();
    const experiences = await Experience.find();
    const projects = await Project.find();
    const educations = await Education.find();
    const contacts = await Contact.find();
    res.status(200).json({
      intro: intros[0],
      about: about[0],
      experience: experiences,
      projects: projects,
      education: educations,
      contact: contacts[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update Intro

router.post("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro update successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


// update About

router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "Update update successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });



// Express.js (Multer Example)
router.post("/update-about-with-image", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      emailAddress,
      linkedln,
      githubAccount,
      description1,
      description2,
      _id,
    } = req.body;

    const updatedData = {
      name,
      contactNumber,
      emailAddress,
      linkedln,
      githubAccount,
      description1,
      description2,
    };

    if (req.file) {
      const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      updatedData.lottieURL = fullUrl;
    }

    await About.findByIdAndUpdate(_id, updatedData);
    res.send({ success: true, message: "Image updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Update failed" });
  }
});


module.exports = router;
