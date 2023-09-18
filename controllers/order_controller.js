const _ = require('lodash');
const { isSameDay, isSameMonth, isSameWeek } = require('date-fns');
const order_controller = module.exports;
const order_repository = require('../Repositories/order_repository');
const user_repository = require('../Repositories/user_repository');
const product_repository = require('../Repositories/product_repository');
const product_order_repository = require('../Repositories/product_order_repository');

order_controller.create = async (req, res) => {
  const { body: order } = req;
  const { customer, order_id, products, customer_name, details, ...restOfOrder } = order;
  let product_discount = 0;
  let order_value = 0;
  order.order_date = order.order_date.split('T')[0];
  order.order_state = 1;
  let user = await user_repository.find_by_id(order.user_id);

  const [newOrder] = await order_repository.create(restOfOrder);
  for (let product of products) {
    let newProductOrder = {
      order_id: newOrder.order_id,
      product_cant: product.product_cant,
      product_id: product.product_id,
    };
    await product_order_repository.create(newProductOrder);
    const { value } = await product_repository.find_by_id(product.product_id);
    order_value += value * product.product_cant;
    if (product.product_id == 1) {
      for (let i = 0; i < product.product_cant; i++) {
        user.count += 1;
        if (user.user_type_id == 1 && user.count == 6) {
          user.user_type_id = 2;
          user.count = 0;
          product_discount += value;
          await user_repository.update(user.user_id, user);
        } else if (user.user_type_id == 2 && user.count == 7) {
          user.user_type_id = 1;
          user.count = 0;
          product_discount += value;
          await user_repository.update(user.user_id, user);
        } else {
          await user_repository.update(user.user_id, user);
        }
      }
    }
  }
  await order_repository.update(newOrder.order_id, { discount: product_discount, value: order_value });
  return res.status(200).json({ msg: 'Order create successfully', discount: product_discount });
};
order_controller.list = async (req, res) => {
  try {
    const orders = await order_repository.list();
    for (let order of orders) {
      order.value = order.value - order.discount;
      order.customer = await user_repository.find_by_id(order.user_id);
      order.customer_name = `${order.customer.name} ${order.customer.lastname}`;
      order.products = await product_order_repository.list_by_order(order.order_id);
      for (let product of order.products) {
        const { name } = await product_repository.find_by_id(product.product_id);
        product.product_name = name;
      }
    }
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json('Ha ocurrido un problema');
  }
};
order_controller.find_by_id = async (req, res) => {
  const {
    params: { order_id },
  } = req;
  try {
    const order = await order_repository.find_by_id(order_id);
    order.products = await product_order_repository.list_by_order(order.order_id);
    for (let product of order.products) {
      const { name } = await product_repository.find_by_id(product.product_id);
      product.product_name = name;
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(500).json('Ha ocurrido un problema');
  }
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
order_controller.list_by_day = async (req, res) => {
  const today = new Date();
  let daySales = [];
  await order_repository
    .list()
    .then((response) => {
      for (let sale of response) {
        if (isSameDay(new Date(sale.order_date), today)) {
          daySales.push(sale);
        }
      }
      return res.status(200).json(daySales);
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
order_controller.list_by_month = async (req, res) => {
  const today = new Date();
  let monthSales = [];
  await order_repository
    .list()
    .then((response) => {
      for (let sale of response) {
        if (isSameMonth(new Date(sale.order_date), today)) {
          monthSales.push(sale);
        }
      }
      return res.status(200).json(monthSales);
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
    });
};
order_controller.list_by_week = async (req, res) => {
  const today = new Date();
  let weekSales = [];
  await order_repository
    .list()
    .then((response) => {
      for (let sale of response) {
        if (isSameWeek(new Date(sale.order_date), today)) {
          weekSales.push(sale);
        }
      }
      return res.status(200).json(weekSales);
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
      return res.status(500).json('Ha ocurrido un problema');
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
  let { customer, customer_name, products, ...restOfOrder } = order;
  // await user_repository.update(user_id, update_customer);
  //Actualizar cantidad de productos
  const order_in_bd = await order_repository.find_by_id(order_id);
  restOfOrder.value = order_in_bd.value;
  const products_in_bd = await product_order_repository.list_by_order(order_id);
  for (let product of products) {
    const { value } = await product_repository.find_by_id(product.product_id);
    const product_change = products_in_bd.find(
      (p) => p.product_order_id == product.product_order_id && p.product_cant != product.product_cant
    );
    let diff = 0;
    if (product.product_cant - product_change.product_cant < 0) {
      diff = (product.product_cant - product_change.product_cant) * -1;
      if (product_change.product_id == 1) {
        for (let i = 0; i < diff; i++) {
          customer.count -= 1;
          if (customer.user_type_id == 1 && customer.count == 6) {
            console.log('tipo 1 count 6');
            customer.user_type_id = 2;
            customer.count = 0;
            restOfOrder.discount -= value;
            await user_repository.update(customer.user_id, customer);
          } else if (customer.user_type_id == 2 && customer.count == 7) {
            console.log('tipo 2 count 7');
            customer.user_type_id = 1;
            customer.count = 0;
            restOfOrder.discount -= value;
            await user_repository.update(customer.user_id, customer);
          } else {
            if (customer.user_type_id == 1 && customer.count == -1) {
              console.log('tipo 1 count -1', customer.count);
              customer.user_type_id = 2;
              restOfOrder.discount -= value;
              customer.count = 6;
              await user_repository.update(customer.user_id, customer);
            } else if (customer.user_type_id == 2 && customer.count == -1) {
              console.log('tipo 2 count -1', customer.count);
              customer.user_type_id = 1;
              restOfOrder.discount -= value;
              customer.count = 5;
              await user_repository.update(customer.user_id, customer);
            } else {
              console.log('a ninguno', customer.user_type_id, customer.count);
              await user_repository.update(customer.user_id, customer);
            }
          }
        }
      }
      console.log('valor antes negativo', restOfOrder.value, value * diff);
      restOfOrder.value -= value * diff;
      console.log('valor después negativo', restOfOrder.value, value * diff);
    } else {
      diff = product.product_cant - product_change.product_cant;
      if (product_change.product_id == 1) {
        for (let i = 0; i < diff; i++) {
          customer.count += 1;
          if (customer.user_type_id == 1 && customer.count == 6) {
            customer.user_type_id = 2;
            customer.count = 0;
            restOfOrder.discount += value;
            await user_repository.update(customer.user_id, customer);
          } else if (customer.user_type_id == 2 && customer.count == 7) {
            customer.user_type_id = 1;
            customer.count = 0;
            restOfOrder.discount += value;
            await user_repository.update(customer.user_id, customer);
          } else {
            await user_repository.update(customer.user_id, customer);
          }
        }
      }
      console.log('valor antes positivo', restOfOrder.value, value * diff);
      restOfOrder.value += value * diff;
      console.log('valor después positivo', restOfOrder.value, value * diff);
    }

    const { product_name, ...restOfProduct } = product;
    await product_order_repository.update(product.product_order_id, restOfProduct);
  }

  // const { value: product_value } = await product_repository.find_by_id(details[0].product_id);
  // const value = product_value * details[0].product_cant;
  // Actualizar datos del pedido
  // const update_order = {
  //   order_date,
  //   value,
  // };
  console.log('restorder', restOfOrder);
  return await order_repository
    .update(order_id, restOfOrder)
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
