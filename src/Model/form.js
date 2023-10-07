const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    incidentTitle: String,
    incidentLocation: String,
    offenderName: String,
    date: Date,
    description: String,
    incidentCategory: String,
  },
  { collection: "Forms" }
);

const Form = mongoose.model("Form", formSchema, "Forms");

module.exports = Form;