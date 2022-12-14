import React, { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import "./placeorder.scss";
import LoadingBox from "../components/LoadingBox";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Axios from "axios";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrder = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  //order
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  //order
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const cart = {
    shipping_address: JSON.parse(localStorage.getItem("address")),

    payment_method: localStorage.getItem("paymentMethod"),

    cart_items: JSON.parse(localStorage.getItem("products")),
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/address");
    }
  }, [userInfo, navigate]);
  let myProducts = JSON.parse(localStorage.getItem("products"));

  let subtotal = 0;
  myProducts.map((myProduct) => {
    subtotal += myProduct.price * myProduct.count;
  });
  const [totalorders, setTotalOrders] = useState();

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await Axios.post(
        "/api/orders/order",
        {
          orderItems: cart.cart_items,
          shippingAddress: cart.shipping_address,
          paymentMethod: cart.payment_method,
          itemsPrice: subtotal,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.data.token}`,
          },
        }
      );
      setTotalOrders(totalorders + 1);
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("products");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
    orderUpdateHandler();
  };

  const orderUpdateHandler = async () => {
    try {
      await axios.put(
        "/api/users/updateprofileorder",
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.data.token}` },
        }
      );
      toast.success("added to order list");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="cartpage">
      <Helmet>
        <title>place order</title>
      </Helmet>

      <div className="cartpage__cover"></div>
      <div className="cartpage__container container">
        <h1 className="my-5">{t("Place Order")}</h1>

        <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>

        <div className="cartpage__container__row row">
          <div className="cartpage__container__row__left col-lg-9">
            <div className="cartpage__container__row__left__address">
              <h6> {t("Delivery")} </h6>
              <p>
                <span>{t("Name:")}</span>
                {cart.shipping_address.fullName}
              </p>
              <p>
                <span>{t("Address:")}</span>
                {cart.shipping_address.address}
              </p>
            </div>
            <div className="cartpage__container__row__left__payment">
              <h6>{t("Payment")}</h6>
              <p>
                <span>{t("Method:")}</span>
                {cart.payment_method}
              </p>
            </div>
            <div className="cartpage__container__row__left__items">
              <h6>{t("Items")}</h6>
              {myProducts &&
                myProducts.map((myProduct) => {
                  return (
                    <div key={myProduct._id} className="item__row row">
                      <div className="item__row__image col-2">
                        <img src={myProduct.image} alt="" />
                      </div>
                      <div className="item__row__title col-4">
                        <span>{myProduct.name}</span>
                      </div>
                      <div className="item__row__price col-3">
                        <span>{myProduct.price} AZN</span>
                      </div>
                      <div className="item__row__count col-3">
                        <span>{myProduct.count}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="cartpage__container__row__right col-lg-3">
            <span className="total__price">
              {t("Total price")}: <span>{subtotal} AZN</span>
            </span>
            <hr />
            <button
              disabled={myProducts.length === 0}
              onClick={placeOrderHandler}
              className="checkout__btn"
            >
              {t("Place Order")}
            </button>

            <hr />
          </div>
          {loading && <LoadingBox></LoadingBox>}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
