"use client";

import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "@/src/store/store";
import { setActiveUser, clearUnread } from "@/src/features/chat/chatSlice";
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useEffect } from "react";

const users = [
  {
    id: "1",
    name: "Barbie",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Bob",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Donald",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "4",
    name: "Alex",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    id: "5",
    name: "Katrina",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "6",
    name: "Mira",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DroppableUser = ({ user, children }: any) => {
  const { setNodeRef, isOver } = useDroppable({
    id: user.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative mx-3 transition ${
        isOver ? "bg-pink-200 scale-105 shadow-lg" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default function ChatSidebar() {
  const dispatch = useDispatch();
  const { activeUser, unread } = useSelector((state: RootState) => state.chat);

  /* =============================
      RESTORE ACTIVE USER
  ============================= */

  useEffect(() => {
    const savedUser = localStorage.getItem("active-chat-user");

    if (savedUser) {
      dispatch(setActiveUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  /* =============================
      HANDLE CLICK
  ============================= */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUserClick = (user: any) => {
    dispatch(setActiveUser(user));
    dispatch(clearUnread(user.id));

    localStorage.setItem("active-chat-user", JSON.stringify(user));
  };

  return (
    <div className="w-[320px] flex flex-col border-r border-pink-100 bg-linear-to-b from-pink-50 via-rose-50 to-white shadow-xl">
      <div className="p-6 border-b border-pink-100">
        <h1 className="text-2xl font-semibold text-gray-800">Chats</h1>
        <p className="text-sm text-gray-400 mt-1">Stay connected 💬</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-2">
        {users.map((user) => {
          const isActive = activeUser?.id === user.id;
          const unreadCount = unread[user.id] || 0;

          return (
            <DroppableUser key={user.id} user={user}>
              <motion.div
                layout
                whileHover={{ scale: 1.02, x: 6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserClick(user)}
                className="relative flex items-center gap-4 p-3 rounded-2xl cursor-pointer mx-3"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-2xl bg-pink-100 border border-pink-200 shadow-md"
                  />
                )}

                <div className="relative flex items-center gap-4 w-full">
                  <div className="relative">
                    <Image
                      src={user.avatar}
                      alt="avatar"
                      width={50}
                      height={50}
                      className="rounded-full shadow-sm"
                    />

                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full animate-pulse" />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-green-500 font-medium">Online</p>
                  </div>

                  {unreadCount > 0 && !isActive && (
                    <motion.div
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      className="min-w-5.5 h-5.5 flex items-center justify-center text-xs bg-pink-400 text-white rounded-full shadow"
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </DroppableUser>
          );
        })}
      </div>
    </div>
  );
}
