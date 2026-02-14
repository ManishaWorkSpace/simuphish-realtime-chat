"use client";

import { useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "@/src/store/store";
import { useDraggable } from "@dnd-kit/core";
import { useEffect, useRef } from "react";
import Image from "next/image";

/* =========================================
        DRAGGABLE WRAPPER
========================================= */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DraggableMessage = ({ msg, children }: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `drag-${msg.id}`,
    data: msg,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px,0)`,
        zIndex: 999,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

/* =========================================
              COMPONENT
========================================= */

export default function ChatWindow() {
  const { messages, activeUser, typingUsers } = useSelector(
    (state: RootState) => state.chat,
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  /* =========================================
        AUTO SCROLL
  ========================================= */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typingUsers]);

  /* Fake logged user for demo */
  const currentUserId =
    typeof window !== "undefined" && window.location.hash === "#2"
      ? "user-2"
      : "user-1";

  const filteredMessages = messages.filter(
    (msg) => msg.chatId === activeUser?.id,
  );

  if (!activeUser) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400 text-lg">
        Select a chat to start messaging 💬
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-linear-to-b from-pink-50 to-white">
      {/* =====================================
                HEADER
      ===================================== */}

      <div className="h-16 border-b border-pink-100 flex items-center px-6 bg-white shadow-sm">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{activeUser.name}</span>
        </div>
      </div>

      {/* =====================================
                MESSAGES
      ===================================== */}

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        <AnimatePresence initial={false}>
          {filteredMessages.map((msg) => {
            const isMine = msg.senderId === currentUserId;

            return (
              <DraggableMessage key={msg.id} msg={msg}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      px-3 py-2
                      rounded-2xl
                      shadow-sm
                      max-w-85
                      transition
                      hover:shadow-md
                      ${
                        isMine
                          ? "bg-pink-400 text-white"
                          : "bg-white border border-pink-100"
                      }
                    `}
                  >
                    {/* ============================
                            MEDIA GRID
                    ============================ */}

                    {msg.media?.map((m, index) => (
                      <div key={index}>
                        {m.type === "image" ? (
                          <Image
                            src={m.url}
                            alt="image"
                            width={500}
                            height={300}
                          />
                        ) : (
                          <video src={m.url} controls />
                        )}
                      </div>
                    ))}

                    {/* TEXT */}
                    {msg.text && <p className="wrap-break-word">{msg.text}</p>}

                    {/* STATUS */}
                    {isMine && (
                      <div className="text-[10px] opacity-70 mt-1 text-right">
                        {msg.status === "sending" && "✓"}
                        {msg.status === "delivered" && "✓✓"}
                        {msg.status === "seen" && "✓✓ Seen"}
                      </div>
                    )}
                  </div>
                </motion.div>
              </DraggableMessage>
            );
          })}
        </AnimatePresence>

        {/* ============================
              TYPING INDICATOR
        ============================ */}

        {typingUsers?.includes(activeUser.id) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex"
          >
            <div className="bg-white px-4 py-2 rounded-2xl shadow text-gray-500 text-sm">
              typing...
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <MessageInput key={activeUser.id} activeChatId={activeUser.id} />
    </div>
  );
}
