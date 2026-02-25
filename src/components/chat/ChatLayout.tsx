"use client";

import { useEffect, useRef, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { getSocket } from "@/src/services/socket";

import { setUser } from "@/src/store/slices/userSlice";
import {
  addMessage,
  setActiveChat,
} from "@/src/store/slices/chatSlice";
import { setDraft } from "@/src/store/slices/draftSlice";

import Sidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import MessageItem from "./MessageItem";

export default function ChatLayout() {
  const dispatch = useDispatch();
  const hydratedRef = useRef(false);

  const chatState = useSelector((state: RootState) => state.chat);
  const drafts = useSelector((state: RootState) => state.draft);
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const activeChat = chatState.activeChat;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeMessage, setActiveMessage] = useState<any>(null);

  // ✅ HYDRATE REDUX (runs once safely)
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const savedUser = sessionStorage.getItem("user");
    const savedChat = localStorage.getItem("chat");
    const savedDrafts = localStorage.getItem("drafts");

    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }

    if (savedChat) {
      const parsedChat = JSON.parse(savedChat);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
      parsedChat.messages?.forEach((msg: any) => {
        dispatch(addMessage(msg));
      });

      if (parsedChat.activeChat) {
        dispatch(setActiveChat(parsedChat.activeChat));
      }
    }

    if (savedDrafts) {
      const parsedDrafts = JSON.parse(savedDrafts);

      Object.entries(parsedDrafts).forEach(([username, text]) => {
        dispatch(
          setDraft({ username, text: text as string })
        );
      });
    }
  }, [dispatch]);

  // ✅ SAVE USER
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem(
        "user",
        JSON.stringify(currentUser)
      );
    }
  }, [currentUser]);

  // ✅ SAVE CHAT
  useEffect(() => {
    if (hydratedRef.current) {
      localStorage.setItem(
        "chat",
        JSON.stringify(chatState)
      );
    }
  }, [chatState]);

  // ✅ SAVE DRAFTS
  useEffect(() => {
    if (hydratedRef.current) {
      localStorage.setItem(
        "drafts",
        JSON.stringify(drafts)
      );
    }
  }, [drafts]);

  // ✅ SOCKET AUTO REGISTER
  useEffect(() => {
    if (!currentUser) return;

    const socket = getSocket();
    if (!socket) return;

    if (socket.connected) {
      socket.emit("register", currentUser);
    }

    socket.on("connect", () => {
      socket.emit("register", currentUser);
    });

    return () => {
      socket.off("connect");
    };
  }, [currentUser]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: any) => {
    setActiveMessage(event.active.data.current?.message);
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || !currentUser) {
      setActiveMessage(null);
      return;
    }

    const draggedMessage =
      active.data.current?.message;
    const targetUser = over.data.current?.user;

    if (!draggedMessage || !targetUser) {
      setActiveMessage(null);
      return;
    }

    const socket = getSocket();

    const newMessage = {
      ...draggedMessage,
      id: crypto.randomUUID(),
      from: currentUser.username,
      to: targetUser.username,
      forwarded: true,
      createdAt: new Date().toISOString(),
    };

    socket?.emit("sendMessage", {
      to: targetUser.username,
      message: newMessage,
    });

    setActiveMessage(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-gray-200">
        <Sidebar />

        <div className="flex-1 bg-gray-50">
          {activeChat ? (
            <ChatWindow />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-lg">
              Select a user to start chatting 💬
            </div>
          )}
        </div>
      </div>

      <DragOverlay>
        {activeMessage ? (
          <div className="opacity-90 scale-105">
            <MessageItem message={activeMessage} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}