const user_auth_controller = module.exports;
const user_auth_repository = require('../Repositories/user_auth_repository');
const _ = require('lodash');

user_auth_controller.create = async (req, res) => {
  const { user_auth } = req;
  return await user_auth_repository
    .create(user_auth)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
user_auth_controller.find_by_email = async (req, res) => {
  const {
    params: { email },
  } = req;
  return await user_auth_repository
    .find_by_email(email)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
user_auth_controller.update = async (req, res) => {
  const {
    body: user_auth,
    params: { user_auth_id },
  } = req;
  return await user_auth_repository
    .update(user_auth_id, user_auth)
    .then((response) => res.status(200).json(response))
    .catch((error) => console.log(`Error : ${error}`));
};
