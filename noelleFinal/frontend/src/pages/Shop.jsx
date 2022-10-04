import React from "react";
import "./shop.scss";

import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import Features from "../components/Features";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slick from "react-slick";
import TextField from "@mui/material/TextField";

function valuetext(value) {
  return `${value}°C`;
}
const Shop = ({ setcount, setrerender, rerender }) => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [uniqueCategories, setUniqueCategories] = useState();

  const [inp, setInp] = useState("");

  const [filteredByCategory, setFilteredByCategory] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const resp = await axios.get("/api/products");
      setProducts(resp.data);
      setFilteredByCategory(resp.data);
    };
    getProduct();
  }, []);

  const filterResult = (targetCategory) => {
    if (targetCategory === "all") {
      setProducts(filteredByCategory);
    } else {
      const result = filteredByCategory.filter((p) => {
        return p.category === targetCategory;
      });
      setProducts(result);
    }
  };

  //RANGE  SLIDER bashladi

  const [value, setValue] = React.useState([0, 100]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const resultPrice = filteredByCategory.filter((p) => {
      return p.price > newValue[0] && p.price < newValue[1];
    });
    setProducts(resultPrice);
  };

  //RANGE  SLIDER bitdi

  const ca = [];

  useEffect(() => {
    const categoryAdder = async () => {
      await products.forEach((p) => {
        ca.push(p.category);
        setCategories(ca);
      });
    };
    categoryAdder();
  }, [products]);

  useEffect(() => {
    let uniqueCa = [...new Set(categories)];
    setUniqueCategories(uniqueCa);
  }, [categories]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };
  return (
    <div className="shop">
      <Slick {...settings}>
        <div className="shop__cover"></div>
        <div className="shop__cover1"></div>

        <div className="shop__cover2"></div>
      </Slick>

      <div className="shop__container container">
        <div className="shop__container__title row">
          <h2 data-aos="fade-right" className="discover">
            Discover
          </h2>
          <h2 data-aos="fade-right" className="shibumi">
            Shibumi
          </h2>
        </div>

        <div className="shop__container__categories row">
          <h2>Filter</h2>

          <ul className="shop__container__categories__ul">
            <li onClick={() => filterResult("all")}>
              <div className="mask">All</div>
            </li>
            {uniqueCategories &&
              uniqueCategories.map((c) => {
                return (
                  <li key={c._id} onClick={() => filterResult(c)}>
                    <div className="mask">{c}</div>
                  </li>
                );
              })}
          </ul>
          <div className="priceslider">
            <span className="price__range">price range</span>
            <Box sx={{ width: 300 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Box>
            <div className="priceslider__values">
              <span className="price__span">min price:{value[0]}</span>
              <span className="price__span">max price:{value[1]}</span>
            </div>
          </div>
        </div>
        <div className="shop__container__search">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              // onChange={searchInputHandler}
              onChange={(e) => setInp(e.target.value)}
              className="search__input"
              id="outlined-search"
              label="Search product..."
              type="search"
            />
          </Box>
        </div>

        <div className="shop__container__products row">
          <Product
            setcount={setcount}
            category={filteredByCategory}
            inputvalue={inp}
            productslist={products}
            setrerender={setrerender}
            rerender={rerender}
          />
        </div>
        <div className="shop__container__features row">
          <Features />
        </div>
      </div>
    </div>
  );
};

export default Shop;
