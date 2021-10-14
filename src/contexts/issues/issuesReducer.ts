import { ActionIssues, IssuesTypes } from "./contracts/actionsContract";
import { IssuesState, StatusesIssues } from "./contracts/entity";

export const issuesReducer = (
  state: IssuesState,
  action: ActionIssues
): IssuesState => {
  switch (action.type) {
    case IssuesTypes.SET_NEVER_CREATE:
      return {
        ...state,
        issuesStatus: StatusesIssues.NEVER_CREATE,
      };
    case IssuesTypes.SET_SUCCESS_CREATE:
      return {
        ...state,
        issuesStatus: StatusesIssues.SUCCESS_CREATE,
      };
    case IssuesTypes.SET_ISSUES:
      return {
        ...state,
        issues: action.payload,
        issuesStatus: StatusesIssues.NEVER_CREATE,
      };
    case IssuesTypes.REMOVE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter((el) => el.issue_id !== +action.payload),
      };
    case IssuesTypes.SET_SUCCESS_SOLVE:
      return {
        ...state,
        issues: state.issues.map((el) => {
          if (+el.issue_id === +action.payload) {
            el.status = false;
          }
          return el;
        }),
      };

    default:
      return state;
  }
};
