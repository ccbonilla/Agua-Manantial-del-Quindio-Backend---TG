const user_controller = module.exports;
const user_repository = require('../Repositories/user_repository');
const user_auth_repository = require('../Repositories/user_auth_repository');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

user_controller.create = async (req, res) => {
  const {
    body: { name, lastname, email, phone, address, user_type_id, user_id, password },
  } = req;
  const user_found = await user_repository.find_by_email(email);
  if (_.isNil(user_found)) {
    return await user_repository
      .create({ name, lastname, email, phone, address, user_type_id, user_id })
      .then((response) => {
        const salt = bcrypt.genSaltSync(10);
        const user_auth = {
          user_id: response[0].user_id,
          email: email,
          password: bcrypt.hashSync(password, salt),
        };
        user_auth_repository.create(user_auth).then((resp) => res.status(200).json(response));
      })
      .catch((error) => console.log(`Error : ${error}`));
  } else {
    res.json('Ya existe un cliente con ese email');
  }
};
user_controller.find_by_id = async (req, res) => {
  const {
    params: { user_id },
  } = req;
  return await user_repository
    .find_by_id(user_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
user_controller.list = async (req, res) => {
  return await user_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
user_controller.update = async (req, res) => {
  const {
    params: { user_id },
    body: user,
  } = req;
  return await user_repository
    .update(user_id, user)
    .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
    .catch((error) => console.log(`Error : ${error}`));
};
user_controller.delete = async (req, res) => {
  const {
    params: { user_id },
  } = req;
  return await user_repository
    .delete(user_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => console.log(`Error : ${error}`));
};
