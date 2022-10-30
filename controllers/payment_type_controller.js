const _ = require('lodash');
const payment_type_controller = module.exports;
const payment_type_repository = require('../Repositories/payment_type_repository');

payment_type_controller.create = async (req, res) => {
  const { body: payment_type } = req;
  const found_payment_type = await payment_type_repository.find_by_name(payment_type.name);
  if (_.isNil(found_payment_type)) {
    return await payment_type_repository
      .create(payment_type)
      .then((response) => res.status(200).json(response))
      .catch((error) => console.log(`Error : ${error}`));
  } else {
    res.status(400).json('Ya existe este tipo de pago');
  }
};
payment_type_controller.list = async (req, res) => {
  return await payment_type_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
payment_type_controller.find_by_id = async (req, res) => {
  const {
    params: { payment_type_id },
  } = req;
  return await payment_type_repository
    .find_by_id(payment_type_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
payment_type_controller.update = async (req, res) => {
  const {
    body: payment_type,
    params: { payment_type_id },
  } = req;
  let found_payment_type = null;
  if (!_.isNil(payment_type.name)) {
    found_payment_type = await payment_type_repository.find_by_name(payment_type.name);
  }
  if (_.isNil(found_payment_type)) {
    return await payment_type_repository
      .update(payment_type_id, payment_type)
      .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
      .catch((error) => console.log(error));
  } else {
    res.status(400).json('Ya existe este tipo de usuario');
  }
};
payment_type_controller.delete = async (req, res) => {
  const {
    params: { payment_type_id },
  } = req;
  return await payment_type_repository
    .delete(payment_type_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => console.log(error));
};
