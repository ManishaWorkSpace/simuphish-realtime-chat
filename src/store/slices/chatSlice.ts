import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  from: string;
  to: string;
  text?: string;
  media?: string;
  type: "text" | "image" | "video";
  createdAt: string;
}

const initialState = {
  messages: [] as Message[],
  activeChat: null as string | null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
   addMessage: (state, action) => {
  const exists = state.messages.find(
    (msg) => msg.id === action.payload.id
  );

  if (!exists) {
    state.messages.push(action.payload);
  }
},
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
  },
});

export const { addMessage, setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;