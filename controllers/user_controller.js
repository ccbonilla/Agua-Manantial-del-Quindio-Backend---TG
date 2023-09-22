const user_controller = module.exports;
const user_repository = require('../Repositories/user_repository');
const user_type_repository = require('../Repositories/user_type_repository');
const user_auth_repository = require('../Repositories/user_auth_repository');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

user_controller.create = async (req, res) => {
  const {
    body: { name, lastname, email, phone, address, user_type_id, password, identification, ticket, lat, lon },
  } = req;
  const user_found_by_email = await user_repository.find_by_email(email);
  const user_found_by_identification = await user_repository.find_by_identification(identification);
  if (!_.isNil(user_found_by_identification)) {
    return res.json({ msg: 'Ya existe un cliente suscrito con ese número de cedula' });
  }
  if (_.isNil(user_found_by_email)) {
    return await user_repository
      .create({ name, lastname, email, phone, address, user_type_id, identification, ticket, lat, lon })
      .then(([response]) => {
        if (response.user_type_id == 2) {
          const salt = bcrypt.genSaltSync(10);
          const user_auth = {
            user_id: response.user_id,
            email: email,
            password: bcrypt.hashSync(password, salt),
          };
          user_auth_repository.create(user_auth).then((resp) => res.status(200).json(response));
        } else {
          res.status(200).json(response);
        }
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
        return res.status(500).json({ msg: 'Ha ocurrido un problema' });
      });
  } else {
    return res.json({ msg: 'Ya existe un cliente con ese email' });
  }
};

user_controller.find_by_id = async (req, res) => {
  const {
    params: { user_id },
  } = req;
  return await user_repository
    .find_by_id(user_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
user_controller.list = async (req, res) => {
  try {
    const users = await user_repository.list();
    for (let user of users) {
      const { name } = await user_type_repository.find_by_id(user.user_type_id);
      user.user_type_name = name;
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(500).json('Ha ocurrido un problema');
  }
};
user_controller.update = async (req, res) => {
  const {
    params: { user_id },
    body,
  } = req;
  const { user_type_name, ...user } = body;

  return await user_repository
    .update(user_id, user)
    .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
user_controller.delete = async (req, res) => {
  const {
    params: { user_id },
  } = req;
  return await user_repository
    .delete(user_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
