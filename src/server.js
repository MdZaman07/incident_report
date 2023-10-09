const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const Grid = require("gridfs-stream");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

const Form = require("./Model/form");
const User = require("./Model/user");

app.use(cors());
app.use(bodyParser.json());

const dbUrl =
  "mongodb+srv://blester7:yTGJYryN4t2RfVFC@cluster0.hr8ilkr.mongodb.net/IncidentReportingDB?retryWrites=true&w=majority";

// Connect to MongoDB
try {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

// Used for unstructured data

// Create a route for user registration
app.post("/api/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add routing to Login Page here
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {}
});

// Routing for form submission

app.post("/api/submit", async (req, res) => {
  const {
    incidentTitle,
    incidentLocation,
    witnessName,
    offenderName,
    date,
    description,
    incidentCategory,
    resolved
  } = req.body;

  try {
    const parsedDate = new Date(date);

    const form = new Form({
      incidentTitle,
      incidentLocation,
      witnessName,
      offenderName,
      date: parsedDate,
      description,
      incidentCategory,
      resolved
    });

    await form.save();

    res.json({ message: "Incident submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// routing to form display

// Define a GET route to retrieve form data

app.get("/api/getForms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new route for searching incidents by incidentTitle
app.get("/api/searchIncidents", async (req, res) => {
  const { incidentLocation } = req.query;

  try {
    const incidents = await Form.find({
      incidentLocation: { $regex: incidentLocation, $options: "i" },
    });
    console.log("Found incidents:", incidents);
    res.json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/user", async (req, res) => {
  const { userId } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    console.log("Error");
    return res.status(401).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User found", user: user });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
