/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Profile.scss";
import {
  MdOutlineAccountCircle,
  MdSecurity,
  MdOutlineLogout,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axiosUtils";
import { Spinner } from "react-bootstrap";
import ChangeProfilePicture from "./ChangeProfilePicture";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, email, profile, mobile, name } = useSelector(
    (state) => state.auth
  );

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name) {
      setUserEmail(email);
      setUserName(name);
      setUserMobile(mobile);
    }
  }, [token, name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.patch(
        "/api/user/update-profile",
        {
          name: userName,
          email: userEmail,
          mobile: userMobile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("mobile", data.user.mobile);
        localStorage.setItem("name", data.user.name);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully");
  };
  return (
    <div className="profile_page">
      <section className="no_section">
        <h3>{`</> ${name}'s Profile </>`}</h3>
      </section>
      <div className="section">
        <section className="sidenav">
          <h4>{"</> Profile </>"}</h4>
          <div>
            <li>
              <MdOutlineAccountCircle />
              Account Preferences
            </li>
            <li>
              <MdSecurity />
              Sign in & Security
            </li>
            <li onClick={logoutHandler}>
              <MdOutlineLogout />
              Logout
            </li>
          </div>
        </section>
        <section className="profile_body">
          <h4>{"</> Account Preferences </>"}</h4>
          <div className="img_section">
            <img src={profile} alt=""></img>
            <div className="btns_1">
              <button onClick={() => setShow(true)}>
                <FaRegImage />
                Edit
              </button>
              <button>
                <MdOutlineDeleteOutline />
                Remove
              </button>
            </div>
          </div>
          <form className="details">
            <div>
              <label htmlFor="name">Name</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Name"
              />
              <label htmlFor="email">Email</label>
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <label htmlFor="password">Mobile</label>
              <input
                value={userMobile}
                onChange={(e) => setUserMobile(e.target.value)}
                type="number"
                placeholder="Mobile"
              />
            </div>
            <div className="btns_2">
              <button>Cancel</button>
              <button onClick={(e) => submitHandler(e)}>
                {loading ? <Spinner /> : "Update"}
              </button>
            </div>
          </form>
        </section>
      </div>
      <ChangeProfilePicture show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export default Profile;
