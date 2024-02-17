/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getChatsOfRoom, getRoom } from "../../features/apiCall";
import { setCurrentPage } from "../../features/generalSlice";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtils";
import { Button } from "react-bootstrap";

const ENDPOINT = "http://localhost:4000";
var socket;

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token, id: userId } = useSelector((state) => state.auth);
  const { room } = useSelector((state) => state.room);
  const { chats } = useSelector((state) => state.chat);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [socketConnected, setSocketConnected] = useState("");

  console.log(socketConnected);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userId);
    socket.on("connection", (arg) => {
      setSocketConnected(arg);
      console.log(arg);
    });
  }, [token]);

  useEffect(() => {
    if (token && id) {
      getRoom(dispatch, token, id);
      getChatsOfRoom(dispatch, token, id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(setCurrentPage({ currentPage: `${room.name}` }));
    }
  }, []);

  const fetchChats = async () => {
    if (!id) return;
    try {
      const { data } = await axios.get(`/api/chat/get-chats/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setMessages(data.chats);
      socket.emit("join room chat", id);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(
        "/api/chat/send-message",
        {
          roomId: id,
          userId: userId,
          message,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const newData = {
        data: data.chat,
        room: room,
      };
      if (data.success) {
        socket.emit("new message", newData);
        setMessage("");
        setMessages([...messages, data.chat]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [id]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      console.log(newMessageRecieved);
      if (!room || room._id !== newMessageRecieved.data.room) {
        // getChatsOfRoom(dispatch, token, id, socket);
      } else {
        setMessages([...messages, newMessageRecieved.data]);
      }
    });
  });

  return (
    <div className="home">
      <Sidebar />
      <div className="chat_screen">
        <Header />
        <section className="chat_section">
          <div className="conversation">
            {messages.length > 0
              ? messages.map((chat, i) => (
                  <div
                    key={i}
                    className={`msg ${
                      chat.user?._id === userId ? "right" : "left"
                    }`}
                  >
                    <div className="msg_head">
                      <div className="profile_user">
                        <img src={chat.user?.avatar} alt="" />
                        <span>{chat.user?.name}</span>
                      </div>
                    </div>
                    <div className="msg_body">
                      <span>{chat.message}</span>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="send_msg">
            <FiPlusCircle />
            <div className="group">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="1"
                cols="1"
                type="text"
                placeholder="Type a message...."
              />
              <BsUpload />
              <MdOutlineEmojiEmotions />
            </div>
            <Button onClick={sendMessage} className="send">
              <IoSend />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chat;
