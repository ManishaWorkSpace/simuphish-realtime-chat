import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DraftState {
  [username: string]: string;
}

const loadDraftsFromStorage = () => {
  if (typeof window === "undefined") return {};
  const saved = localStorage.getItem("drafts");
  return saved ? JSON.parse(saved) : {};
};

const initialState: DraftState = loadDraftsFromStorage();

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setDraft: (
      state,
      action: PayloadAction<{ username: string; text: string }>
    ) => {
      state[action.payload.username] = action.payload.text;

      localStorage.setItem("drafts", JSON.stringify(state));
    },
  },
});

export const { setDraft } = draftSlice.actions;
export default draftSlice.reducer;