var express = require('express');
var router = express.Router();
var loginJSON = require('../templates/login.json');
var registerJSON = require('../templates/register.json');

/* GET test page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'index', title: 'Express' });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.json(loginJSON);
});

/* POST login page. */
router.post('/login', function (req, res, next) {
  console.log(req.body);
  res.redirect('/dashboard')
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.json(registerJSON);
});

/* POST register page. */
router.post('/register', function (req, res, next) {
  res.redirect('/login')
});


module.exports = router;
