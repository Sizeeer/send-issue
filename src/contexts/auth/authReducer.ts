import { ActionAuth, AuthTypes } from "./contracts/actionsContract";
import { AuthState } from "./contracts/entity";

export const authReducer = (
  state: AuthState,
  action: ActionAuth
): AuthState => {
  switch (action.type) {
    case AuthTypes.SET_ADMIN:
      return { ...state, admin: action.payload };
    case AuthTypes.REMOVE_ADMIN:
      return { ...state, admin: null };

    default:
      return state;
  }
};
