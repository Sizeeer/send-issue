import { AuthTypes, RemoveAdmin, SetAdmin } from "./contracts/actionsContract";
import { AuthorizedAdmin } from "./contracts/entity";

export const setAdminData = (payload: AuthorizedAdmin): SetAdmin => ({
  type: AuthTypes.SET_ADMIN,
  payload,
});

export const removeAdminData = (): RemoveAdmin => ({
  type: AuthTypes.REMOVE_ADMIN,
});
