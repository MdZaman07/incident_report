const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const Grid = require('gridfs-stream');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const Form = require('./Model/form')
const User = require('./Model/user')

app.use(cors())
app.use(bodyParser.json());

const dbUrl = 'mongodb+srv://blester7:yTGJYryN4t2RfVFC@cluster0.hr8ilkr.mongodb.net/IncidentReportingDB?retryWrites=true&w=majority'

// Connect to MongoDB
try {
  const dbConnection = mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
}
catch(error) {
  console.log(error)
}

// Used for unstructured data


// Create a route for user registration
app.post('/api/register', async (req, res) => {
  const {firstname, lastname, email, password} = req.body
  try {
    const newUser = new User({firstname, lastname, email, password});
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

  const {incidentTitle, incidentLocation, witnessName, offenderName, date, description, incidentCategory} = req.body

  try {

  const parsedDate = new Date(date)

  const form = new Form({
    incidentTitle,
    incidentLocation,
    witnessName,
    offenderName,
    date: parsedDate,
    description,
    incidentCategory

  })

  await form.save(); 

  res.json({ message: 'Incident submitted successfully' });
} 
catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
