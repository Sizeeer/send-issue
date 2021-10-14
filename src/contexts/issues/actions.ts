import {
  IssuesTypes,
  RemoveIssue,
  SetIssues,
  SetNeverCreate,
  SetSuccessCreate,
  SetSuccessSolve,
} from "./contracts/actionsContract";
import { Issue } from "./contracts/entity";

export const setNeverCreate = (): SetNeverCreate => ({
  type: IssuesTypes.SET_NEVER_CREATE,
});

export const setSuccessCreate = (): SetSuccessCreate => ({
  type: IssuesTypes.SET_SUCCESS_CREATE,
});

export const setIssues = (payload: Issue[]): SetIssues => ({
  type: IssuesTypes.SET_ISSUES,
  payload,
});

export const removeIssue = (payload: string): RemoveIssue => ({
  type: IssuesTypes.REMOVE_ISSUE,
  payload,
});

export const solveIssue = (payload: string): SetSuccessSolve => ({
  type: IssuesTypes.SET_SUCCESS_SOLVE,
  payload,
});
