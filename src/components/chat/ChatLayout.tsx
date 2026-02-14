"use client";

import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setOnlineUsers,
  incrementUnread,
  updateMessageStatus,
  setTypingUsers,
} from "@/src/features/chat/chatSlice";

import { RootState } from "@/src/store/store";
import { getSocket } from "@/src/services/socket";
import { getUserId } from "@/src/utils/getUserId";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function ChatLayout() {
  const socket = getSocket();
  const dispatch = useDispatch();

  const activeUser = useSelector(
    (state: RootState) => state.chat.activeUser
  );

  /*
  ⭐ Prevent stale closures (CRITICAL in realtime apps)
  */
  const activeUserRef = useRef(activeUser);

  useEffect(() => {
    activeUserRef.current = activeUser;
  }, [activeUser]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeMessage, setActiveMessage] = useState<any>(null);

  /*
  =====================================================
  🔥 SOCKET LISTENERS (STRICT MODE SAFE)
  =====================================================
  */

  useEffect(() => {
    const userId = getUserId();

    socket.emit("register-user", userId);

    /*
    ⭐ ALWAYS clear listeners first.
    Prevents duplicate messages.
    */
    socket.off("receive-message");
    socket.off("online-users");
    socket.off("message-delivered");
    socket.off("message-seen");
    socket.off("user-typing");
    socket.off("stop-typing");

    /*
    ✅ RECEIVE MESSAGE
    */
    socket.on("receive-message", (message) => {
      dispatch(addMessage(message));

      // unread logic
      if (message.chatId !== activeUserRef.current?.id) {
        dispatch(incrementUnread(message.chatId));
      }

      /*
      ⭐ Auto seen if chat is open
      */
      if (message.chatId === activeUserRef.current?.id) {
        socket.emit("message-seen", { id: message.id });
      }
    });

    /*
    ✅ ONLINE USERS
    */
    socket.on("online-users", (users) => {
      dispatch(setOnlineUsers(users));
    });

    /*
    ✅ DELIVERY ACK
    */
    socket.on("message-delivered", ({ id }) => {
      dispatch(updateMessageStatus({ id, status: "delivered" }));
    });

    /*
    ✅ SEEN ACK
    */
    socket.on("message-seen", ({ id }) => {
      dispatch(updateMessageStatus({ id, status: "seen" }));
    });

    /*
    ✅ TYPING
    */
    socket.on("user-typing", (chatId) => {
      dispatch(setTypingUsers([chatId]));
    });

    socket.on("stop-typing", () => {
      dispatch(setTypingUsers([]));
    });

    return () => {
      socket.off("receive-message");
      socket.off("online-users");
      socket.off("message-delivered");
      socket.off("message-seen");
      socket.off("user-typing");
      socket.off("stop-typing");
    };
  }, [dispatch, socket]);

  /*
  =====================================================
  🔥 DRAG SETUP
  =====================================================
  */

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const senderId = getUserId();

  /*
  =====================================================
  ⭐ DRAG HANDLERS
  =====================================================
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: any) => {
    setActiveMessage(event.active.data.current);
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { over } = event;

    if (!over || !activeMessage) {
      setActiveMessage(null);
      return;
    }

    /*
    ⭐ Server is source of truth.
    NEVER dispatch locally.
    */

    const forwardedMessage = {
      ...activeMessage,
      id: uuidv4(),
      timestamp: Date.now(),
      chatId: over.id,
      senderId,
      status: "sending",
    };

    socket.emit("send-message", forwardedMessage);

    setActiveMessage(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveMessage(null)}
    >
      <div className="flex h-screen overflow-hidden bg-pink-50">
        <ChatSidebar />
        <ChatWindow />
      </div>

      {/* =====================================================
          🔥 PREMIUM DRAG OVERLAY
      ===================================================== */}

      <DragOverlay>
        {activeMessage && (
          <div className="px-4 py-3 bg-white rounded-2xl shadow-2xl scale-105 border border-pink-100">
            {activeMessage.image ? (
              <Image
                src={activeMessage.image}
                alt="preview"
                width={80}
                height={180}
                className="rounded-lg object-cover"
              />
            ) : (
              <p className="text-sm">{activeMessage.text}</p>
            )}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
