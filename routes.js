const express = require('express');
const router = express.Router();
const discount_controller = require('./controllers/discount_controller');
const user_type_controller = require('./controllers/user_type_controller');
const user_controller = require('./controllers/user_controller');
const user_auth_controller = require('./controllers/user_auth_controller.js');
const product_controller = require('./controllers/product_controller');
const payment_type_controller = require('./controllers/payment_type_controller');
const order_controller = require('./controllers/order_controller');
const product_order_controller = require('./controllers/product_order_controller');

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

// user_auth routes
router.post('/user-auth/create', user_auth_controller.create);
router.get('/user-auth/find-by-email/:email', user_auth_controller.find_by_email);
router.put('/user-auth/update/:user_auth_id', user_auth_controller.update);

// product routes
router.post('/product/create', product_controller.create);
router.get('/product/list', product_controller.list);
router.get('/product/find-by-id/:product_id', product_controller.find_by_id);
router.put('/product/update/:product_id', product_controller.update);
router.delete('/product/delete/:product_id', product_controller.delete);

// payment_type routes
router.post('/payment-type/create', payment_type_controller.create);
router.get('/payment-type/list', payment_type_controller.list);
router.get('/payment-type/find-by-id/:payment_type_id', payment_type_controller.find_by_id);
router.put('/payment-type/update/:payment_type_id', payment_type_controller.update);
router.delete('/payment-type/delete/:payment_type_id', payment_type_controller.delete);

// order routes
router.post('/order/create', order_controller.create);
router.get('/order/list', order_controller.list);
router.get('/order/find-by-id/:order_id', order_controller.find_by_id);
router.get('/order/list-by-user/:user_id', order_controller.list_by_user);
router.get('/order/list-by-payment-type/:payment_type_id', order_controller.list_by_payment_type);
router.put('/order/update/:order_id', order_controller.update);
router.delete('/order/delete/:order_id', order_controller.delete);

// product_order routes
router.post('/product-order/create', product_order_controller.create);
router.get('/product-order/list', product_order_controller.list);
router.get('/product-order/find-by-id/:product_order_id', product_order_controller.find_by_id);
router.get('/product-order/list-by-order/:order_id', product_order_controller.list_by_order);
router.get('/product-order/list-by-product/:product_id', product_order_controller.list_by_product);
router.put('/product-order/update/:product_order_id', product_order_controller.update);
router.delete('/product-order/delete/:product_order_id', product_order_controller.delete);

module.exports = router;
