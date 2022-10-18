import React from "react";
import "./latestposts.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Latestposts = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="latestposts ">
      <div className="latestposts__container container">
        <div className="latestposts__container__title row">
          <p className="p-0">{t("beauty news and posts")}</p>
          <h2 className="p-0">{t("latest posts & updates")}</h2>
        </div>
        <div className="latestposts__container__posts row">
          <div className="latestposts__container__posts__col col-lg-4 col-md-6 col-12">
            <div className="post__title">
              <h2>
                {t("Look younger,")}
                <br />
                {t("longer")}
              </h2>
              <p>{t("September")} 25,2019</p>
              <span>
                <Link className="link" to="/blog/details">
                  {t("view more")}
                </Link>
              </span>
            </div>
          </div>
          <div className="latestposts__container__posts__col2 col-lg-4 col-md-6 col-12">
            <div className="post__title">
              <h2>
                {t("Look younger,")}
                <br />
                {t("longer")}
              </h2>
              <p>{t("September")} 25,2019</p>
              <span>
                <Link className="link" to="/blog/details">
                  {t("view more")}
                </Link>
              </span>
            </div>
          </div>
          <div className="latestposts__container__posts__col3 col-lg-4 col-md-6 col-12">
            <div className="post__title">
              <h2>
                {t("Look younger,")}
                <br />
                {t("longer")}
              </h2>
              <p>{t("September")} 25,2019</p>
              <span>
                <Link className="link" to="/blog/details">
                  {t("view more")}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latestposts;
