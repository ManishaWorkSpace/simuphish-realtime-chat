
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  fullName: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
  allUsers: User[];
  onlineUsers: User[];
}


const initialState: UserState = {
  currentUser: null,
  allUsers: [],
  onlineUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },

    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },

    setOnlineUsers: (state, action: PayloadAction<User[]>) => {
      state.onlineUsers = action.payload;
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.allUsers.push(action.payload);
    },

    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  setUser,
  setAllUsers,
  setOnlineUsers,
  addUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;