//rootReducer.js file.
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import emailReducer from "../slices/emailSlice.js"

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user,email"],
};

const rootReducer = combineReducers({
  user: authReducer,
  email:emailReducer

});

export default persistReducer(persistConfig, rootReducer);
