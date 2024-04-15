import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/form/authReducer';
import { userReducer } from '../components/Contents/userReducer'; 

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const initialState = {};
const store = configureStore({
  preloadedState: initialState,
  reducer: rootReducer,
});

export default store;