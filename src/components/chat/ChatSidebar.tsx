"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { getSocket } from "@/src/services/socket";
import { logoutUser, setOnlineUsers } from "@/src/store/slices/userSlice";
import SidebarUser from "./SidebarUser";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { onlineUsers, currentUser } = useSelector(
    (state: RootState) => state.user,
  );

  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    if (!socket) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOnlineUsers = (users: any) => {
      dispatch(setOnlineUsers(users));
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [socket, dispatch]);

  return (
  <div className="w-72 h-screen flex flex-col bg-gradient-to-b from-white via-indigo-50/40 to-purple-50/40 shadow-xl">

  {/* Header */}
  <div className="p-5 flex items-center justify-between bg-white/70 backdrop-blur-md shadow-sm">

    <div>
      <p className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Chats
      </p>
      <p className="text-xs text-gray-500 mt-1">
        @{currentUser?.username}
      </p>
    </div>

    <button
      onClick={() => {
        sessionStorage.removeItem("user");
        dispatch(logoutUser());
        router.push("/login");
      }}
      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
    >
      Logout
    </button>
  </div>

  {/* Users List */}
  <div className="flex-1 overflow-y-auto py-3">

    {onlineUsers
      .filter((u) => u.username !== currentUser?.username)
      .map((user) => (
        <div
          key={user.username}
          className="px-5 py-3 transition-all duration-300 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-sm cursor-pointer"
        >
          <SidebarUser user={user} />
        </div>
      ))}

  </div>
</div>
  );
}
