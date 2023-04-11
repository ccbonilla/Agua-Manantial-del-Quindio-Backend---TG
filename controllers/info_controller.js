const info_controller = module.exports;
const info_repository = require('../Repositories/info_repository');

info_controller.getInfo = async (req, res) => {
  const {
    params: { info_id },
  } = req;
  return await info_repository
    .getInfo(info_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
info_controller.update = async (req, res) => {
  const {
    params: { info_id },
    body: info,
  } = req;

  return await info_repository
    .update(info_id, info)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
