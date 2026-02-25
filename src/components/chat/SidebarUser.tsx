"use client";

import { useDroppable } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { setActiveChat } from "@/src/store/slices/chatSlice";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export default function SidebarUser({ user }: Props) {
  const dispatch = useDispatch();

  const { setNodeRef, isOver } = useDroppable({
    id: user.username,
    data: {
      user,
    },
  });

  return (
   <div
  ref={setNodeRef}
  onClick={() => dispatch(setActiveChat(user.username))}
  className={`px-5 py-4 transition-all duration-300 cursor-pointer
    border-b border-gray-300
    ${isOver 
      ? "bg-white/70 shadow-sm backdrop-blur-md scale-[1.01]" 
      : "hover:bg-white/60 hover:shadow-sm hover:backdrop-blur-sm"
    }
  `}
>
  <div className="flex items-center gap-4">

    {/* Avatar */}
    <div className="relative">
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
        {user.fullName.charAt(0).toUpperCase()}
      </div>

      {/* Online Indicator */}
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white"></span>
    </div>

    {/* User Info */}
    <div>
      <p className="font-semibold text-gray-800">
        {user.fullName}
      </p>
      <p className="text-sm text-gray-500">
        @{user.username}
      </p>
    </div>

  </div>
</div>
  );
}