var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')
var loginController = require('../controllers/loginController')
var registerController = require('../controllers/registerController')
var dashboardController = require('../controllers/dashboardController')
var profileController = require('../controllers/profileController')
var postController = require('../controllers/postController')
var userController = require('../controllers/userController')

/* GET index page. */
router.get('/', indexController.get);

/* GET/POST login page. */
router.get('/login', loginController.get);
router.post('/login', loginController.post);
router.get('/logout', loginController.logout);

/* GET/POST profile page. */
router.get('/profile', profileController.get);
router.post('/profile', profileController.post);

/* GET/POST register page. */
router.get('/register', registerController.get);
router.post('/register', registerController.post);

/* GET dashboard page. */
router.get('/dashboard/*', dashboardController.get);

/* All posts page. */
router.post('/post/edit/:id', postController.edit);
router.get('/post/:id', postController.get);
router.get('/posts/create', postController.create);
router.post('/posts/create', postController.post);
router.get('/posts/all', postController.getByUser);
router.delete('/posts/delete/:id', postController.deletePost);

/* All users page. */
router.get('/users/all', userController.get);
router.delete('/users/delete/:id', userController.delete);

module.exports = router;
