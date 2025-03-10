const express = require('express');
const Controller = require('../controllers/controller');

const router = express.Router();

router.post('/signup', Controller.signup_post);

router.post('/login', Controller.login_post);

router.get('/main', Controller.main_get);

router.get('/signup', Controller.signup_get);

router.get('/login', Controller.login_get);

router.get('/logout', Controller.logout_get);

module.exports = router;