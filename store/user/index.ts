import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IUser } from "../../types";

export interface UserState {
  user: IUser;
  isLogin: boolean;
}

const initialState: UserState = {
  user: {
    _id: "",
    username: "",
    email:"",
    avatar: "",
    password:""
  },
  isLogin:
    typeof localStorage !== "undefined" && localStorage.getItem("token")
      ? true
      : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state) => {
      state.user = {
        _id: "",
        username: "",
      };
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateEmail: (state, action) => {
      state.user.email = action.payload;
    },
    updateName: (state, action) => {
      state.user.username = action.payload;
    },
    updatePassword: (state, action) => {
      state.user.password = action.payload;
    },
    updateId: (state, action) => {
      state.user._id = action.payload;
    },
    updateAvatar: (state, action) => {
      return { ...state, user: { ...state.user, avatar: action.payload } };
    },
    logIn: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLogin: true,
      };
    },
    logOut: (state) => {
      state.user = {
        _id: "",
        username: "",
        email:"",
        password:"",
      };
      state.isLogin = false;
      localStorage.removeItem("token");
    },
  },
});

export const {
  initUser,
  updateUser,
  updateName,
  updateId,
  updateAvatar,
  updateEmail,
  updatePassword,
  logIn,
  logOut,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
