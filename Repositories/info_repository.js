const info_repository = module.exports;
const db = require('../config/database');

info_repository.getInfo = (info_id) => db('info').select('*').where('info_id', info_id).first();
info_repository.update = (info_id, info) => db('info').update(info).where('info_id', info_id);
