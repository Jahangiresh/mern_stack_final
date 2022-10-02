import React from "react";
import "./features.scss";
import Aos from "aos";
import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import "aos/dist/aos.css";
const Features = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="features col-lg-4 col-md-6 col-12"
      >
        <span className="span__stars" style={{ color: "#00674a" }}>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </span>
        <h3>Good Quality Paste</h3>
        <p>
          Have been using this for over a year now, easily my favorite molding
          paste out there. Offers a great hold that still has flexibility.
          Doesn’t feel awful and crusty like some pastes in your hair. Not
          entirely scentless but the little bit it does have is not off putting
          at all. Would highly recommend to anyone looking for a natural finish
          paste.
        </p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="features col-lg-4 col-md-6 col-12"
      >
        <span className="span__stars" style={{ color: "#00674a" }}>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </span>
        <h3>Great Effect</h3>
        <p>
          Great scent and an excellent effect. Skin felt softer after than with
          normal foam cream.
        </p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="features col-lg-4 col-md-6 col-12"
      >
        <span className="span__stars" style={{ color: "#00674a" }}>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </span>
        <h3>Very happy with this shampoo</h3>
        <p>
          I've been using this shampoo for a few weeks now and am very happy
          with it. It leaves my hair feeling clean and soft and since it's
          sulfate free, it's gentle on my hair. Overall, this is exactly what I
          was looking for. A nice, gentle shampoo that leaves my hair soft and
          clean.
        </p>
      </div>
    </>
  );
};

export default Features;
