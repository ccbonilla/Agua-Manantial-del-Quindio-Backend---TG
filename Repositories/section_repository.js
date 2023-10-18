const section_repository = module.exports;
const DB = require('../config/database');

section_repository.create = async (section) => DB('section').insert(section);
section_repository.list = async () => DB('section').select('*');
section_repository.find_by_id = async (section_id) => DB('section').select('*').where('section_id', section_id).first();
section_repository.update = async (section_id, section) =>
  DB('section').update(section).where('section_id', section_id);
section_repository.delete = async (section_id) => DB('section').del().where('section_id', section_id);
