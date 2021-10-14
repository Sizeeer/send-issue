export enum MainTypes {
  SET_LOADING_STATE = "Main/SET_LOADING_STATE",
  SET_NEVER = "Main/SET_NEVER",
  SET_ERROR = "Main/SET_ERROR",
  SET_ROUTE = "Main/SET_ROUTE",
}

export interface SetLoadingState {
  type: MainTypes.SET_LOADING_STATE;
}
export interface SetError {
  type: MainTypes.SET_ERROR;
  payload: string;
}
export interface SetNever {
  type: MainTypes.SET_NEVER;
}

export interface SetRoute {
  type: MainTypes.SET_ROUTE;
  payload: string;
}

export type ActionMain = SetLoadingState | SetError | SetNever | SetRoute;
