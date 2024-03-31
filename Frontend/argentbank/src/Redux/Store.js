import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/form/authReducer'; 

const rootReducer = combineReducers({
  auth: authReducer,
    // Autre reducer ici
});

const initialState = {};

const store = configureStore({
  preloadedState: initialState,
  reducer: rootReducer,
});

export default store;
