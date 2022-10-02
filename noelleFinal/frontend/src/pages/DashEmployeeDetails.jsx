import axios from "axios";
import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import "./dashuserdetails.scss";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", user: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const DashEmployeeDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [role, setRole] = useState();
  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    user: {},
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch({ type: "FETCH_REQUES" });
        const resp = await axios.get(`/api/users/employee/${id}`);

        dispatch({ type: "FETCH_SUCCESS", payload: resp.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    getUser();
  }, []);

  const adminHandler = async () => {
    try {
      await axios.put(`/api/users/employee/${id}`, {
        // isAdmin: false,
      });
      toast.success("admin removed");
      navigate(-1);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const roleHandler = async () => {
    try {
      await axios.put(`/api/users/employee/role/${id}`, {
        role: role,
      });
      toast.success("role added");
      navigate(-1);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div className="dashuserdetails">
      <div className="dashuserdetails__container container">
        <div className="dashuserdetails__container__imagebox row">
          <div className="dashuserdetails__container__imagebox__image">
            <img src={user.profilePic} alt="" />
          </div>
        </div>
        <div className="dashuserdetails__container__statistics row">
          <div className="dashuserdetails__container__statistics__cols col-4">
            <div className="dashuserdetails__container__statistics__cols__card card">
              <h4>Total spent:</h4>
              <h3>{user.totalSpend} USD</h3>
            </div>
          </div>
          <div className="dashuserdetails__container__statistics__cols col-4">
            <div className="dashuserdetails__container__statistics__cols__card card">
              <h4>Total add to cart:</h4>
              <h3>{user.totalAddToCart} times</h3>
            </div>
          </div>
          <div className="dashuserdetails__container__statistics__cols col-4">
            <div className="dashuserdetails__container__statistics__cols__card card">
              <h4>Total Orders:</h4>
              <h3>{user.totalOrders} orders</h3>
            </div>
          </div>
          <div className="dashuserdetails__container__statistics__cols col-4">
            <div className="dashuserdetails__container__statistics__cols__card card">
              <h4>Name:</h4>
              <h3>{user.name}</h3>
            </div>
          </div>
          <div className="dashuserdetails__container__statistics__cols col-4">
            <div className="dashuserdetails__container__statistics__cols__card card">
              <h4>Email:</h4>
              <h3>{user.email}</h3>
            </div>
          </div>

          <div className="dashuserdetails__container__statistics__cols col-4">
            <div className="dashuserdetails__container__statistics__cols__card card">
              <h4>Registered at:</h4>
              <h3>{user.createdAt}</h3>
            </div>
          </div>
          <div className="dashuserdetails__container__statistics__cols col-4">
            <div className="dashuserdetails__container__statistics__cols__card card">
              <h4>Add Role:</h4>

              <div className="role d-flex">
                <input
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  type="text"
                />
                <button onClick={() => roleHandler()} className="text__btn">
                  add
                </button>
              </div>
            </div>
          </div>
          <div className="dashuserdetails__container__statistics__cols col-4">
            <div className="dashuserdetails__container__statistics__cols__card card">
              <button onClick={() => adminHandler()} className="text__btn">
                remove employee acces
              </button>
            </div>
          </div>
        </div>

        <div className="dashuserdetails__container__message row">
          <div className="dashuserdetails__container__message__col col-6">
            <textarea
              className="text__msg"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="dashuserdetails__container__message__col col-6">
            <button className="text__btn">send message to user</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashEmployeeDetails;
