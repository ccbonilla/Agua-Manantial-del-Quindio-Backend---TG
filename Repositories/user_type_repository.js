const user_type_repository = module.exports;
const db = require('../config/database');

user_type_repository.list = async () => db('user_type').select('*');
