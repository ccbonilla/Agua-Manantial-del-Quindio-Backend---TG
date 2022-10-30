const _ = require('lodash');
const product_order_controller = module.exports;
const product_order_repository = require('../Repositories/product_order_repository');

product_order_controller.create = async (req, res) => {
  const { body: product_order } = req;
  return await product_order_repository
    .create(product_order)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
product_order_controller.list = async (req, res) => {
  return await product_order_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
product_order_controller.find_by_id = async (req, res) => {
  const {
    params: { product_order_id },
  } = req;
  return await product_order_repository
    .find_by_id(product_order_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
product_order_controller.list_by_order = async (req, res) => {
  const {
    params: { order_id },
  } = req;
  return await product_order_repository
    .list_by_order(order_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
product_order_controller.list_by_product = async (req, res) => {
  const {
    params: { product_id },
  } = req;
  return await product_order_repository
    .list_by_product(product_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
product_order_controller.update = async (req, res) => {
  const {
    body: product_order,
    params: { product_order_id },
  } = req;

  return await product_order_repository
    .update(product_order_id, product_order)
    .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
    .catch((error) => console.log(error));
};
product_order_controller.delete = async (req, res) => {
  const {
    params: { product_order_id },
  } = req;
  return await product_order_repository
    .delete(product_order_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => console.log(error));
};
