const { OrderService } = require("../services/order.service");

module.exports = {
  createOrder: async (req, res, next) => {
    const orderService = new OrderService();
    const dataOrder = req.body;
    console.log(dataOrder);
    const newOrder = await orderService.createOrder(dataOrder);
    return res.json(newOrder);
  },
  updateOrder: async (req, res, next) => {
    const orderService = new OrderService();
    const { id } = req.params;
    const getOrder = await orderService.updateOrder(id);
    return res.json(getOrder);
  },
  getOrder: async (req, res, next) => {
    const orderService = new OrderService();

    const getOrder = await orderService.getOrders();
    return res.json(getOrder);
  },
  getOrderById: async (req, res, next) => {
    const orderService = new OrderService();
    const { id } = req.params;
    console.log(id);
    const getOrderbyID = await orderService.getOrderById(id);
    return res.json(getOrderbyID);
  },
  checkQuantityMaterial: async (req, res, next) => {
    const orderService = new OrderService();
    const check = await orderService.checkInventoryLevels();
    return res.json(check);
  },
};
