const express = require('express');
const Controller = require('../controllers/mainController');

const router = express.Router();

router.post('/main/addItem', Controller.addItem_post);

router.delete('/main/deleteItem', Controller.deleteItem_delete);

router.post('/main/addValue', Controller.addValue_post);

