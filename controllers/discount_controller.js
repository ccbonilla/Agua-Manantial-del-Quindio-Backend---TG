const discount_contoller = module.exports;
const _ = require('lodash');
const discount_repository = require('../Repositories/discount_repository');

discount_contoller.create = async (req, res) => {
  const { body } = req;
  const found_discount = await discount_repository.find_by_name(body.name);
  if (_.isNil(found_discount)) {
    return await discount_repository
      .create(body)
      .then((response) => res.status(200).json(response))
      .catch((error) => console.log(`Error : ${error}`));
  } else {
    res.json('Ya existe este tipo de descuento');
  }
};
discount_contoller.list = async (req, res) => {
  return await discount_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
discount_contoller.find_by_id = async (req, res) => {
  const {
    params: { discount_id },
  } = req;
  return await discount_repository
    .find_by_id(discount_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
discount_contoller.update = async (req, res) => {
  const {
    body: discount,
    params: { discount_id },
  } = req;
  return await discount_repository
    .update(discount_id, discount)
    .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
    .catch((error) => console.log(error));
};
discount_contoller.delete = async (req, res) => {
  const {
    params: { discount_id },
  } = req;
  return await discount_repository
    .delete(discount_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => console.log(error));
};
