import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import "./dashboardscreen.scss";
function reducer(state, action) {
  switch (action.type) {
    case "fetch_req":
      return { ...state, loading: true, error: "" };

    case "income_success":
      return {
        ...state,
        loading: false,
        error: "",
        totalIncome: action.payload,
      };
    case "order_success":
      return {
        ...state,
        loading: false,
        error: "",
        totalOrders: action.payload,
      };
    case "addCart_success":
      return {
        ...state,
        loading: false,
        error: "",
        totalAddToCart: action.payload,
      };
    case "user_success":
      return {
        ...state,
        loading: false,
        error: "",
        totalUsers: action.payload,
      };
    case "fetch_fail":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const DashboardScreen = () => {
  const [
    { loading, error, totalIncome, totalOrders, totalAddToCart, totalUsers },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
    totalIncome: 0,
    totalOrders: 0,
    totalAddToCart: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch({ type: "fetch_req" });
        const resp = await axios.get("/api/users");
        console.log(resp.data);
        const spend = resp.data.map((user) => {
          return user.totalSpend;
        });
        dispatch({ type: "user_success", payload: spend.length });

        const total_spend = spend.reduce(
          (previousValue, currentValue, index) => previousValue + currentValue,
          0
        );
        dispatch({ type: "income_success", payload: total_spend });

        const order = resp.data.map((user) => {
          return user.totalOrders;
        });
        const total_order = order.reduce(
          (previousValue, currentValue, index) => previousValue + currentValue,
          0
        );
        dispatch({ type: "order_success", payload: total_order });

        const cart = resp.data.map((user) => {
          return user.totalAddToCart;
        });

        const total_cart = cart.reduce(
          (previousValue, currentValue, index) => previousValue + currentValue,
          0
        );
        dispatch({ type: "addCart_success", payload: total_cart });
      } catch (err) {
        dispatch({ type: "fetch_fail", payload: getError(err) });
      }
    };
    getUser();
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox></MessageBox>
  ) : (
    <div className="dashboard">
      <div className="dashboard__container container">
        <div className="dashboard__container__row row">
          <div className="dashboard__container__row__col col-lg-6 col-12">
            <div className="dashboard__container__row__col__card card">
              total income: {totalIncome}
            </div>
          </div>
          <div className="dashboard__container__row__col col-lg-6 col-12">
            <div className="dashboard__container__row__col__card card">
              total orders : {totalOrders}
            </div>
          </div>

          <div className="dashboard__container__row__col col-lg-6 col-12">
            <div className="dashboard__container__row__col__card card">
              total users :{totalUsers}
            </div>
          </div>
          <div className="dashboard__container__row__col col-lg-6 col-12">
            <div className="dashboard__container__row__col__card card">
              total add to cart:{totalAddToCart}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
