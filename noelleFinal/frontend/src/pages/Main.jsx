import React from "react";
import "./main.scss";
import { useEffect, useRef } from "react";
import Aos from "aos";
import { Link, useNavigate } from "react-router-dom";
import "aos/dist/aos.css";

import { useState } from "react";
import axios from "axios";
import Features from "../components/Features";
import Latestposts from "../components/Latestposts";
import Rating from "../components/Rating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useReducer } from "react";
import { Helmet } from "react-helmet-async";
import logger from "use-reducer-logger";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Main = ({ setcount, setrerender }) => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const resp = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: resp.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      // setProducts(resp.data);
    };
    getProduct();
  }, []);

  const cover = useRef();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  //local start
  const addToLocal = (p) => {
    // navigate(0);
    let products = JSON.parse(localStorage.getItem("products"));
    let _id = p._id;
    let existedProd = products.find((x) => x._id === _id);

    if (!existedProd) {
      products.push(p);
    } else {
      // products.splice(products.indexOf(existedProd), 1); --delete prod
      existedProd.count++;
    }
    setrerender((value) => !value);
    setcount(products.length);
    localStorage.setItem("products", JSON.stringify(products));
  };

  //local end
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <>
      <Helmet>
        <title>Shibumi</title>
      </Helmet>
      <div className="main">
        <div className="main__cover">
          <div className="main__cover__container container">
            <div className="main__cover__container__content">
              <h1>
                WHAT IT MEANS <br />
                TO BE WELL-GROOMED
              </h1>
              <p>
                Being well-groomed goes beyond a great cut or great style. Learn
                how V76 can help.
              </p>
              <button onClick={() => navigate("/contact")}>FIND US</button>
            </div>
          </div>
        </div>
        <div className="main__bestsellers">
          <div className="main__bestsellers__container container">
            <div className="main__bestsellers__container__row row">
              <h2>
                <Link className="bestsellers__link" to="/shop">
                  best sellers
                </Link>
              </h2>
            </div>
            <div className="main__bestsellers__container__products row">
              <Slider {...settings}>
                {loading ? (
                  <div>
                    <LoadingBox />
                  </div>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  products &&
                  products.map((p) => {
                    if (p.isTrending === true) {
                      return (
                        <div
                          key={p._id}
                          className="product col-lg-4 col-md-6 col-12"
                        >
                          <div
                            onClick={() => {
                              navigate(`/product/${p.slug}`);
                            }}
                            className="product__content"
                          >
                            <div className="product__content__image">
                              <img src={p.image} alt="" />
                            </div>
                            <div className="product__content__title">
                              <span className="title__span">{p.name}</span>
                              <br />
                              <span className="money__span">{p.price}AZN</span>
                            </div>
                          </div>

                          {p.countInStock === 0 ? (
                            <button className="add__cart">out of stock</button>
                          ) : (
                            <button
                              onClick={() => addToLocal(p)}
                              className="add__cart"
                            >
                              add to card
                            </button>
                          )}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })
                )}
              </Slider>
            </div>
          </div>
        </div>
        <div className="main__video">
          <video
            autoPlay
            muted
            loop
            className="myVideo"
            src="https://dl.dropboxusercontent.com/s/b67dq8r1f86tqcs/full%20spectrum%20wave%20loop.mp4"
          ></video>
        </div>
        <div className="main__container container">
          <div className="main__container__row row">
            <Features />
          </div>
          <div className="main__container__posts row">
            <div className="post__1 col-lg-6 col-md-6 col-12 post">
              <h2 onClick={() => navigate("/blog")}>
                NATURAL SOLUTIONS.SOFT SKIN
              </h2>
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
            <div className="post__2 col-lg-6 col-md-6 col-12 post">
              <h2 onClick={() => navigate("/about")}>
                CLASSIC.RELAX & ATTRACT
              </h2>
              <img
                src="https://images.unsplash.com/photo-1599022509786-23794c1b68c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1114&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="main__join">
          <div className="main__join__content">
            <h1>JOIN AS A PROFESSIONAL</h1>
            {userInfo ? (
              <button onClick={() => navigate("/about")} className="join__btn">
                ABOUT OUR COMPANY
              </button>
            ) : (
              <button onClick={() => navigate("/signup")} className="join__btn">
                JOIN NOW
              </button>
            )}
          </div>

          <img
            src="https://cdn.shopify.com/s/files/1/0524/7067/7685/files/Barber_1950x.jpg?v=1613739800"
            alt=""
          />
        </div>
        <div className="main__latest">
          <Latestposts />
        </div>
      </div>
    </>
  );
};

export default Main;
