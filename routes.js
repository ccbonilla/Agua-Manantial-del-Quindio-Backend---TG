const express = require('express');
const router = express.Router();
const discount_controller = require('./controllers/discount_controller');
const user_type_controller = require('./controllers/user_type_controller');
const user_controller = require('./controllers/user_controller');

// discount routes
router.post('/discount/create', discount_controller.create);
router.get('/discount/list', discount_controller.list);
router.get('/discount/find-by-id/:discount_id', discount_controller.find_by_id);
router.put('/discount/update/:discount_id', discount_controller.update);
router.delete('/discount/delete/:discount_id', discount_controller.delete);

// user_type routes
router.post('/user-type/create', user_type_controller.create);
router.get('/user-type/list', user_type_controller.list);
router.get('/user-type/find-by-id/:user_type_id', user_type_controller.find_by_id);
router.put('/user-type/update/:user_type_id', user_type_controller.update);
router.delete('/user-type/delete/:user_type_id', user_type_controller.delete);

// user routes
router.post('/user/create', user_controller.create);
router.get('/user/find-by-id/:user_id', user_controller.find_by_id);
router.get('/user/list', user_controller.list);
router.put('/user/update/:user_id', user_controller.update);
router.delete('/user/delete/:user_id', user_controller.delete);

module.exports = router;
