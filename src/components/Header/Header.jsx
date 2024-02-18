/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-toastify";
import "./Header.scss";

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
        <FaSearch />
        <FaRegEdit />
        <BsThreeDotsVertical onClick={() => setShow((prev) => !prev)} />
      </div>
      {show && (
        <div className="dropdown_menu">
          <div className="prof">
            <Link to="/profile">
              <img src={profile} alt="" />
              <div>
                <span>{userName}</span>
                <span className="email">{userEmail}</span>
              </div>
            </Link>
          </div>
          <div onClick={logoutHandler} className="mor1">
            <CgLogOut />
            <span style={{ fontWeight: "bold" }}>Logout</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
