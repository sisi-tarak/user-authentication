const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [];

const JWT_SECRET = "your-secret-key";

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "30m" });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
