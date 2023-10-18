const section_controller = module.exports;
const section_repository = require('../Repositories/section_repository');

section_controller.create = async (req, res) => {
  const { body } = req;

  return await section_repository
    .create(body)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
section_controller.list = async (req, res) => {
  return await section_repository
    .list()
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
section_controller.find_by_id = async (req, res) => {
  const {
    params: { section_id },
  } = req;
  return await section_repository
    .find_by_id(section_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
section_controller.update = async (req, res) => {
  const {
    params: { section_id },
    body,
  } = req;
  return await section_repository
    .update(section_id, body)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
section_controller.delete = async (req, res) => {
  const {
    params: { section_id },
  } = req;
  section_repository
    .delete(section_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
