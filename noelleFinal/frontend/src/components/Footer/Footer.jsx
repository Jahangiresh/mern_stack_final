import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { FooterContact } from "./FooterContact";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="footer">
      <div className="footer__container container">
        <div className="footer__container__row row">
          <div className="footer__container__row__col col-lg-3 col-12">
            <h3> {t("ABOUT US")}</h3>
            <ul>
              <li>
                <Link to="/about" className="footerlinks">
                  {t("ABOUT US")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footerlinks">
                  {t("BLOG")}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="footerlinks">
                  {t("SHOP")}
                </Link>
              </li>
              <li>
                <Link to="/signup" className="footerlinks">
                  {t("SIGN UP")}
                </Link>
              </li>
              <li>
                <Link to="/signin" className="footerlinks">
                  {t("SIGN IN")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__container__row__col col-lg-3 col-12">
            <h3> {t("SUPPORT")}</h3>
            <ul>
              <li>
                <Link to="/contact" className="footerlinks">
                  {t("CONTACT")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__container__row__col col-lg-3 col-12">
            <h3>{t("Social")}</h3>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/interpazarlama_az/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/interpazarlama_az/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__container__row__col col-lg-3 col-12">
            <h3>{t("Get connected now")}</h3>
            <p>
              {t(
                "Add more beauty to your messages! Join us to be the first to know about exclusive offers and exciting news."
              )}
            </p>

            <FooterContact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
