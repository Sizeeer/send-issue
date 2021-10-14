export enum StatusesIssues {
  SUCCESS_CREATE = "Issues/SUCCESS_CREATE",
  SUCCESS_SOLVE = "Issues/SUCCESS_SOLVE",
  NEVER_CREATE = "Issues/NEVER_CREATE",
}

export enum InfluenceIssue {
  SERIOUS = "Сильное",
  MIDDLE = "Среднее",
  EASY = "Почти не влияет",
}

export interface Issue {
  issue_id: number;
  title: string;
  influence: InfluenceIssue;
  status: boolean;
}

export interface IssuesState {
  issues: Issue[];
  issuesStatus: StatusesIssues;
}
