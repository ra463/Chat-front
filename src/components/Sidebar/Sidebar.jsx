/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../features/apiCall";
import { useNavigate } from "react-router-dom";
import { setCurrentPage } from "../../features/generalSlice";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtils";

const Sidebar = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { rooms } = useSelector((state) => state.room);
  const { currentPage } = useSelector((state) => state.general);

  useEffect(() => {
    if (token) getAllRooms(dispatch, token);
  }, []);

  const createRoom = async () => {
    try {
      const name_data = window.prompt("Enter Your Room Name");
      if (!name_data) return toast.error("Please Enter Room Name");

      const { data } = await axios.post(
        "/api/room/create-room",
        {
          name: name_data,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        toast.success(data.message);
        getAllRooms(dispatch, token);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      <section className="head">
        <h3>Rooms</h3>
        <FaRegEdit />
      </section>
      <section className="search">
        <Button onClick={createRoom}>Create Room</Button>
      </section>
      <section className="rooms">
        {rooms.length > 0 ? (
          rooms.map((room, i) => (
            <div
              key={i}
              className={`all_rooms ${
                currentPage === room.name ? "active" : ""
              }`}
              onClick={() => {
                dispatch(setCurrentPage({ currentPage: `${room.name}` }));
                navigate(`/room/${room._id}`);
              }}
            >
              <div className="a_div">
                <div className="profile_room">
                  <img src={room.createdBy?.avatar} alt="" />
                  <div className="text">
                    <span>{room?.name}</span>
                    <span>Creator Email - {room.createdBy.email}</span>
                  </div>
                </div>
                <CiStar />
              </div>
              <div className="b_div">
                <span>Created by - {room.createdBy.name}</span>
                <span>{room.users.length} Members</span>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>No Rooms Found</div>
        )}
      </section>
    </div>
  );
};

export default Sidebar;
