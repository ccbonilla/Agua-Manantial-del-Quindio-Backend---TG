const order_repository = module.exports;
const db = require('../config/database');

order_repository.create = (order) => db('order').insert(order).returning('*');
order_repository.list = () => db('order').select('*').orderBy('order_date', 'asc');
order_repository.find_by_id = (order_id) => db('order').select('*').where('order_id', order_id).first('*');
order_repository.list_by_user = (user_id) => db('order').select('*').where('user_id', user_id);
order_repository.list_by_payment_type = (payment_type_id) =>
  db('order').select('*').where('payment_type_id', payment_type_id);
order_repository.update = (order_id, order) => db('order').update(order).where('order_id', order_id);
order_repository.delete = (order_id) => db('order').where('order_id', order_id).del();
order_repository.list_states = () => db('order_state').select('*');
