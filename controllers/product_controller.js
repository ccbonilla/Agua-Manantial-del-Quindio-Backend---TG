const product_controller = module.exports;
const product_repository = require('../Repositories/product_repository');
const _ = require('lodash');

product_controller.create = async (req, res) => {
  const { body } = req;
  const found_product = await product_repository.find_by_name(body.name);
  if (_.isNil(found_product)) {
    return await product_repository
      .create(body)
      .then((response) => res.status(200).json(response))
      .catch((error) => {
        console.log(`Error : ${error}`);
        return res.status(500).json('Ha ocurrido un problema');
      });
  } else {
    return res.json('Ya existe este producto');
  }
};
product_controller.list = async (req, res) => {
  return await product_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
product_controller.find_by_id = async (req, res) => {
  const {
    params: { product_id },
  } = req;
  return await product_repository
    .find_by_id(product_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
product_controller.update = async (req, res) => {
  const {
    body: product,
    params: { product_id },
  } = req;
  return await product_repository
    .update(product_id, product)
    .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
    .catch((error) => console.log(error));
};
product_controller.delete = async (req, res) => {
  const {
    params: { product_id },
  } = req;
  return await product_repository
    .delete(product_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => console.log(error));
};
