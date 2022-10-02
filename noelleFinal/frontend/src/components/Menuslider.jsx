import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import "../components/menuslider.scss";

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <GiHamburgerMenu
        style={{ color: "white", fontSize: "25px" }}
        onClick={handleShow}
        ClassName="hamburger__menu"
      />
      <Offcanvas
        style={{ backgroundColor: "#000" }}
        show={show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h5>stay with us</h5>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="menu__ul">
            <li className="menu__ul__li">
              <Link className="menu__links" to="/">
                home
              </Link>
            </li>
            <li className="menu__ul__li">
              <Link className="menu__links" to="/about">
                about us
              </Link>
            </li>
            <li className="menu__ul__li">
              <Link className="menu__links" to="/shop">
                shop
              </Link>
            </li>
            <li className="menu__ul__li">
              <Link className="menu__links" to="/blog">
                blog
              </Link>
            </li>
            <li className="menu__ul__li">
              <Link className="menu__links" to="/contact">
                contact
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function Example() {
  return (
    <>
      {["start"].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}
