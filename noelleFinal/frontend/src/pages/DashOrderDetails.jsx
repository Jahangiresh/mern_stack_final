import axios from "axios";
import React, { useReducer } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { getError } from "../utils";
import "./dashorderdetails.scss";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "fetch_request":
      return { ...state, loading: true, error: "" };
    case "fetch_success":
      return { ...state, loading: false, order: action.payload };
    case "fetch_fail":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const DashOrderDetails = () => {
  const [{ order, loading, error }, dispatch] = useReducer(reducer, {
    order: {},
    loading: true,
    error: "",
  });
  // const userInfo
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getOrder = async () => {
      try {
        dispatch({ type: "fetch_request" });
        const resp = await axios.get(`/api/orders/details/${id}`);
        dispatch({ type: "fetch_success", payload: resp.data });
      } catch (err) {
        dispatch({ type: "fetch_fail", payload: getError(err) });
      }
    };
    getOrder();
  }, [id]);

  const updateHandler = async () => {
    console.log(id);
    try {
      await axios.put(
        `/api/orders/update/${id}`,
        {
          // isDelivered: true,
        }
        // {
        //   headers: { Authorization: `Bearer ${userInfo.data.token}` },
        // }
      );
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div className="dashorderdetails">
      <div className="dashorderdetails__container container">
        <h4 className="my-3">Order Id: {order._id}</h4>
        <div className="dashorderdetails__container__products row">
          <div className="dashorderdetails__container__products__col col-6">
            <span>items:</span>
            <div className="dashorderdetails__container__products__col__card card">
              <Table
                className="dashorderdetails__container__products__col__card__table m-0"
                striped
                bordered
                hover
              >
                <tbody className="dashorderdetails__container__products__col__card__table__tbody">
                  {order.orderItems &&
                    order.orderItems.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>
                            <div className="td__image">
                              <img src={item.image} alt="" />
                            </div>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.count}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="dashorderdetails__container__products__details col-6">
            <span>delivery:</span>
            <div className="dashorderdetails__container__products__details__card card">
              <Table
                className="dashorderdetails__container__products__col__card__table m-0"
                striped
                bordered
                hover
              >
                <tbody className="dashorderdetails__container__products__col__card__table__tbody">
                  <tr>
                    <td>full name:</td>

                    <td>{order.shippingAddress.fullName}</td>
                  </tr>
                  <tr>
                    <td>country:</td>

                    <td>{order.shippingAddress.country}</td>
                  </tr>
                  <tr>
                    <td>city:</td>

                    <td>{order.shippingAddress.city}</td>
                  </tr>
                  <tr>
                    <td>address:</td>

                    <td>{order.shippingAddress.address}</td>
                  </tr>
                  <tr>
                    <td>postal code:</td>

                    <td>{order.shippingAddress.postalCode}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <button onClick={() => updateHandler()} className="deliver__btn">
          start delivering proccess...
        </button>
      </div>
    </div>
  );
};

export default DashOrderDetails;
