const _ = require('lodash');
const user_type_controller = module.exports;
const user_type_repository = require('../Repositories/user_type_repository');

user_type_controller.create = async (req, res) => {
  const { body: user_type } = req;
  const found_user_type = await user_type_repository.find_by_name(user_type.name);
  if (_.isNil(found_user_type)) {
    return await user_type_repository
      .create(user_type)
      .then((response) => res.status(200).json(response))
      .catch((error) => console.log(`Error : ${error}`));
  } else {
    res.status(400).json('Ya existe este tipo de usuario');
  }
};
user_type_controller.list = async (req, res) => {
  return await user_type_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
user_type_controller.find_by_id = async (req, res) => {
  const {
    params: { user_type_id },
  } = req;
  return await user_type_repository
    .find_by_id(user_type_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
user_type_controller.update = async (req, res) => {
  const {
    body: user_type,
    params: { user_type_id },
  } = req;
  let found_user_type = null;
  if (!_.isNil(user_type.name)) {
    found_user_type = await user_type_repository.find_by_name(user_type.name);
  }
  if (_.isNil(found_user_type)) {
    return await user_type_repository
      .update(user_type_id, user_type)
      .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
      .catch((error) => console.log(error));
  } else {
    res.status(400).json('Ya existe este tipo de usuario');
  }
};
user_type_controller.delete = async (req, res) => {
  const {
    params: { user_type_id },
  } = req;
  return await user_type_repository
    .delete(user_type_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => console.log(error));
};
