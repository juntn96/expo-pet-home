import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  persistStore,
  persistCombineReducers,
  persistReducer,
} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/es/storage";
import rootSaga from "./sagas/rootSaga";
import reducers from "./reducers";
// import { toast } from "./reducers/UIActions";
// import AuthReducer from "./reducers/AuthReducer";
// import PostReducer from "./reducers/PostReducer";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const config = {
  timeout: 0,
  key: "root",
  storage,
  blacklist: ["ui", "post"],
};

const persistedReducer = persistReducer(config, reducers);

const enhance = [applyMiddleware(...middleware)];

export default function configureStore() {
  let store = createStore(persistedReducer, {}, compose(...enhance));
  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);
  return { persistor, store };
}
