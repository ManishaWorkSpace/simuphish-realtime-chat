"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { getSocket } from "@/src/services/socket";
import { addMessage } from "@/src/store/slices/chatSlice";
import { setDraft } from "@/src/store/slices/draftSlice";
import { uploadToCloudinary } from "@/src/services/cloudinary";
import MediaPreview from "./MediaPreview";
import { v4 as uuidv4 } from "uuid";

export default function MessageInput() {
  const socket = getSocket();
  const dispatch = useDispatch();

  const { activeChat } = useSelector(
    (state: RootState) => state.chat
  );
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const draftMessages = useSelector(
    (state: RootState) => state.draft
  );

  const [text, setText] = useState(
    draftMessages[activeChat || ""] || ""
  );
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setText(e.target.value);
    if (activeChat) {
      dispatch(
        setDraft({ username: activeChat, text: e.target.value })
      );
    }
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

 const handleSend = async () => {
  if (!activeChat || !currentUser) return;

  let mediaUrl = "";
  let type: "text" | "image" | "video" = "text";

  if (file) {
    setLoading(true);

    const res = await uploadToCloudinary(file);
    mediaUrl = res.secure_url;
    type = file.type.startsWith("video") ? "video" : "image";

    setLoading(false);
  }

  if (!text.trim() && !file) return;

  const newMessage = {
    id: uuidv4(),
    from: currentUser.username,
    to: activeChat,
    text,
    media: mediaUrl,
    type: file ? type : "text",
    createdAt: new Date().toISOString(),
  };

  // ❌ REMOVE THIS:
  // dispatch(addMessage(newMessage));

  // ✅ ONLY emit
  socket?.emit("sendMessage", {
    to: activeChat,
    message: newMessage,
  });

  setText("");
  setFile(null);
  dispatch(setDraft({ username: activeChat, text: "" }));
};
  return (
   <div className="px-6 py-4 bg-white/80 backdrop-blur-md border-t border-gray-100 space-y-3 shadow-sm">

  {/* Media Preview */}
  {file && (
    <MediaPreview
      file={file}
      onRemove={() => setFile(null)}
    />
  )}

  <div className="flex items-center gap-3">

    {/* Hidden File Input */}
    <input
      type="file"
      accept="image/*,video/*"
      onChange={handleFileChange}
      className="hidden"
      id="mediaUpload"
    />

    {/* Attachment Button */}
    <label
      htmlFor="mediaUpload"
      className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-indigo-100 transition-all duration-300 text-lg shadow-sm hover:shadow-md"
    >
      📎
    </label>

    {/* Message Input */}
    <input
      value={text}
      onChange={handleChange}
      placeholder="Type a message..."
      className="flex-1 px-5 py-3 rounded-full bg-white shadow-sm outline-none focus:shadow-indigo-200 transition-all duration-300"
    />

    {/* Send Button */}
    <button
      onClick={handleSend}
      disabled={loading}
      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Uploading..." : "Send"}
    </button>

  </div>
</div>
  );
}