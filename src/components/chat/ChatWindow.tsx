"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { addMessage } from "@/src/store/slices/chatSlice";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import { getSocket } from "@/src/services/socket";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { activeChat, messages } = useSelector(
    (state: RootState) => state.chat,
  );

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  // ✅ Listen for incoming messages
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.off("receiveMessage"); // 🔥 clear ALL previous listeners
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("receiveMessage", (message: any) => {
      dispatch(addMessage(message));
    });
  }, [dispatch]);

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.from === currentUser?.username && msg.to === activeChat) ||
      (msg.from === activeChat && msg.to === currentUser?.username),
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold text-lg shadow-sm">
              {activeChat?.charAt(0).toUpperCase()}
            </div>

            {/* Online Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white"></span>
          </div>

          {/* User Info */}
          <div>
            <p className="font-semibold text-gray-800 text-base">
              {activeChat}
            </p>
            <p className="text-xs text-green-500 font-medium tracking-wide">
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
        {filteredMessages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
}
