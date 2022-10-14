const express = require('express');
const router = express.Router();
const user_type_controller = require('./controllers/user_type_controller');

router.get('/user-type/list', user_type_controller.list);
module.exports = router;
