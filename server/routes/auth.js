const express = require('express')
const {register} = require('../controllers/auth.js')
const {login} = require('../controllers/auth.js')
const { getCurrentUser } = require('../controllers/auth.js');
const authMiddleware = require('../middleware/auth.js');
const { updateUserSettings } = require("../controllers/auth.js");

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/current-user', authMiddleware, getCurrentUser);
router.put("/user-settings", authMiddleware, updateUserSettings);


module.exports = router;