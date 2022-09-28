import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import "./dashproducts.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getError } from "../utils";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
}

const DashProductsScreen = () => {
  const [deletedProds, setDeletedProds] = useState();

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const resp = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: resp.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    getProduct();
  }, [deletedProds]);

  // const deleteHandler = async () => {
  //   const { data } = await axios.delete(`/api/products/delete/${id}`);
  // };

  const deleteHandler = async (e) => {
    const resp = await axios
      .delete(`/api/products/delete/${e}`)
      .then((resp) => setDeletedProds(resp.data))
      .then(() => toast.success("Product deleted successfully"))
      .catch(() => toast.error("try again later"));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div className="dashproductscreen">
      <div className="dashproductscreen__container container">
        <Table
          className="dashproductscreen__container__table"
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
          <tbody className="dashproductscreen__container__table__tbody">
            {products &&
              products.map((product) => {
                return (
                  <tr>
                    <td>
                      <img src={product.image} alt="" />
                    </td>

                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.countInStock}</td>
                    <td className="btns__td">
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="btn danger"
                      >
                        delete
                      </button>
                      <br />
                      <button
                        onClick={() => {
                          navigate(`/product/id/${product._id}`);
                        }}
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
        <button
          onClick={() => navigate("/admin/addproduct")}
          className="add__products"
        >
          add new Product & products
        </button>
      </div>
    </div>
  );
};

export default DashProductsScreen;
