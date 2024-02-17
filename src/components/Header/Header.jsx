/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { token, email, profile, name } = useSelector((state) => state.auth);

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (name) {
      setUserEmail(email);
      setUserName(name);
      setImage(profile);
    }
  }, [token]);

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
      </div>
    </section>
  );
};

export default Header;
