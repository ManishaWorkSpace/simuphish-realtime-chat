import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, User } from "./chatTypes";

interface ChatState {
  messages: Message[];
  activeUser: User | null;
  onlineUsers: string[];
  unread: Record<string, number>;
  typingUsers: string[];
}

const initialState: ChatState = {
  messages: [],
  activeUser: null,
  onlineUsers: [],
  unread: {},
  typingUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.activeUser = action.payload;
    },
    setTypingUsers: (state, action) => {
      state.typingUsers = action.payload;
    },

    updateMessageStatus: (state, action) => {
      const { id, status } = action.payload;

      const msg = state.messages.find((m) => m.id === id);
      if (msg) msg.status = status;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      const exists = state.messages.some((msg) => msg.id === action.payload.id);

      if (!exists) {
        state.messages.push(action.payload);
      }
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    incrementUnread: (state, action) => {
      const chatId = action.payload;

      state.unread[chatId] = (state.unread[chatId] || 0) + 1;
    },

    clearUnread: (state, action) => {
      state.unread[action.payload] = 0;
    },
  },
});

export default chatSlice.reducer;

export const {
  addMessage,
  setActiveUser,
  setOnlineUsers,
  incrementUnread,
  clearUnread,
   updateMessageStatus,
   setTypingUsers,
} = chatSlice.actions;
