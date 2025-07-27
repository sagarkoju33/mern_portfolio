const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb+srv://sagarkoju5:w047wx1MUd4sdmny@cluster0.1d6j4nb.mongodb.net/mern-portfolio?retryWrites=true&w=majority"); // Change to your DB

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("users", UserSchema);

async function seedUser() {
  const existingUser = await User.findOne({ username: "sagarkoju5" });
  if (existingUser) {
    console.log("User already exists");
    return mongoose.disconnect();
  }

  const hashedPassword = await bcrypt.hash("9863180182", 10);
  const newUser = new User({
    username: "sagarkoju5",
    password: hashedPassword,
  });

  await newUser.save();
  console.log("User seeded successfully");
  mongoose.disconnect();
}

seedUser();
