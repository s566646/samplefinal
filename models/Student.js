const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
  Stu_Name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Name of the Student is not valid"],
  },
  Stu_Age: {
    type: Number,
    required: true,
    minLength: [1, "Age of the Student is not valid"],
  },
  Mail_Id: {
    type: String,
    required: true,
    min: [10, "Mail Id of the Student is not valid"],
  },
});
module.exports = mongoose.model("Student", studentSchema);
