import React from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../pages/adressscreen.scss";
import { useState } from "react";
import FormLabel from "react-bootstrap/esm/FormLabel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import { useTranslation } from "react-i18next";

const AdressScreen = () => {
  const { t } = useTranslation();

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/address");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "address",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div className="adress">
      <Helmet>
        <title>adress</title>
      </Helmet>
      <div className="adress__cover"></div>
      <div className="container small-container">
        <div className="h1__div">
          <h1>{t("Delievery Address")}</h1>
        </div>

        <CheckOutSteps step1 step2></CheckOutSteps>
        <Form onSubmit={submitHandler}>
          <FormLabel>{t("Full Name")}</FormLabel>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Control
              className="address__inp"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <FormLabel> {t("address")}</FormLabel>
          <Form.Group className="mb-3" controlId="address">
            <Form.Control
              className="address__inp"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <FormLabel> {t("city")}</FormLabel>

          <Form.Group className="mb-3" controlId="city">
            <Form.Control
              className="address__inp"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <FormLabel>{t("postal code")} </FormLabel>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Control
              className="address__inp"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <FormLabel>{t("country")}</FormLabel>
          <Form.Group className="mb-3" controlId="country">
            <Form.Control
              className="address__inp"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button className="address__btn" variant="primary" type="submit">
              {t("continue")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AdressScreen;
