import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BsBag } from "react-icons/bs";

import { useState, useEffect } from "react";
import "./cartmodal.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ count, setrerender, rerender }) {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [products, setProduct] = useState([]);

  let totalPrice = 0;

  products.forEach((product) => {
    let priceNum = Number(product.price);
    totalPrice += priceNum * product.count;
    setrerender(!product.reRender);
  });

  //-----------------------------------------------------------bu kod performansi oldurur
  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem("products")));
  }, [rerender]);
  //-----------------------------------------------------------bu kod performansi oldurur

  const removeProductHandler = (e) => {
    let newproducts = products && products.filter((z) => z._id !== e);
    localStorage.setItem("products", JSON.stringify(newproducts));
    setProduct(JSON.parse(localStorage.getItem("products")));
    setrerender(!e.reRender);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <BsBag className="cart__icon" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="modal__header row">
              <div className="modal__header__logo">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/25/07/00/diamond-1857733_1280.png"
                  alt="logo jpg"
                />
              </div>
            </div>
            <div className="modal__body">
              {products.map((p) => {
                return (
                  <div key={p._id} className="modal__body__product row">
                    <div className="modal__body__product__image col-3">
                      <img src={p.image} alt="" />
                    </div>
                    <div className="modal__body__product__title col-6">
                      <h2>{p.name}</h2>
                      <p>{p.price}</p>
                      <span onClick={() => removeProductHandler(p._id)}>
                        {t("remove")}
                      </span>
                      <span className="d-none">{p._id}</span>
                    </div>
                    <div className="modal__body__product__count col-lg-3 d-md-3 col-6">
                      <input type="number" defaultValue={p.count} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="modal__footer">
              <div className="modal__footer__total ">
                <span className="subtotal">{t("Subtotal")}</span>
                <span className="total__price">${totalPrice} USD</span>
              </div>
            </div>
          </Typography>
          <Link
            onClick={handleClose}
            className="cartmodal__link"
            to="/cartpage"
          >
            {t("Buy now")}
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
