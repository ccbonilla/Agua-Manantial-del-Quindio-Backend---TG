const user_type_repository = module.exports;
const db = require('../config/database');

user_type_repository.create = (user_type) => db('user_type').insert(user_type).returning('name');
user_type_repository.list = () => db('user_type').select('*');
user_type_repository.find_by_id = (user_type_id) =>
  db('user_type').select('*').where('user_type_id', user_type_id).first();
user_type_repository.find_by_name = (name) => db('user_type').select('*').where('name', name).first();
user_type_repository.update = (user_type_id, user_type) =>
  db('user_type').where('user_type_id', user_type_id).update(user_type);
user_type_repository.delete = (user_type_id) => db('user_type').where('user_type_id', user_type_id).del();
