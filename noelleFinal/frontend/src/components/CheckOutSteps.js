import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./checkoutsteps.scss";
import { useTranslation } from "react-i18next";

export default function CheckOutSteps(props) {
  const { t } = useTranslation();

  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>{t("SIGN IN")}</Col>
      <Col className={props.step2 ? "active" : ""}>{t("Shipping")}</Col>
      <Col className={props.step3 ? "active" : ""}>{t("Payment")}</Col>
      <Col className={props.step4 ? "active" : ""}>{t("Place Order")}</Col>
    </Row>
  );
}
