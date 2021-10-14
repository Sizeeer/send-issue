import { AuthorizedAdmin } from "../contexts/auth/contracts/entity";
import { axios } from "../core/axios";

export interface Admin {
  admin_id: number;
  login: string;
  token: string;
  website: string;
}

class AuthApi {
  async login(username: string, password: string): Promise<AuthorizedAdmin> {
    const data = await axios
      .post<{ admin: Admin }>("/auth/login", {
        username,
        password,
      })
      .then(({ data }) => data.admin);

    window.localStorage.setItem("token", data.token);
    window.dispatchEvent(new Event("storage"));

    delete data.token;
    delete data.website;

    return data;
  }

  async register(login: string, password: string): Promise<void> {
    await axios.post("/auth/register", { login, password });
  }
}

export default new AuthApi();
