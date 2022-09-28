import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useReducer } from "react";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import "./profilescreen.scss";
const uploader = new Uploader({
  apiKey: "free",
});
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const ProfileScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState(userInfo.data.name);
  const [email, setEmail] = useState(userInfo.data.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(userInfo.data.profilePic);
  console.log(profilePic);

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          profilePic,
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.data.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      localStorage.setItem("userInfo", JSON.stringify({ data }));
      toast.success("User updated successfully");
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <div className="container">
        <Helmet>
          <title>User Profile</title>
        </Helmet>
        <h1 className="my-3">User Profile</h1>
        <form onSubmit={submitHandler}>
          <div
            style={{
              height: "153px",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="profile__picture__row row "
          >
            <div
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                backgroundColor: "whitesmoke",
                overflow: "hidden",
                position: "relative",
              }}
              className="profile__picture__row__col p-0"
            >
              <UploadButton
                style={{ bottom: "0" }}
                uploader={uploader}
                options={{ multi: true }}
                onComplete={(files) => setProfilePic(files[0].fileUrl)}
              >
                {({ onClick }) => (
                  <button
                    className="pp__button"
                    style={{
                      position: "absolute",
                      top: "70%",
                      left: "50%",
                      zIndex: "0",
                      transform: "translate(-50%,-50%)",
                      width: "100%",
                      border: "none",
                      backgroundColor: "#e3e3e385",
                    }}
                    onClick={onClick}
                  >
                    Upload a photo...
                  </button>
                )}
              </UploadButton>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={profilePic}
                alt=""
              />
            </div>
          </div>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
