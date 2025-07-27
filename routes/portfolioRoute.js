const router = require("express").Router();
const nodemailer = require("nodemailer"); // ✅ Required for email

const {
  Intro,
  About,
  Experience,
  Project,
  Education,
  Contact,
  ProfilePicture,
} = require("../models/portfolioModel");

const { Store } = require("../models/store");
const { User } = require("../models/userModel");
// get all the portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const about = await About.find();
    const experiences = await Experience.find();
    const projects = await Project.find();
    const educations = await Education.find();
    const contacts = await Contact.find();
    const store = await Store.find().sort({ _id: -1 });
    res.status(200).json({
      intro: intros[0],
      about: about[0],
      experience: experiences,
      projects: projects,
      education: educations,
      contact: contacts[0],
      profilePicture: store[0],
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
      message: "About update successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// add experience

router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update experience

router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience update successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// delete experience

router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience delete successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// add education

router.post("/add-education", async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(200).send({
      data: education,
      success: true,
      message: "Education added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update education

router.post("/update-education", async (req, res) => {
  try {
    const education = await Education.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: education,
      success: true,
      message: "Education update successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// delete education

router.post("/delete-education", async (req, res) => {
  try {
    const education = await Education.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: education,
      success: true,
      message: "Education delete successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// add project

router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update project

router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: project,
      success: true,
      message: "Project update successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// delete project

router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: project,
      success: true,
      message: "Project delete successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) {
      res.status(200).send({
        success: true,
        message: "Login Successfully",
        data: {
          username: user.username,
          id: user._id,
        },
      });
    }
    else {
      res.status(200).send({
        success: false,
        message: "Invalid user name and password",
        data: user,
      });
    }


  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post('/send-feedback', async (req, res) => {
  const { name, contactNumber, email, feedback } = req.body;

  if (!name || !contactNumber || !email || !feedback) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Nodemailer setup
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your gmail
      pass: process.env.EMAIL_PASS  // your gmail app password
    }
  });

  // Email options
  let mailOptions = {
    from: `"Feedback App" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // send to your own Gmail
    subject: 'New Feedback Received',
    html: `
      <h3>Feedback Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact Number:</strong> ${contactNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Feedback:</strong> ${feedback}</p>
    `
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send feedback' });
  }
});


module.exports = router;
