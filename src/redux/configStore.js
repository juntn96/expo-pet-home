import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';

import storage from 'redux-persist/es/storage';

import AuthReducer from './reducers/AuthReducer';

const config = {
  key: 'root',
  storage
}

const reducer = persistCombineReducers(config, {
  userData: AuthReducer,
});

export default function configureStore() {
  let store = createStore(reducer)
  let persistor = persistStore(store)
  return { persistor, store }
}
