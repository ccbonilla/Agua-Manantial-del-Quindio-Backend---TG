const product_order_repository = module.exports;
const db = require('../config/database');

product_order_repository.create = (product_order) => db('product_order').insert(product_order).returning('*');
product_order_repository.list = () => db('product_order').select('*');
product_order_repository.find_by_id = (product_order_id) =>
  db('product_order').select('*').where('product_order_id', product_order_id).first('*');
product_order_repository.list_by_order = (order_id) => db('product_order').select('*').where('order_id', order_id);
product_order_repository.list_by_product = (product_id) =>
  db('product_order').select('*').where('product_id', product_id);
product_order_repository.update = (product_order_id, product_order) =>
  db('product_order').update(product_order).where('product_order_id', product_order_id);
product_order_repository.delete = (product_order_id) =>
  db('product_order').where('product_order_id', product_order_id).del();
