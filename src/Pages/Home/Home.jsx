import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="chat_screen">
        <Header />
        <section className="no_section">Please select a room....</section>
      </div>
    </div>
  );
};

export default Home;
