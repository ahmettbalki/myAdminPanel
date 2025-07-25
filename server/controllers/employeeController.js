const Employee = require('../models/employee');

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  const { name, position, office, age, startDate, salary } = req.body;

  const newEmployee = new Employee({
    name,
    position,
    office,
    age,
    startDate,
    salary
  });

  try {
    const saved = await newEmployee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee
};
