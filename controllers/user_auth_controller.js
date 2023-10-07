const user_auth_controller = module.exports;
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const user_auth_repository = require('../Repositories/user_auth_repository');
const user_repository = require('../Repositories/user_repository');
const password_service = require('../middlewares/password_service');
const email_service = require('../middlewares/emails_service');

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
    body: { password },
    params: { email },
  } = req;
  const salt = bcrypt.genSaltSync(10);
  newPass = bcrypt.hashSync(password, salt);
  const { user_auth_id } = await user_auth_repository.find_by_email(email);
  return await user_auth_repository
    .update(user_auth_id, { password: newPass })
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
    return res.status(400).json({ msg: 'Usuario o contraseña incorrecto', status: 400 });
  }
  const hash = bcrypt.compareSync(password, auth.password);
  if (!hash) {
    return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' });
  }
  const user = await user_repository.find_by_id(auth.user_id);
  return res.status(200).json(user);
};
user_auth_controller.reset_password = async (req, res) => {
  const {
    params: { email },
  } = req;
  const user_found = await user_repository.find_by_email(email);
  if (!_.isNil(user_found)) {
    let newPassword = await password_service.generatePassword();
    const body = await email_service.get_template({
      name: user_found.name,
      password: newPassword,
    });
    await email_service.send_email({
      email,
      subject: 'Se ha cambiado tu contraseña',
      body,
    });
    const salt = bcrypt.genSaltSync(10);
    newPass = bcrypt.hashSync(newPassword, salt);
    const { user_auth_id } = await user_auth_repository.find_by_email(email);
    await user_auth_repository.update(user_auth_id, { password: newPass });
  }
  return res.status(200).json(user_found);
};
