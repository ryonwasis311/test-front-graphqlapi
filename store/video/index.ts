import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { TVideo } from "../../types";

export interface VideoState {
  video: TVideo[];
}

const initialState: VideoState = {
  video: []
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    initList: (state) => {
      state.video = [];
    },
    updateVideo: (state, action) => {
      state.video = action.payload;
    },
    addVideo: (state, action) => {
      console.log("new Video: ", action.payload);
      let newList: any = [action.payload].concat(state.video);
      state.video = newList;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
      // return { ...action.payload };
    },
  },
});

export const { initList, addVideo, setVideo, updateVideo } = videoSlice.actions;
export const selectVideo = (state: RootState) => state.video;
export default videoSlice.reducer;
