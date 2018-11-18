import { createStore, combineReducers } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";

import storage from "redux-persist/es/storage";

import AuthReducer from "./reducers/AuthReducer";
import { toast } from "./reducers/UIActions";

const config = {
  timeout: 0,
  key: "root",
  storage,
  blacklist: ["ui"],
};

const reducer = persistCombineReducers(config, {
  userData: AuthReducer,
  ui: combineReducers({
    toast,
  }),
});

export default function configureStore() {
  let store = createStore(reducer);
  let persistor = persistStore(store);
  return { persistor, store };
}
