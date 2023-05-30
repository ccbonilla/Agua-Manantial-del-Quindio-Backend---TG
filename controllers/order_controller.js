const _ = require('lodash');
const order_controller = module.exports;
const order_repository = require('../Repositories/order_repository');
const user_repository = require('../Repositories/user_repository');
const product_repository = require('../Repositories/product_repository');
const product_order_repository = require('../Repositories/product_order_repository');

order_controller.create = async (req, res) => {
  const { body: order } = req;
  let newProductOrder = {
    product_cant: order.product_cant,
    product_id: order.product_id,
  };
  order.order_date = order.order_date.split('T')[0];
  let user = await user_repository.find_by_id(order.user_id);
  user.count = user.count + order.product_cant;
  await user_repository.update(user.user_id, user);

  delete order.product_cant;
  delete order.product_id;
  delete order.customer;
  delete order.order_id;
  const [newOrder] = await order_repository.create(order);
  newProductOrder.order_id = newOrder.order_id;

  return await product_order_repository
    .create(newProductOrder)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
order_controller.list = async (req, res) => {
  try {
    const orders = await order_repository.list();
    for (let order of orders) {
      order.customer = await user_repository.find_by_id(order.user_id);
      order.customer_name = `${order.customer.name} ${order.customer.lastname}`;
      order.details = await product_order_repository.list_by_order(order.order_id);
      for (let detail of order.details) {
        const { name } = await product_repository.find_by_id(detail.product_id);
        detail.product_name = name;
      }
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(500).json('Ha ocurrido un problema');
  }
};
order_controller.find_by_id = async (req, res) => {
  const {
    params: { order_id },
  } = req;
  return await order_repository
    .find_by_id(order_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
order_controller.list_by_user = async (req, res) => {
  const {
    params: { user_id },
  } = req;
  return await order_repository
    .list_by_user(user_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
order_controller.list_order_states = async (req, res) => {
  return await order_repository
    .list_states()
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un error');
    });
};
order_controller.list_by_payment_type = async (req, res) => {
  const {
    params: { payment_type_id },
  } = req;
  return await order_repository
    .list_by_payment_type(payment_type_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
order_controller.update = async (req, res) => {
  const {
    body: order,
    params: { order_id },
  } = req;
  const {
    user_id,
    order_date,
    customer: { name, lastname, phone, address },
    details,
  } = order;
  // Actulizar datos del cliente del pedido
  const update_customer = {
    name,
    lastname,
    phone,
    address,
  };
  await user_repository.update(user_id, update_customer);
  //Actualizar cantidad de productos
  const new_detail = {
    product_cant: details[0].product_cant,
  };
  await product_order_repository.update(details[0].product_order_id, new_detail);
  const { value: product_value } = await product_repository.find_by_id(details[0].product_id);
  const value = product_value * details[0].product_cant;
  // Actualizar datos del pedido
  const update_order = {
    order_date,
    value,
  };
  return await order_repository
    .update(order_id, update_order)
    .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
order_controller.update_state = async (req, res) => {
  const {
    body: order,
    params: { order_id },
  } = req;
  const { order_state } = order;
  return await order_repository
    .update(order_id, { order_state })
    .then((response) => res.status(200).json(`Se ha actualizado ${response} registro`))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
order_controller.delete = async (req, res) => {
  const {
    params: { order_id },
  } = req;
  const products = await product_order_repository.list_by_order(order_id);
  for (let product of products) {
    await product_order_repository.delete(product.product_order_id);
  }
  return await order_repository
    .delete(order_id)
    .then((response) => res.status(200).json(`Se ha eliminado ${response} registro`))
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
