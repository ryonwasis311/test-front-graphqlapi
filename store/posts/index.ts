import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { TPost } from "../../types";

export interface PostState {
  posts: TPost[];
  likePosts: TPost[];
}

const initialState: PostState = {
  posts: [],
  likePosts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    initPosts: (state) => {
      state.posts = [];
    },
    addPosts: (state, action: PayloadAction<TPost>) => {
      let newList: any = [action.payload].concat(state.posts);
      state.posts = newList;
    },
    addLikePosts: (state, action: PayloadAction<TPost>) => {
      let newList: any = [action.payload].concat(state.likePosts);
      state.likePosts = newList;
    },
    updatePosts: (state, action) => {
      state.posts = action.payload;
    },
    updateLikePosts: (state, action) => {
      state.likePosts = action.payload;
    },
    addComment: (state, action) => {
      let newComment: any = [action.payload].concat(state.posts);
      state.posts = action.payload;
    },
  },
});

export const {
  initPosts,
  addPosts,
  addLikePosts,
  updatePosts,
  updateLikePosts,
  addComment,
} = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectLikePosts = (state: RootState) => state.posts.likePosts;
export default postsSlice.reducer;
