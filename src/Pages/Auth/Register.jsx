import React, { useState } from "react";
import "./Login.scss";
import { FaLock } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { Form, Button, Spinner } from "react-bootstrap";
import axiosInstance from "../../utils/axiosUtils";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/register", {
        name,
        email,
        password,
        mobile,
      });

      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("mobile", data.user.mobile);
        localStorage.setItem("profile", data.user.avatar);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("id", data.user._id);

        dispatch(
          setToken({
            token: data.accessToken,
            email: data.user.email,
            mobile: data.user.mobile,
            profile: data.user.avatar,
            name: data.user.name,
            id: data.user._id,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <div className="wrapper-page">
      <div className="card-box">
        <div className="text-center">
          <h3>SIGN UP</h3>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
              type="text"
              placeholder="Enter Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-text"
              type="email"
              placeholder="Email Address"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="input-text"
              type="number"
              placeholder="Email Mobile Number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
              type="password"
              placeholder="Enter Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button type="submit" className="submit-button">
            {loading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "REGISTER UP TO CONTINUE"
            )}
          </Button>
          <Link to="/login" className="register">
            <FaLock style={{ fontSize: "11px" }} />
            <span>Go to Login?</span>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
