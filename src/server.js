const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Import the User model
const multer = require('multer');
const Grid = reqruie('gridfs-stream')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
try {
  mongoose.connect('mongodb+srv://<<username>>:<<password>>@cluster0.hr8ilkr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
}
catch(error) {
  console.log(error)
}

// Used for unstructured data
Grid.mongo = mongoose.mongo;
const gfs = Grid(mongoose.connection.db);

// Create a route for user registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add routing to Login Page here

// Routing for form submission

app.post('/api/submit', async (req, res) => {
  const {incidentTitle, witnessName, offenderName, date, description, incidentCategory} = req.body



});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
