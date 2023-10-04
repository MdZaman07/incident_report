const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  incidentTitle: String,
  witnessName: String,
  offenderName: String,
  date: Date,
  description: String,
  incidentCategory: String
});

const User = mongoose.model('Form', formSchema);

