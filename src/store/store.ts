import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
import draftReducer from "./slices/draftSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    draft: draftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;