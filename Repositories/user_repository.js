const user_repository = module.exports;
const db = require('../config/database');

user_repository.create = (user) => db('user').insert(user).returning('user_id');
user_repository.find_by_id = (user_id) => db('user').select('*').where('user_id', user_id).first();
user_repository.find_by_email = (email) => db('user').select('*').where('email', email).first();
user_repository.list = () => db('user').select('*');
user_repository.update = (user_id, user) => db('user').where('user_id', user_id).update(user);
user_repository.delete = (user_id) => db('user').where('user_id', user_id).del();
