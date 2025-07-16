const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  className: String,
  section: String,
  dob: String,
  gender: String,
  category: String,
  mobile: String,
  email: String,
  aadhaar: String,
  state: String,
  district: String,
  admissionNo: String,
  srNo: String,
  panNo: String,
  uniqueIdType: String,
  uniqueId: String,
  stream: String,
  feeCategory: String,
  rollNumber: String,
  fatherName: String,
  motherName: String,
  parentEmail: String,
  parentMobile: String,
  localGuardian: String,
  relation: String,
  fatherOccupation: String,
});

module.exports = mongoose.model("Student", studentSchema);
