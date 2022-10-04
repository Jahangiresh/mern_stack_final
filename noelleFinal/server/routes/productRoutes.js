import express from "express";
import Product from "../models/productModel.js";
const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    name: req.body.name,
    substance: req.body.substance,
    slug: req.body.slug,
    image: req.body.image,
    desc: req.body.desc,
    brand: req.body.brand,
    category: req.body.category,
    price: req.body.price,
    countInStock: req.body.countInStock,
    isTrending: req.body.isTrending,
    count: req.body.count,
    instruction: req.body.instruction,
    rating: req.body.rating,
  });
  const product = await newProduct.save();
  if (newProduct) {
    res.status(201).send({ message: "New Product Created", product });
  } else {
    res.status(404).send({ message: "try again" });
  }
});

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

productRouter.get("/id/:id", async (req, res) => {
  const editProduct = await Product.findOne({ _id: req.params.id });

  if (editProduct) {
    res.send(editProduct);
  } else {
    res.status(404).send({ message: "product nots found" });
  }
});

productRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({ message: "product deleted" });
  } catch (error) {
    res.status(404).send({ message: "product not found" });
  }
});

productRouter.put("/update/:id", async (req, res) => {
  const prod = await Product.findById(req.params.id);
  if (prod) {
    prod.name = req.body.name;
    prod.countInStock = req.body.countInStock;
    prod.price = req.body.price;
    prod.isTrending = req.body.isTrending;

    const updatedProduct = await prod.save();
    res.send({
      name: updatedProduct.name,
      countInStock: updatedProduct.countInStock,
      price: updatedProduct.price,
      isTrending: updatedProduct.isTrending,
    });
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

productRouter.put("/comment/:slug", async (req, res) => {
  const prod = await Product.findOne({ slug: req.params.slug });

  if (prod) {
    prod.comments.push(req.body.comments);

    const updatedProduct = await prod.save();
    res.send({
      comments: {
        comment: updatedProduct.comments,
        userName: updatedProduct.userName,
      },
    });
  } else {
    res.status(404).send({ message: "product not found" });
  }
});
productRouter.put("/rating/:slug", async (req, res) => {
  const prod = await Product.findOne({ slug: req.params.slug });

  if (prod) {
    prod.ratings.push(req.body.ratings);

    const ratingProd = await prod.save();
    res.send({
      ratings: {
        rating: ratingProd.ratings,
      },
    });
  } else {
    res.status(404).send({ message: "ratingProd not found" });
  }
});
export default productRouter;
