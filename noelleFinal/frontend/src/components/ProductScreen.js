import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logger from "use-reducer-logger";
import { useReducer } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "./productscreen.scss";
import Rating from "./Rating";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { getError } from "../utils";
import { useRef } from "react";

import Box from "@mui/material/Box";
import Stars from "@mui/material/Rating";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";
import { toast } from "react-toastify";

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

function ProductScreen({ setcount, setrerender }) {
  const [value, setValue] = useState(2);
  const navigate = useNavigate();

  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  const [comment, setComment] = useState();

  console.log(product.comments);
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const resp = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: resp.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    getProduct();
  }, [slug]);

  let productCount = useRef(0);

  const addToLocal = (product) => {
    let products = JSON.parse(localStorage.getItem("products"));
    let _id = product._id;
    let existedProd = products.find((x) => x._id === _id);

    if (product.countInStock < product.count) {
      window.alert("sorry this product is out of stock");
      return;
    } else if (!existedProd) {
      product.count = productCount.current.value;
      products.push(product);
    } else {
      // products.splice(products.indexOf(existedProd), 1); --delete prod
      existedProd.count = productCount.current.value;
    }

    setcount(products.length);

    localStorage.setItem("products", JSON.stringify(products));
    setrerender((value) => !value);
    // navigate(`/cartpage`);
  };

  const buyHandler = (product) => {
    let products = JSON.parse(localStorage.getItem("products"));
    let _id = product._id;
    let existedProd = products.find((x) => x._id === _id);

    if (product.countInStock < product.count) {
      window.alert("sorry this product is out of stock");
      return;
    } else if (!existedProd) {
      product.count = productCount.current.value;
      products.push(product);
    } else {
      // products.splice(products.indexOf(existedProd), 1); --delete prod
      existedProd.count = productCount.current.value;
    }

    setcount(products.length);

    localStorage.setItem("products", JSON.stringify(products));
    setrerender((value) => !value);
    navigate(`/cartpage`);
  };
  const commentHandler = async () => {
    try {
      await axios.put(`/api/products/comment/${slug}`, {
        comments: comment,
      });
      toast.success("comment added");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return loading ? (
    <div>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="product">
      <div className="product__container container">
        <div className="product__container__row row">
          <div className="product__container__row__left col-6">
            <div className="product__container__row__left__image">
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className="product__container__row__right col-6">
            <div className="product__container__row__right__content">
              <div className="product__container__row__right__content__title">
                <h1>{product.name}</h1>
                <span>{product.price} AZN</span>
              </div>
              <div className="product__container__row__right__content__counter">
                <div className="product__container__row__right__content__counter__inputs">
                  <span
                    onClick={(e) => {
                      e.target.nextSibling.value--;
                    }}
                  >
                    -
                  </span>
                  <input
                    ref={productCount}
                    className="productCount"
                    type="number"
                    name=""
                    defaultValue={1}
                    id=""
                  />{" "}
                  <span
                    onClick={(e) => {
                      e.target.previousElementSibling.value++;
                    }}
                  >
                    +
                  </span>
                </div>

                <button
                  onClick={() => addToLocal(product)}
                  className="product__container__row__right__content__counter__button"
                >
                  Add to cart
                </button>
              </div>
              <button
                onClick={() => buyHandler(product)}
                className="buy__it__now"
              >
                buy it now
              </button>
            </div>
            <hr />
            <div className="product__container__row__right__content__acc">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: "text.secondary" }}>
                    Description
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{product.desc}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography sx={{ color: "text.secondary" }}>
                    substance
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{product.substance}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography sx={{ color: "text.secondary" }}>
                    Instruction
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{product.instruction}</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <hr />
            <div className="product__container__row__right__reviews">
              <h2>
                Costumer reviews:
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </h2>
              {product.comments.length > 0 ? (
                product.comments.map((p) => {
                  return (
                    <div className="review__comments">
                      <div className="costumer__comment">
                        <p>Jahangir Shirinov:</p>
                        <span>12 may, 1992</span>
                        <hr />

                        {p}
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2>no reviews</h2>
              )}
            </div>
            <Accordion
              className="comment__accordion"
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ color: "text.secondary" }}>
                  <h2 className="h2__comment">Write a review</h2>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <input
                  onChange={(e) => setComment(e.target.value)}
                  className="comment__text w-100 py-3"
                  type="text"
                />
                <button
                  className="add__comment"
                  onClick={() => commentHandler()}
                >
                  add comment
                </button>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
