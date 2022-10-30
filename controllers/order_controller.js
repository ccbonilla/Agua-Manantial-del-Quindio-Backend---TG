const _ = require('lodash');
const order_controller = module.exports;
const order_repository = require('../Repositories/order_repository');

order_controller.create = async (req, res) => {
  const { body: order } = req;
  return await order_repository
    .create(order)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
order_controller.list = async (req, res) => {
  return await order_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
order_controller.find_by_id = async (req, res) => {
  const {
    params: { order_id },
  } = req;
  return await order_repository
    .find_by_id(order_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
order_controller.list_by_user = async (req, res) => {
  const {
    params: { user_id },
  } = req;
  return await order_repository
    .list_by_user(user_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
order_controller.list_by_payment_type = async (req, res) => {
  const {
    params: { payment_type_id },
  } = req;
  return await order_repository
    .list_by_payment_type(payment_type_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
order_controller.update = async (req, res) => {
  const {
    body: order,
    params: { order_id },
  } = req;
  let found_order = null;
  if (!_.isNil(order.name)) {
    found_order = await order_repository.find_by_name(order.name);
  }
  if (_.isNil(found_order)) {
    return await order_repository
      .update(order_id, order)
      .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
      .catch((error) => console.log(error));
  } else {
    res.status(400).json('Ya existe este tipo de usuario');
  }
};
order_controller.delete = async (req, res) => {
  const {
    params: { order_id },
  } = req;
  return await order_repository
    .delete(order_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => console.log(error));
};
