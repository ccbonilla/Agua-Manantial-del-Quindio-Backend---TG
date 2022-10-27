const user_auth_repository = module.exports;
const db = require('../config/database');

user_auth_repository.create = (user_auth) => db('user_auth').insert(user_auth);
user_auth_repository.find_by_email = (email) => db('user_auth').select('*').where('email', email).first();
user_auth_repository.update = (user_auth_id, user_auth) =>
  db('user_auth').where('user_auth_id', user_auth_id).update(user_auth);
