import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import Table from "react-bootstrap/esm/Table";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
    case "fetch_request":
      return { ...state, loading: true, error: "" };
    case "fetch_success":
      return { ...state, loading: false, error: "", orders: action.payload };
    case "fetch_fail":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const DashOrdersScreen = () => {
  const navigate = useNavigate();
  const [{ orders, loading, error }, dispatch] = useReducer(reducer, {
    orders: [],
    loading: true,
    error: "",
  });
  const [deletedOrders, setDeletedOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      try {
        dispatch({ type: "fetch_request" });
        const resp = await axios.get("/api/orders/");
        dispatch({ type: "fetch_success", payload: resp.data });
      } catch (error) {
        dispatch({ type: "fetch_fail", payload: getError(error) });
      }
    };
    getOrders();
  }, [deletedOrders]);

  const deleteHandler = async (e) => {
    try {
      const del = await axios.delete(`/api/orders/delete/${e}`);
      setDeletedOrders(del);
      toast.success("order deleted");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="dashorderscreen">
      <div className="dashorderscreen__container container">
        <Table
          className="dashorderscreen__container__table"
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody className="dashorderscreen__container__table__tbody">
            {orders &&
              orders.map((order) => {
                return (
                  <tr>
                    <td>{order.createdAt.slice(0, 10)}</td>
                    <td>{order.itemsPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <span className="text-success">PAID</span>
                      ) : (
                        <span className="text-danger">NOT PAID</span>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <span className="text-success">DELIVERED</span>
                      ) : (
                        <span className="text-danger">NOT DELIVERED</span>
                      )}
                    </td>
                    <td>{order.shippingAddress.fullName}</td>
                    <td>{order.shippingAddress.country}</td>

                    <td className="btns__td">
                      <button
                        onClick={() => deleteHandler(order._id)}
                        className="btn danger"
                      >
                        delete
                      </button>
                      <br />
                      <button
                        onClick={() => navigate(`/order/details/${order._id}`)}
                        className="btn danger"
                      >
                        edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DashOrdersScreen;
