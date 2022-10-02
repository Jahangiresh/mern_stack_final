import express from "express";
import Order from "../models/orderModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/order",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      user: req.body.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);

orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const allOrders = await Order.find();
    if (allOrders) {
      res.status(200).send(allOrders);
    } else {
      res.status(404).send({ message: "no orders found" });
    }
  })
);
orderRouter.get(
  "/order/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.body.user._id });
    res.send(orders);
  })
);
orderRouter.get(
  "/order/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not Found" });
    }
  })
);

orderRouter.get(
  "/details/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not Found" });
    }
  })
);

orderRouter.put(
  "/order/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      res.send({ message: "Order Paid", order: updateOrder });
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

orderRouter.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete({
        _id: req.params.id,
      });
      res.status(200).send({ message: "order deleted" });
    } catch (error) {
      res.status(404).send({ message: "order not found" });
    }
  })
);

orderRouter.put(
  "/update/:id",
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id + "  " + "-----id");
    console.log(id + "  " + "-----id");

    try {
      const upOrder = await Order.findOne({ id: req.params.id });
      upOrder.isDelivered = true;
      const updateOrder = await upOrder.save();

      res.status(200).send({ isDelivered: updateOrder.isDelivered });
    } catch (error) {
      res.status(404).send({ message: "order notus found" });
    }
  })
);

export default orderRouter;
