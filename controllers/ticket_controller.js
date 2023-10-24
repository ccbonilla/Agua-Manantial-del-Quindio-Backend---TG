const ticket_controller = module.exports;
const ticket_repository = require('../Repositories/ticket_repository');

ticket_controller.create = async (req, res) => {
  const { body: ticket } = req;
  return await ticket_repository
    .create(ticket)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
ticket_controller.list = async (req, res) => {
  return await ticket_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
ticket_controller.create_ticket_holder = async (req, res) => {
  const { body: ticket_holder } = req;
  return await ticket_repository
    .create_ticket_holder(ticket_holder)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
ticket_controller.find_last_ticket_by_ticket_holder = async (req, res) => {
  const {
    params: { ticket_holder_id },
  } = req;
  return await ticket_repository
    .find_last_ticket_by_ticket_holder(ticket_holder_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
ticket_controller.update_ticket_holder = async (req, res) => {
  const { params: ticket_holder_id, body: ticket_holder } = req;
  return await ticket_repository
    .update_ticket_holder(ticket_holder_id, ticket_holder)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
