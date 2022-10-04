import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useReducer } from "react";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "./editproduct.scss";

import * as React from "react";
import Switch from "@mui/material/Switch";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function EditProductScreen() {
  const params = useParams();
  const { id } = params;
  const [checked, setChecked] = React.useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const resp = await axios.get(`/api/products/id/${id}`);

        dispatch({ type: "FETCH_SUCCESS", payload: resp.data });
        setChecked(resp.data.isTrending);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    getProduct();
  }, [id]);
  const [name, setName] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/products/update/${id}`, {
        name,
        countInStock,
        price,
        isTrending: checked,
      });
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Product updated successfully");
      navigate("/admin/productlist");
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getError(err));
    }
  };

  return loading ? (
    <div>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="editproductscreen">
      <div className="editproductscreen__container container">
        <form className=" upd__inp" onSubmit={submitHandler}>
          <div className="editproductscreen__container__imageBox">
            <img src={product.image} alt="" />
          </div>
          <Form.Group className="mb-3 upd__inp " controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="field__inp__update"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              className="field__inp__update"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className="field__inp__update"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <span>
            make{" "}
            <abbr title="this section allows product to be in main page among all new trending products">
              trend
            </abbr>
          </span>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <div className="mb-3">
            <button className="upd__btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductScreen;
