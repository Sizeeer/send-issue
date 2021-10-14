import {
  MainTypes,
  SetError,
  SetLoadingState,
  SetNever,
  SetRoute,
} from "./contracts/actionsContract";

export const setLoadingMain = (): SetLoadingState => ({
  type: MainTypes.SET_LOADING_STATE,
});

export const setErrorMain = (payload: string): SetError => ({
  type: MainTypes.SET_ERROR,
  payload,
});

export const setNever = (): SetNever => ({
  type: MainTypes.SET_NEVER,
});

export const setRoute = (payload: string): SetRoute => ({
  type: MainTypes.SET_ROUTE,
  payload,
});
