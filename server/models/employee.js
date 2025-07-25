const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  office: { type: String, required: true },
  age: { type: Number, required: true },
  startDate: { type: Date, required: true },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
