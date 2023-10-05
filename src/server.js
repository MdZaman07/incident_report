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

// Connect to MongoDB
try {
  mongoose.connect('mongodb+srv://blester7:yTGJYryN4t2RfVFC@cluster0.hr8ilkr.mongodb.net/?retryWrites=true&w=majority', {
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

  const {incidentTitle, incidentLocation, witnessName, offenderName, date, description, incidentCategory} = req.body

  try {

  const parsedDate = new Date(date)

  if(offenderName === "") {
    offenderName = "N/A"
  }

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
