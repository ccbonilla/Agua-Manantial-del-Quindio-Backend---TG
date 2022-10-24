const user_auth_repository = module.exports;
const db = require('../config/database');

user_auth_repository.create = (user_auth) => db('user_auth').insert(user_auth).returning('user_auth_id');
