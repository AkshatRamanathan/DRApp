var express = require('express');
var router = express.Router();
var User = require('../models/User');
var indexController = require('../controllers/indexController')
var loginController = require('../controllers/loginController')
var registerController = require('../controllers/registerController')
var dashboardController = require('../controllers/dashboardController')

/* GET index page. */
router.get('/', indexController.get);

/* GET/POST login page. */
router.get('/login', loginController.get);
router.post('/login', loginController.post);
router.get('/logout', loginController.logout);
router.get('/profile', loginController.getProfile);

/* GET/POST register page. */
router.get('/register', registerController.get);
router.post('/register', registerController.post);

/* GET dashboard page. */
router.get('/dashboard', dashboardController.get);

module.exports = router;
