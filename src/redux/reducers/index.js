import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostReducer from "./PostReducer";
import { toast, appLoading } from "./UIActions";

export default combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  ui: combineReducers({
    toast,
    appLoading
  }),
});
