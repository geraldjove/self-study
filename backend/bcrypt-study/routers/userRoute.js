const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth')
const { verifyUser, verifyAdmin } = auth;

router.post('/register', userController.registerUser);
router.get('/', verifyUser, verifyAdmin, userController.getUsers);
router.post('/login', userController.loginUser);

module.exports = router;

