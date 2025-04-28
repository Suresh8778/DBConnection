// Server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/DB_Connect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((err) => console.error("DB Error:", err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { name, email, password, phone} = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
const newUser = new User({ name, email, password: hashedPassword, phone });

    await newUser.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: "All fields are required." });
    }
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



app.post("/forgot", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error('Error in /forgot:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(5175, () => {
  console.log("Server is running...");
});
