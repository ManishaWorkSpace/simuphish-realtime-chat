"use client";

import { uploadToCloudinary } from "@/src/services/cloudinary";
import { getSocket } from "@/src/services/socket";
import { getUserId } from "@/src/utils/getUserId";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type Preview = {
  url: string;
  type: "image" | "video";
};

export default function MessageInput({
  activeChatId,
}: {
  activeChatId: string;
}) {
  const socket = getSocket();
  const senderId = getUserId();

  const [text, setText] = useState(() => {
    if (typeof window === "undefined") return "";

    return localStorage.getItem(`draft-${activeChatId}`) || "";
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Preview[]>([]);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  /* =============================
      SAVE DRAFT
  ============================= */

  useEffect(() => {
    localStorage.setItem(`draft-${activeChatId}`, text);
  }, [text, activeChatId]);

  /* =============================
      CLEANUP PREVIEW URLS
  ============================= */

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  /* =============================
      TYPING (debounced)
  ============================= */

  const handleTyping = (value: string) => {
    setText(value);

    socket.emit("typing", activeChatId);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stop-typing", activeChatId);
    }, 1200);
  };

  /* =============================
      FILE PICKER
  ============================= */

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const arr = Array.from(fileList);

    setFiles((prev) => [...prev, ...arr]);

    const newPreviews: Preview[] = arr.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video")
        ? ("video" as const)
        : ("image" as const),
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  /* =============================
      REMOVE MEDIA
  ============================= */

  const removeMedia = (index: number) => {
    URL.revokeObjectURL(previews[index].url);

    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* =============================
      SEND MESSAGE
  ============================= */

  const sendMessage = async () => {
    if (!text.trim() && files.length === 0) return;

    const tempId = uuidv4();

    // optimistic message
    socket.emit("send-message", {
      id: tempId,
      text,
      senderId,
      chatId: activeChatId,
      timestamp: Date.now(),
      media: previews,
      status: "uploading",
    });

    localStorage.removeItem(`draft-${activeChatId}`);

    setText("");
    setFiles([]);
    setPreviews([]);

    // upload real files
    if (files.length > 0) {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const url = await uploadToCloudinary(file);

          return {
            url,
            type: file.type.startsWith("video")
              ? ("video" as const)
              : ("image" as const),
          };
        }),
      );

      socket.emit("replace-media", {
        id: tempId,
        media: uploaded,
        status: "sent",
      });
    }
  };

  return (
    <div className="border-t border-pink-100 bg-linear-to-b from-pink-50 to-white p-3 flex flex-col gap-3">
      {/* MEDIA PREVIEW */}
      {previews.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {previews.map((p, i) => (
            <div key={i} className="relative">
              {p.type === "image" ? (
                <img
                  src={p.url}
                  className="w-24 h-24 object-cover rounded-xl"
                />
              ) : (
                <video
                  src={p.url}
                  className="w-32 rounded-xl shadow-md"
                  controls
                />
              )}

              <button
                onClick={() => removeMedia(i)}
                className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full shadow hover:bg-red-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* INPUT ROW */}
      <div className="flex gap-2 items-center">
        <label className="cursor-pointer bg-pink-200 hover:bg-pink-300 px-3 py-2 rounded-xl shadow">
          📎
          <input
            hidden
            multiple
            type="file"
            accept="image/*,video/*"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        <input
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-300 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-pink-400 hover:bg-pink-500 text-white px-5 py-2 rounded-xl shadow font-medium active:scale-95"
        >
          Send
        </button>
      </div>
    </div>
  );
}
