import React from "react";

import { AUTH_PAGE, CREATE_PAGE, ISSUES_PAGE } from "../consts";
import { AuthPage } from "../pages/auth/AuthPage";
import { CreatePage } from "../pages/create/CreatePage";
import { IssuesPage } from "../pages/issues/IssuesPage";
import { RootState } from "../SendIssue";

export const useRoutes = (contextValue: {
  state: RootState;
  dispatch: any;
}) => {
  //@ts-ignore
  const { state, dispatch } = contextValue;
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  const [isLogged, setIsLogged] = React.useState<boolean>(
    !!localStorage.getItem("token")
  );

  React.useEffect(() => {
    window.addEventListener("storage", () =>
      setIsLogged(!!localStorage.getItem("token"))
    );

    return () => {
      window.removeEventListener("storage", () => setIsLogged(false));
    };
  }, []);

  if (state.mainReducer.route === CREATE_PAGE) {
    return <CreatePage />;
  } else if (state.mainReducer.route === AUTH_PAGE) {
    return <AuthPage />;
  } else if (state.mainReducer.route === ISSUES_PAGE && isLogged) {
    return <IssuesPage />;
  } else {
    return null;
  }
};
