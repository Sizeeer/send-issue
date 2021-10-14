import { authReducer } from "./auth/authReducer";
import { issuesReducer } from "./issues/issuesReducer";
import { mainReducer } from "./main/mainReducer";
import { combineReducers } from "./../utils/combineReducers";
export const rootReducer = combineReducers({
  mainReducer,
  issuesReducer,
  authReducer,
});
