const mongoose = require('mongoose');
const { bool } = require('prop-types');

const formSchema = new mongoose.Schema({
  incidentTitle: String,
  incidentLocation: String,
  witnessName: String,
  offenderName: String,
  date: Date,
  description: String,
  incidentCategory: String,
  resolved: Boolean

}, { collection: 'Forms' });

const Form = mongoose.model('Form', formSchema, 'Forms');

module.exports = Form

