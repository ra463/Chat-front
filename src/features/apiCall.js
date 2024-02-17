import { toast } from "react-toastify";
import axios from "../utils/axiosUtils";
import { setRoom, setRooms } from "./roomSlice";
import { setChats } from "./chatSlice";

export const getAllRooms = async (dispatch, token) => {
  try {
    const { data } = await axios.get("/api/room/get-all-rooms", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      dispatch(setRooms({ rooms: data.rooms }));
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getRoom = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/room/get-room/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      dispatch(setRoom({ room: data.room }));
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getChatsOfRoom = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/chat/get-chats/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setChats({ chats: data.chats }));
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
