import React, { useEffect } from "react";

import Menuslider from "../Menuslider";
import "./header.scss";
import Cartmodal from "../Cartmodal";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { useReducer } from "react";
import { useTranslation } from "react-i18next";
import HeaderLangs from "./HeaderLangs";
const Header = ({ count, setCount, setrerender, rerender, userinfo }) => {
  let LOCALproducts = JSON.parse(localStorage.getItem("products"));
  const signOutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("address");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  const { t, i18n } = useTranslation();

  function clickLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <>
      <div className="header__upper">
        <div className="header__marquee__dom col-6">
          <marquee className="header__upper__p" behavior="" direction="">
            {t("FREE SHIPPING ON ORDERS OVER $40")}
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
                        {t("HOME")}
                      </Link>
                    </li>
                    <li>
                      <Link className="navs__link" to="/about">
                        {t("ABOUT US")}
                      </Link>
                    </li>
                    <li>
                      <Link className="navs__link shop__li" to="/shop">
                        {t("SHOP")}

                        <div className="shop__hover">
                          <ul className="shop__hover__ul">
                            <li className="shop__hover__ul__li">
                              {t("SHOP ALL")}
                            </li>
                            <li className="shop__hover__ul__li">
                              {t("HAİR CARE")}
                            </li>
                            <li className="shop__hover__ul__li">
                              {t("FACE&BODY")}
                            </li>
                            <li className="shop__hover__ul__li">
                              {t("NEW PRODUCTS")}
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
                        {t("CONTACT")}
                      </Link>
                    </li>
                  </ul>
                  <ul className="center__menu  d-lg-none d-flex ">
                    <li className="plus d-lg-none d-block">
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
                        {t("USER PROFILE")}
                      </Link>{" "}
                      <br />
                      <Link
                        className="profile__links"
                        id="RouterNavLink"
                        to="/orderhistory"
                      >
                        {t("ORDER HISTORY")}
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
                              {t("PRODUCTS")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="profile__links"
                              id="RouterNavLink"
                              to="/admin/orderlist"
                            >
                              {t("ORDERS")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="profile__links"
                              id="RouterNavLink"
                              to="/admin/userlist"
                            >
                              {t("USERS")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="profile__links"
                              id="RouterNavLink"
                              to="/admin/employeelist"
                            >
                              {t("EMPLOYEES")}
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
                          {t("SIGN OUT")}
                        </Link>
                      </li>
                    </NavDropdown>
                  ) : (
                    <li className="d-lg-block d-none ">
                      <Link
                        className="sing__links d-lg-block account__link "
                        to="/signin"
                      >
                        {t("Account")}
                      </Link>
                    </li>
                  )}

                  <li className="cart m-0">
                    <Cartmodal
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
                  <li>
                    <HeaderLangs />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
