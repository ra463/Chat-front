/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getRoom } from "../../features/apiCall";
import { setCurrentPage } from "../../features/generalSlice";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtils";
import { Button } from "react-bootstrap";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "https://chat-app-ovn9.onrender.com";

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token, id: userId } = useSelector((state) => state.auth);
  const { room } = useSelector((state) => state.room);
  const socket = useRef();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    if (id) {
      socket.current = io(ENDPOINT);
      socket.current.emit("join-user", userId);
      socket.current.on("me", (data) => {
        console.log(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (token && id) {
      getRoom(dispatch, token, id);
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
      socket.current.emit("join-room", id);
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

      socket.current.emit("new message", data.chat);
      setMessage("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [id]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("received", (newMessageRecieved) => {
        setArrivalMessage(newMessageRecieved);
      });
    }
  }, []);

  useEffect(() => {
    if (id.toString() !== arrivalMessage?.room.toString()) {
      return setArrivalMessage(null);
    } else {
      setMessages((prev) => [...prev, arrivalMessage]);
      setArrivalMessage(null);
    }
  }, [arrivalMessage]);

  return (
    <div className="home">
      <Sidebar />
      <div className="chat_screen">
        <Header />
        <section className="chat_section">
          <ReactScrollToBottom className="conversation">
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
          </ReactScrollToBottom>
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
