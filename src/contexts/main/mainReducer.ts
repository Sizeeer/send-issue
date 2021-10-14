import { ActionMain, MainTypes } from "./contracts/actionsContract";
import { MainState, StatusesMain } from "./contracts/entity";

export const mainReducer = (
  state: MainState,
  action: ActionMain
): MainState => {
  switch (action.type) {
    case MainTypes.SET_LOADING_STATE:
      return { ...state, status: StatusesMain.LOADING };
    case MainTypes.SET_ERROR:
      return {
        ...state,
        status: StatusesMain.ERROR,
        error: action.payload,
      };
    case MainTypes.SET_NEVER:
      return { ...state, status: StatusesMain.NEVER };
    case MainTypes.SET_ROUTE:
      return { ...state, route: action.payload };

    default:
      return state;
  }
};
