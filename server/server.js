const express = require('express');
require("dotenv").config();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db.js');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.js')
const employeeRoutes = require('./routes/employee');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/employees', employeeRoutes);
app.use('/api', authRouter)


const PORT = process.env.PORT || 8000

db();
app.listen(PORT, () => {
    console.log("server is running on port 8000")
})