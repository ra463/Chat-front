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
        <section
          className="no_section"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Please select/create a room....</span>
          <span style={{ textAlign: "center", padding: "0 4rem" }}>
            {
              "</> Server is hosted on render so it might take approx 1 minute to get active after sometime of inactivity.... </>"
            }
          </span>
        </section>
      </div>
    </div>
  );
};

export default Home;
