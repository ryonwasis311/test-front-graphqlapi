import videoReducer from "./video";
import postsReducer from "./posts";
import userReducer from "./user";
import buttonReducer from "./button";
import userGroupReducer from "./userGroup";

const rootReducers = {
  video: videoReducer,
  posts: postsReducer,
  user: userReducer,
  button:buttonReducer,
  userGroup: userGroupReducer,
};

export default rootReducers;
