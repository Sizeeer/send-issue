import { Issue } from "./entity";

export enum IssuesTypes {
  SET_NEVER_CREATE = "Main/SET_NEVER_STATE",
  SET_SUCCESS_CREATE = "Main/SET_SUCCESS_STATE",
  SET_SUCCESS_SOLVE = "Main/SET_SUCCESS_SOLVE",
  SET_ISSUES = "Main/SET_ISSUES",
  REMOVE_ISSUE = "Main/REMOVE_ISSUE",
}

export interface SetSuccessCreate {
  type: IssuesTypes.SET_SUCCESS_CREATE;
}

export interface SetNeverCreate {
  type: IssuesTypes.SET_NEVER_CREATE;
}

export interface SetSuccessSolve {
  type: IssuesTypes.SET_SUCCESS_SOLVE;
  payload: string;
}

export interface SetIssues {
  type: IssuesTypes.SET_ISSUES;
  payload: Issue[];
}

export interface RemoveIssue {
  type: IssuesTypes.REMOVE_ISSUE;
  payload: string;
}

export type ActionIssues =
  | SetNeverCreate
  | SetSuccessCreate
  | SetIssues
  | RemoveIssue
  | SetSuccessSolve;
