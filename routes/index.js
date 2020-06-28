const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const loginController = require('../controller/user');
const dashboardController = require('../controller/dashboard');

router.get('/',ensureGuest,loginController.login);
router.get('/dashboard', ensureAuth,dashboardController.dashboard);

module.exports = router ; 