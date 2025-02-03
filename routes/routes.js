const express = require('express');
const Controller = require('../controllers/controller');

const router = express.Router();

router.post('/signup', Controller.signup_post);

router.post('/login', Controller.login_post);

router.get('/main/:id', Controller.main_get);

module.exports = router;