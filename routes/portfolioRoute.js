const router = require("express").Router();
const express = require("express");
const multer = require("multer");
const path = require("path");
require("dotenv").config();


const {
  Intro,
  About,
  Experience,
  Project,
  Education,
  Contact,
  ProfilePicture,
} = require("../models/portfolioModel");

const {
 Store,
 
} = require("../models/store");
// get all the portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const about = await About.find();
    const experiences = await Experience.find();
    const projects = await Project.find();
    const educations = await Education.find();
    const contacts = await Contact.find();
      const store = await Store.find();
    res.status(200).json({
      intro: intros[0],
      about: about[0],
      experience: experiences,
      projects: projects,
      education: educations,
      contact: contacts[0],
      profilePicture:  store[0]
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





module.exports = router;
