import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import "./headerLangs.scss";
const HeaderLangs = () => {
  const { t, i18n } = useTranslation();

  function clickLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <NavDropdown
      title={<MdLanguage className="icon" />}
      className="lang__navs text-white"
    >
      <ul>
        <li className=" text-white" onClick={() => clickLang("en")}>
          en
        </li>
        <li className=" text-white" onClick={() => clickLang("az")}>
          {" "}
          az
        </li>
        <li className=" text-white" onClick={() => clickLang("tr")}>
          {" "}
          tr
        </li>
      </ul>
    </NavDropdown>
  );
};

export default HeaderLangs;
