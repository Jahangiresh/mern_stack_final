import axios from "axios";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import Table from "react-bootstrap/esm/Table";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import "./dashuserscreen.scss";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        employees: action.payload,
      };
    case "FETCH_FAIL":
      return { error: action.payload, loading: false };
    default:
      return state;
  }
}

const DashEmployeeScreen = () => {
  const [deletedUser, setDeletedUser] = useState();
  // const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [{ loading, error, employees }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    employees: [],
  });

  useEffect(() => {
    const usersOnly = [];

    const getuser = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const resp = await axios.get("/api/users");
        resp.data.map((res) => {
          if (res.isAdmin) {
            usersOnly.push(res);
          }
        });
        dispatch({ type: "FETCH_SUCCESS", payload: usersOnly });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    getuser();
  }, [deletedUser]);

  const deleteHandler = async (e) => {
    const resp = await axios
      .delete(`/api/users/delete/${e}`)
      .then((resp) => setDeletedUser(resp.data))
      .then(() => toast.success("User deleted successfully"))
      .catch(() => toast.error("try again later"));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div className="dashuserscreen">
      <div className="dashuserscreen__container ">
        <Table
          className="dashuserscreen__container__table"
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th className="th__image">image</th>
              <th>Id</th>
              <th>Name</th>
              <th>email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="dashuserscreen__container__table__tbody">
            {employees &&
              employees.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="td__image">
                      <div className="td__image__box">
                        <img
                          className="td__image__box__img"
                          src={user.profilePic}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>

                    <td className="btns__td">
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="del__btn"
                      >
                        delete
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/employee/${user._id}`);
                        }}
                        className="edit__btn"
                      >
                        details
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DashEmployeeScreen;
