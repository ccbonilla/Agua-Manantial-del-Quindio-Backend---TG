const ticket_repository = module.exports;
const DB = require('../config/database');

ticket_repository.create = async (ticket) => DB('ticket').insert(ticket);
ticket_repository.list = async () => DB('ticket').select('*');
ticket_repository.find_by_id = async (ticket_id) => DB('ticket').select('*').where('ticket_id', ticket_id).first();
ticket_repository.find_by_secuence = async (secuence) => DB('ticket').select('*').where('secuence', secuence).firts();
ticket_repository.find_by_order = async (order_id) => DB('ticket').select('*').where('order_id', order_id).firts();
ticket_repository.list_by_ticket_holder = async (ticket_holder_id) =>
  DB('ticket').select('*').where('ticket_holder_id', ticket_holder_id);
ticket_repository.create_ticket_holder = async (ticket_holder) => DB('ticket_holder').insert(ticket_holder);
ticket_repository.update_ticket_holder = async (ticket_holder_id, ticket_holder) =>
  DB('ticket_holder').update(ticket_holder).where('ticket_holder_id', ticket_holder_id);
ticket_repository.list_ticket_holder = async () => DB('ticket_holder').select('*');
ticket_repository.find_last_ticket_by_ticket_holder = async (ticket_holder_id) =>
  DB('ticket').select('*').where('ticket_holder_id', ticket_holder_id).orderBy('ticket_id', 'desc').first();
