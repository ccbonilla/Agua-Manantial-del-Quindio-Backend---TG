const discount_repository = module.exports;
const db = require('../config/database');

discount_repository.create = (discount) => db('discount').insert(discount).returning('name');
discount_repository.list = () => db('discount').select('*');
discount_repository.find_by_name = (name) => db('discount').select('*').where('name', name).first();
discount_repository.find_by_id = (discount_id) => db('discount').select('*').where('discount_id', discount_id).first();
discount_repository.update = (discount_id, discount) =>
  db('discount').where('discount_id', discount_id).update(discount);
discount_repository.delete = (discount_id) => db('discount').where('discount_id', discount_id).del();
