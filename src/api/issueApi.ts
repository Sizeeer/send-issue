import { Issue } from "../contexts/issues/contracts/entity";
import { axios } from "../core/axios";

class IssueApi {
  async get(): Promise<Issue[]> {
    const issues = await axios
      .get<{ issues: Issue[] }>("/issue/get")
      .then(({ data }) => data.issues);
    console.log(issues);

    return issues;
  }

  async create(influence: string, title: string) {
    await axios.post("/issue/create", { influence, title });
    return;
  }

  async solve(id: string): Promise<void> {
    await axios.post(`/issue/solve/${id}`);
  }
}
export default new IssueApi();
