const payment_type_repository = module.exports;
const db = require('../config/database');

payment_type_repository.create = (payment_type) => db('payment_type').insert(payment_type).returning('name');
payment_type_repository.list = () => db('payment_type').select('*');
payment_type_repository.find_by_name = (name) => db('payment_type').select('*').where('name', name).first('*');
payment_type_repository.find_by_id = (payment_type_id) =>
  db('payment_type').select('*').where('payment_type_id', payment_type_id).first('*');
payment_type_repository.update = (payment_type_id, payment_type) =>
  db('payment_type').update(payment_type).where('payment_type_id', payment_type_id);
payment_type_repository.delete = (payment_type_id) =>
  db('payment_type').where('payment_type_id', payment_type_id).del();
