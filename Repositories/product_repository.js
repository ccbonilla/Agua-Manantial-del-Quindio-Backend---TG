const product_repository = module.exports;
const db = require('../config/database');

product_repository.create = (product) => db('product').insert(product).returning('name');
product_repository.list = () => db('product').select('*');
product_repository.find_by_name = (name) => db('product').select('*').where('name', name).first();
product_repository.find_by_id = (product_id) => db('product').select('*').where('product_id', product_id).first();
product_repository.update = (product_id, product) => db('product').update(product).where('product_id', product_id);
product_repository.delete = (product_id) => db('product').where('product_id', product_id).del();
