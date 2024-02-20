/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Profile.scss";
import {
  MdOutlineAccountCircle,
  MdSecurity,
  MdOutlineLogout,
} from "react-icons/md";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axiosUtils";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Form,
} from "react-bootstrap";
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
        <h4>{`${name} - Profile`}</h4>
      </section>
      <div className="section">
        <section className="sidenav">
          <div>
            <h4>Chat App</h4>
            <img src="./chat.jpg" alt=""></img>
          </div>
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
        <Container className="view_user">
          <Card>
            <img src={profile} alt="" />
            <div className="user_info">
              <div className="user_name">
                <h4>{name}</h4>
                <span className="active">Active</span>
              </div>
              <div className="user_details">
                <span>
                  <span className="field_head">Email Address:</span> {email}
                </span>
                <span>
                  <span className="field_head">Mobile Number:</span> {mobile}
                </span>
                <Button style={{ marginTop: "3rem" }}>Change Picture</Button>
              </div>
            </div>
          </Card>
          <Card>
            <h3>Update User</h3>
            <Container className="input-fields">
              <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Name</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <Form.Control
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                  />
                </Col>
              </Row>
              <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Email Address</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <Form.Control
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email"
                  />
                </Col>
              </Row>
              <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Mobile Number</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <Form.Control
                    value={userMobile}
                    onChange={(e) => setUserMobile(e.target.value)}
                    type="text"
                  />
                </Col>
              </Row>
              <Row className="align-items-center mb-4">
                <Col className="d-none d-md-block" md={3}>
                  <Form.Label></Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <Button onClick={submitHandler}>
                    {loading ? <Spinner /> : "Update"}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card>
        </Container>
      </div>
      <ChangeProfilePicture show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export default Profile;
