const express = require('express');
const router = express.Router();

const loginController = require('../controller/user');
const dashboardController = require('../controller/dashboard');

router.get('/',loginController.login);
router.get('/dashboard',dashboardController.dashboard);

module.exports = router ; 