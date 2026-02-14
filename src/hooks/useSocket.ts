"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { addMessage, setOnlineUsers } from "../features/chat/chatSlice";
import { getSocket } from "../services/socket";

export const useSocket = () => {
  const socket = getSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receive-message", (message) => {
      dispatch(addMessage(message));
    });
    socket.on("online-users", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.off("receive-message");
    };
  }, [dispatch]);
};
