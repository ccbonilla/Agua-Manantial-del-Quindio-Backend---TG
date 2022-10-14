const user_type_controller = module.exports;
const user_type_repository = require('../Repositories/user_type_repository');

user_type_controller.list = async (req, res, next) => {
  return await user_type_repository
    .list()
    .then((response) => res.json(response))
    .catch((error) => next(new BaseError(error.message)));
};
