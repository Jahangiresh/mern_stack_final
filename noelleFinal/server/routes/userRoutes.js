import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken, isAuth } from "../utils.js";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.profilePic = req.body.profilePic || user.profilePic;

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updateUser = await user.save();
      res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        profilePic: updateUser.profilePic,
        token: generateToken(updateUser),
      });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  })
);

userRouter.put(
  "/user/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById({ _id: req.params.id });

    if (user) {
      user.isAdmin = req.body.isAdmin || user.isAdmin;

      const updateUser = await user.save();
      res.send({
        isAdmin: updateUser.isAdmin,
      });
    } else {
      res.status(404).send({ message: "this user cant be employee" });
    }
  })
);

userRouter.put(
  "/employee/:id",
  expressAsyncHandler(async (req, res) => {
    const employee = await User.findById({ _id: req.params.id });

    if (employee) {
      employee.isAdmin = false;
      // = req.body.isAdmin || employee.isAdmin;

      const updateEmp = await employee.save();
      res.send({
        isAdmin: updateEmp.isAdmin,
      });
    } else {
      res.status(404).send({ message: "this user cant be employee" });
    }
  })
);

userRouter.put(
  "/employee/role/:id",
  expressAsyncHandler(async (req, res) => {
    const employee = await User.findById({ _id: req.params.id });

    if (employee) {
      employee.role = req.body.role || employee.role;

      const updateEmp = await employee.save();
      res.send({
        role: updateEmp.role,
      });
    } else {
      res.status(404).send({ message: "cant add role" });
    }
  })
);

userRouter.put(
  "/updateprofilecart",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id);
    if (user) {
      user.totalAddToCart++;

      const updateUser = await user.save();
      res.send({
        totalAddToCart: updateUser.totalAddToCart,
      });
    } else {
      res.status(404).send({ message: "not added to cart" });
    }
  })
);

userRouter.put(
  "/updateprofileorder",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userOrder = await User.findById(req.body.user._id);
    if (userOrder) {
      userOrder.totalOrders++;

      const updateUserOrder = await userOrder.save();
      res.send({
        totalOrders: updateUserOrder.totalOrders,
      });
    } else {
      res.status(404).send({ message: "order not added" });
    }
  })
);

userRouter.put(
  "/updatetotalspend",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userOrder = await User.findById(req.body.user._id);
    if (userOrder) {
      userOrder.totalSpend += req.body.totalSpend;

      const updateUserSpend = await userSpend.save();
      res.send({
        totalSpend: updateUserSpend.totalSpend,
      });
    } else {
      res.status(404).send({ message: "not updated" });
    }
  })
);

userRouter.get(
  "/user/:id",
  expressAsyncHandler(async (req, res) => {
    const detailEmployee = await User.findOne({ _id: req.params.id });

    if (detailEmployee) {
      res.send(detailEmployee);
    } else {
      res.status(404).send({ message: "users nots found" });
    }
  })
);
userRouter.get(
  "/employee/:id",
  expressAsyncHandler(async (req, res) => {
    const detailEmployee = await User.findOne({ _id: req.params.id });

    if (detailEmployee) {
      res.send(detailEmployee);
    } else {
      res.status(404).send({ message: "users nots found" });
    }
  })
);

userRouter.delete(
  "/delete/:id",

  expressAsyncHandler(async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete({
        _id: req.params.id,
      });
      res.status(200).send({ message: "user deleted" });
    } catch (error) {
      res.status(404).send({ message: "user not found" });
    }
  })
);
export default userRouter;
