import { Admin } from "../../../api/authApi";

export type AuthorizedAdmin = Omit<Admin, "token" | "website">;

export interface AuthState {
  admin?: AuthorizedAdmin;
}
