import React, { useEffect } from "react";
import "./login.scss";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";

const Login = ({ setuserinfo, userinfo }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      setuserinfo(localStorage.setItem("userInfo", JSON.stringify({ data })));
      window.location.href = redirect || "/";
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //link ile logine kecmir
  useEffect(() => {
    if (userinfo) {
      navigate(redirect);
    }
  }, [userinfo, navigate, redirect]);

  return (
    <div className="auth">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <div className="auth__content">
        <div className="auth__content__main">
          <div className="auth__content__main__header">
            <h1>Login</h1>
          </div>
          <div className="auth__content__main__inputs">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  className="formik__class"
                  onSubmit={submitHandler}
                  method="POST"
                >
                  <Field
                    className="field__inp"
                    type="username"
                    name="email"
                    placeholder="email"
                    // value={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <ErrorMessage name="username" component="div" />
                  <Field
                    className="field__inp"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <ErrorMessage name="password" component="div" />
                  <button
                    className="register__btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/signup?redirect=${redirect}`);
                    }}
                    className="create__btn"
                  >
                    create account
                  </button>
                  <button
                    onClick={() => {
                      navigate("/shop");
                    }}
                    className="create__btn"
                  >
                    return to store
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
