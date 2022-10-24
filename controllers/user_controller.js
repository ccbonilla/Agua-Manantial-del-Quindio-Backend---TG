const user_controller = module.exports;
const user_repository = require('../Repositories/user_repository');
const _ = require('lodash');

user_controller.create = async (req, res, next) => {
  const { body: user } = req;
  const user_found = await user_repository.find_by_email(user.email);
  if (_.isNil(user_found)) {
    return await user_repository
      .create(user)
      .then((response) => res.json(response))
      .catch((error) => next(console.log(`Error : ${error}`)));
  } else {
    res.json('Ya existe un cliente con ese email');
  }
};
user_controller.find_by_id = async (req, res, next) => {
  const {
    params: { user_id },
  } = req;
  return await user_repository
    .find_by_id(user_id)
    .then((response) => res.json(response))
    .catch((error) => next(console.log(`Error : ${error}`)));
};
user_controller.list = async (req, res, next) => {
  return await user_repository
    .list()
    .then((response) => res.json(response))
    .catch((error) => next(console.log(`Error : ${error}`)));
};
user_controller.update = async (req, res, next) => {
  const {
    params: { user_id },
    body: user,
  } = req;
  return await user_repository
    .update(user_id, user)
    .then((response) => res.json(`Se ha actualizado ${response} registro`))
    .catch((error) => next(console.log(`Error : ${error}`)));
};
user_controller.delete = async (req, res, next) => {
  const {
    params: { user_id },
  } = req;
  return await user_repository
    .delete(user_id)
    .then((response) => res.json(`Se ha eliminado ${response} registro`))
    .catch((error) => next(console.log(`Error : ${error}`)));
};
