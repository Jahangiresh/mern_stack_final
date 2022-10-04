import axios from "axios";
import React, { useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoadingBox from "../components/LoadingBox";

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

const DashAddProducts = () => {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [substance, setSubstance] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [instruction, setInstruction] = useState("");

  const createHandler = async () => {
    navigate("/admin/productlist");

    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post("/api/products", {
        name: name,
        slug: name + "-" + desc.slice(0, 1),
        image: image,
        brand: brand,
        category: category,
        desc: desc,
        price: price,
        countInStock: countInStock,
        isTrending: true,
        count: 1,
        instruction: instruction,
        substance: substance,
      });
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="dashaddproducts">
      <div className="dashaddproducts__container container">
        <form onSubmit={createHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Image</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Desc</Form.Label>
            <Form.Control
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Substance</Form.Label>
            <Form.Control
              value={substance}
              onChange={(e) => setSubstance(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="Number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="Number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Instruction</Form.Label>
            <Form.Control
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashAddProducts;
