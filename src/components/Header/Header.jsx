/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-toastify";
import "./Header.scss";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, email, profile, name } = useSelector((state) => state.auth);

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (name) {
      setUserEmail(email);
      setUserName(name);
      setImage(profile);
    }
  }, [token]);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <section className="profile_head">
      <div className="profile_user">
        <img src={image} alt="" />
        <div>
          <span>{userName}</span>
          <span>{userEmail}</span>
        </div>
      </div>
      <div className="links">
        <button onClick={logoutHandler}>
          <MdOutlineLogout />
          Logout
        </button>
        <img src={profile} alt="" onClick={() => setShow((prev) => !prev)} />
      </div>
      {show && (
        <Link className="prof" to="/profile">
          <img src={profile} alt="" />
          <div>
            <span>{userName}</span>
            <span className="email">{userEmail}</span>
          </div>
        </Link>
      )}
    </section>
  );
};

export default Header;
