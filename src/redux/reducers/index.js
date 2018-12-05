import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostReducer from "./PostReducer";
import { toast, appLoading } from "./UIActions";
import NotificationReducer from "./NotificationReducer";

export default combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  notification: NotificationReducer,
  ui: combineReducers({
    toast,
    appLoading,
  }),
});
