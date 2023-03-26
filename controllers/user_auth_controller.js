const user_auth_controller = module.exports;
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const user_auth_repository = require('../Repositories/user_auth_repository');
const user_repository = require('../Repositories/user_repository');

user_auth_controller.create = async (req, res) => {
  const { user_auth } = req;
  return await user_auth_repository
    .create(user_auth)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
user_auth_controller.find_by_email = async (req, res) => {
  const {
    params: { email },
  } = req;
  return await user_auth_repository
    .find_by_email(email)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
user_auth_controller.update = async (req, res) => {
  const {
    body: user_auth,
    params: { user_auth_id },
  } = req;
  return await user_auth_repository
    .update(user_auth_id, user_auth)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
user_auth_controller.login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  const auth = await user_auth_repository.find_by_email(email);

  if (!auth) {
    return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });
  }
  const hash = bcrypt.compareSync(password, auth.password);
  if (!hash) {
    return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });
  }
  const user = await user_repository.find_by_id(auth.user_id);
  return res.status(200).json(user);
};
