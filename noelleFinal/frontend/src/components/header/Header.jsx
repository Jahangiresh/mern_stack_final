import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import ip from "../images/logoWHITE.png";

import Menuslider from "../Menuslider";
import "./header.scss";
import { useState } from "react";
import Cartmodal from "../Cartmodal";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

const Header = ({ count, setCount, setrerender, rerender, userinfo }) => {
  let LOCALproducts = JSON.parse(localStorage.getItem("products"));

  // const [Slider, setSlider] = useState(false);
  const [Modal, setModal] = useState(false);

  // const menuSliderHandler = (e) => {
  //   setSlider((value) => !value);

  //   Slider
  //     ? e.target.classList.remove("plusIconActive")
  //     : e.target.classList.add("plusIconActive");
  // };

  const signOutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("address");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <>
      <div className="header__upper">
        <div className="header__marquee__dom col-6">
          <marquee className="header__upper__p" behavior="" direction="">
            FREE SHIPPING ON ORDERS OVER $40. PLUS FREE REWARDS EVERY TIME YOU
            SHOP WHEN YOU JOIN V76 FAN REWARDS.
          </marquee>
        </div>
      </div>
      <div className="header">
        <div className="header__lower">
          <div className="header__lower__container container">
            <div className="header__lower__container__row row">
              <div className="reversing__row col-9 d-flex">
                <div className="header__lower__container__row__left col-lg-4 col-8">
                  <div className="header__lower__container__row__left__logo">
                    <img
                      src="https://cdn.pixabay.com/photo/2016/11/25/07/00/diamond-1857733_1280.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="header__lower__container__row__center col-lg-8 col-4  ">
                  <ul className="header__lower__container__row__center__ul d-lg-flex d-none ">
                    <li>
                      <Link className="navs__link" to="/">
                        home
                      </Link>
                    </li>
                    <li>
                      <Link className="navs__link" to="/about">
                        about us
                      </Link>
                    </li>
                    <li>
                      <Link className="navs__link shop__li" to="/shop">
                        shop
                        <div className="shop__hover">
                          <ul className="shop__hover__ul">
                            <li className="shop__hover__ul__li">shop all</li>
                            <li className="shop__hover__ul__li">hair care</li>
                            <li className="shop__hover__ul__li">face&body</li>
                            <li className="shop__hover__ul__li">
                              new products
                            </li>
                          </ul>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link className="navs__link" to="/blog">
                        blog
                      </Link>
                    </li>
                    <li>
                      <Link className="navs__link" to="/contact">
                        contact
                      </Link>
                    </li>
                  </ul>
                  <ul className="center__menu  d-lg-none d-flex ">
                    <li className="plus d-lg-none d-block">
                      {/* <GiHamburgerMenu
                        className="plusIcon"
                        onClick={menuSliderHandler}
                      /> */}
                      <Menuslider />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header__lower__container__row__right col-3">
                <ul className="header__lower__container__row__right__ul">
                  {userinfo ? (
                    <NavDropdown
                      className="sing__name"
                      title={userinfo.data.name}
                      id="basic-nav-dropdown"
                    >
                      <Link
                        className="profile__links"
                        id="RouterNavLink"
                        to="/profile"
                      >
                        User Profile
                      </Link>{" "}
                      <br />
                      <Link
                        className="profile__links"
                        id="RouterNavLink"
                        to="/orderhistory"
                      >
                        Order History
                      </Link>
                      <NavDropdown.Divider />
                      {userinfo && userinfo.data.isAdmin && (
                        <>
                          <li>
                            <Link
                              className="profile__links"
                              id="RouterNavLink"
                              to="/admin/dashboard"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="profile__links"
                              id="RouterNavLink"
                              to="/admin/productlist"
                            >
                              Products
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="profile__links"
                              id="RouterNavLink"
                              to="/admin/orderlist"
                            >
                              Orders
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="profile__links"
                              id="RouterNavLink"
                              to="/admin/userlist"
                            >
                              Users
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="profile__links"
                              id="RouterNavLink"
                              to="/admin/employeelist"
                            >
                              Employees
                            </Link>
                          </li>
                        </>
                      )}
                      <li>
                        <Link
                          id="RouterNavLink"
                          to="#signout"
                          onClick={signOutHandler}
                          className="profile__links"
                        >
                          sign out
                        </Link>
                      </li>
                    </NavDropdown>
                  ) : (
                    <li className="d-lg-block d-none ">
                      <Link
                        className="sing__links d-lg-block account__link "
                        to="/signin"
                      >
                        Account
                      </Link>
                    </li>
                  )}

                  <li className="cart m-0">
                    <Cartmodal
                      modalproops={Modal}
                      count={count}
                      setcount={setCount}
                      setrerender={setrerender}
                      rerender={rerender}
                    />

                    {LOCALproducts && LOCALproducts.length > 0 ? (
                      <span className="cart__count">
                        {LOCALproducts.length}
                      </span>
                    ) : null}
                  </li>
                  {/* <li className="plus d-lg-none d-md-none">
                    <AiOutlinePlus
                      className="plusIcon"
                      onClick={menuSliderHandler}
                    />
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="upper__header">
        <div className="upper__header__row row">
          <div className="upper__header__row__left col-5"></div>
          <div className="upper__header__row__interP col-2">
            <img src={ip} alt="inpng" />
          </div>
          <div className="upper__header__row__right col-5"></div>
        </div>
      </div> */}

      {/* <div className="header">
        <div className="header__container container">
          <div className="header__container__row row">
            <div className="header__container__row__navs col-6   ">
              <ul className="header__container__row__navs__ul">
                <li>
                  <Link className="navs__link" to="/">
                    home
                  </Link>
                </li>
                <li>
                  <Link className="navs__link" to="/about">
                    about us
                  </Link>
                </li>
                <li>
                  <Link className="navs__link" to="/shop">
                    shop
                  </Link>
                </li>
                <li>
                  <Link className="navs__link" to="/blog">
                    blog
                  </Link>
                </li>
                <li>
                  <Link className="navs__link" to="/contact">
                    contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="header__container__row__right col-6">
              <ul>
                {userinfo ? (
                  <NavDropdown
                    className="sing__name"
                    title={userinfo.data.name}
                    id="basic-nav-dropdown"
                  >
                    <Link id="RouterNavLink" to="/profile">
                      User Profile
                    </Link>{" "}
                    <br />
                    <Link id="RouterNavLink" to="/orderhistory">
                      Order History
                    </Link>
                    <NavDropdown.Divider />
                    <li>
                      <Link
                        id="RouterNavLink"
                        to="#signout"
                        onClick={signOutHandler}
                      >
                        sign out
                      </Link>
                    </li>
                  </NavDropdown>
                ) : (
                  <li>
                    <Link className="sing__links " to="/signin">
                      signin <FiLogIn />
                    </Link>
                  </li>
                )}
                {userinfo && userinfo.data.isAdmin && (
                  <NavDropdown
                    className="admin__drop "
                    title="Admin"
                    id="admin-nav-dropdown"
                  >
                    <li>
                      <Link id="RouterNavLink" to="/admin/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link id="RouterNavLink" to="/admin/productlist">
                        Products
                      </Link>
                    </li>

                    <li>
                      <Link id="RouterNavLink" to="/admin/orderlist">
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link id="RouterNavLink" to="/admin/userlist">
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link id="RouterNavLink" to="/admin/employeelist">
                        Employees
                      </Link>
                    </li>
                  </NavDropdown>
                )}

                <li className="cart m-0">
                  <Cartmodal
                    modalproops={Modal}
                    count={count}
                    setcount={setCount}
                    setrerender={setrerender}
                    rerender={rerender}
                  />

                  {LOCALproducts && LOCALproducts.length > 0 ? (
                    <span className="cart__count">{LOCALproducts.length}</span>
                  ) : null}
                </li>
                <li className="plus d-lg-none d-md-none">
                  <AiOutlinePlus
                    className="plusIcon"
                    onClick={menuSliderHandler}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Header;
