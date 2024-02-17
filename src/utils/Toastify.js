import React from "react";
import { ToastContainer } from "react-toastify";

export default function Toastify() {
  return (
    <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
  );
}
