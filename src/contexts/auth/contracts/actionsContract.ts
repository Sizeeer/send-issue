import { AuthorizedAdmin } from "./entity";

export enum AuthTypes {
  SET_ADMIN = "Main/SET_ADMIN",
  REMOVE_ADMIN = "Main/REMOVE_ADMIN",
}

export interface SetAdmin {
  type: AuthTypes.SET_ADMIN;
  payload: AuthorizedAdmin;
}

export interface RemoveAdmin {
  type: AuthTypes.REMOVE_ADMIN;
}

export type ActionAuth = SetAdmin | RemoveAdmin;
