"use client";

import { useDraggable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MessageItem({ message }: any) {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const isMine = message.from === currentUser?.username;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: message.id,
      data: {
        message,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      } ${isDragging ? "opacity-0" : ""}`}
    >
      <div
        className={`max-w-xs p-3 rounded-2xl shadow-md text-sm cursor-grab active:cursor-grabbing transition ${
          isMine ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
        }`}
      >
        {message.type === "text" && <p>{message.text}</p>}

        {message.type === "image" && (
          <img
            src={message.media}
            className="rounded-lg max-h-60 object-cover"
            alt=""
          />
        )}

        {message.type === "video" && (
          <video src={message.media} controls className="rounded-lg max-h-60" />
        )}
      </div>
    </div>
  );
}
