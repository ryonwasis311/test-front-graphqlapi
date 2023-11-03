import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IUser } from "../../types";

export interface UserState {
  users: IUser[];
  isLogin: boolean;
}

const initialState: UserState = {
  users: [],
  isLogin:
    typeof localStorage !== "undefined" && localStorage.getItem("token")
      ? true
      : false,
};

export const userGroupSlice = createSlice({
  name: "userGroup",
  initialState,
  reducers: {
    initUser: (state) => {
      state.users = [];
    },
    updateUserGroup: (state, action) => {
      state.users = action.payload;
    },
    
    addUserGroup : (state, action) =>{
      let newList: any = [action.payload].concat(state.users);
      state.users = newList;
    },
    deleteUserGroup : (state, action) =>{
      const updateIndex = state.users.findIndex(
        (x) => x._id === action.payload
      );
      state.users[updateIndex] =null ;
    },
    updateUser : (state, action) =>{
      const updateIndex = state.users.findIndex(
        (x) => x._id === action.payload.userId
      );
      state.users[updateIndex] =action.payload.newUser ;
    }
  },
});

export const {
  initUser,
  updateUserGroup,
  addUserGroup,
  updateUser,
  deleteUserGroup,
} = userGroupSlice.actions;
export const selectUserGroup = (state: RootState) => state.userGroup.users;
export default userGroupSlice.reducer;
