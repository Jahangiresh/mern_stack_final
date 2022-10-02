import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./product.scss";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { useEffect } from "react";
// import { useState } from "react";

const Product = ({
  productslist,
  inputvalue,
  category,
  setcount,
  setrerender,
  rerender,
}) => {
  const navigate = useNavigate();
  if (localStorage.getItem("products") === null) {
    localStorage.setItem("products", JSON.stringify([]));
  }

  const addToLocal = (prod) => {
    let products = JSON.parse(localStorage.getItem("products"));
    let _id = prod._id;
    let existedProd = products.find((x) => x._id === _id);

    if (prod.countInStock < prod.count) {
      window.alert("sorry this product is out of stock");
      return;
    } else if (!existedProd) {
      products.push(prod);
    } else {
      // products.splice(products.indexOf(existedProd), 1); --delete prod
      existedProd.count++;
    }
    setrerender((value) => !value);
    setcount(products.length);
    localStorage.setItem("products", JSON.stringify(products));
    cartUpdateHandler();
  };
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {}, []);
  const cartUpdateHandler = async () => {
    try {
      await axios.put(
        "/api/users/updateprofilecart",
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.data.token}` },
        }
      );
      toast.success("added to cart");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <>
      {productslist &&
        productslist
          .filter((e) => e.name.includes(inputvalue))
          .map((prod) => {
            return (
              <div key={prod._id} className="product col-lg-4 col-md-6 col-12">
                <div
                  onClick={() => {
                    navigate(`/product/${prod.slug}`);
                  }}
                  className="product__content"
                >
                  <div className="product__content__image">
                    <img src={prod.image} alt="" />
                  </div>
                  <div className="product__content__title">
                    <span className="title__span">{prod.name}</span>
                    <br />
                    <span className="money__span">{prod.price}AZN</span>
                  </div>
                </div>

                {prod.countInStock === 0 ? (
                  <button className="add__cart">out of stock</button>
                ) : (
                  <button
                    onClick={() => addToLocal(prod)}
                    className="add__cart"
                  >
                    add to card
                  </button>
                )}
              </div>
            );
          })}
    </>
  );
};

export default Product;
