import { ActionAuth } from "../contexts/auth/contracts/actionsContract";
import { RootState } from "../SendIssue";
import { ActionIssues } from "./../contexts/issues/contracts/actionsContract";
import { ActionMain } from "./../contexts/main/contracts/actionsContract";

type ActionRoot = ActionAuth | ActionIssues | ActionMain;

export function combineReducers(reducers: any) {
  return (state: RootState, action: ActionRoot): RootState => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState as RootState;
  };
}
