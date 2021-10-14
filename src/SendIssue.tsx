import React from "react";

import authApi from "./api/authApi";
import { Loader } from "./components/Loader";
import {
  CloseButton,
  Content,
  LoaderOverlay,
  Overlay,
  Title,
  TogglePanel,
  Wrapper,
} from "./components/styled/styledComponents";
import { AUTH_PAGE, CREATE_PAGE, ISSUES_PAGE } from "./consts";
import { setAdminData } from "./contexts/auth/actions";
import { AuthorizedAdmin } from "./contexts/auth/contracts/entity";
import { Issue, StatusesIssues } from "./contexts/issues/contracts/entity";
import { setLoadingMain, setNever, setRoute } from "./contexts/main/actions";
import { StatusesMain } from "./contexts/main/contracts/entity";
import { rootReducer } from "./contexts/rootReducer";
import { useRoutes } from "./hooks/useRoutes";
import { ToggleModes } from "./pages/auth/contracts/contracts";

// import logger from "use-reducer-logger";

type Keys = {
  [key: number]: boolean;
};
let keys: Keys = {};

export interface RootState {
  mainReducer: {
    status: StatusesMain;
    route: string;
    error?: string;
  };
  issuesReducer: {
    issues: Issue[];
    issuesStatus: StatusesIssues;
  };
  authReducer: {
    admin?: AuthorizedAdmin;
  };
}

const initialState: RootState = {
  mainReducer: {
    status: StatusesMain.NEVER,
    route: CREATE_PAGE,
  },
  issuesReducer: {
    issues: [],
    issuesStatus: StatusesIssues.NEVER_CREATE,
  },
  authReducer: {},
};

export const MainContext = React.createContext<{
  state: RootState;
  dispatch: any;
}>({ state: initialState, dispatch: () => {} });

interface AppProps {
  login: string;
  password: string;
}

export const SendIssue: React.FC<AppProps> = ({ login, password }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);

  const contextValue = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  const [toggleMode, setToggleMode] = React.useState<ToggleModes>(
    ToggleModes.USER
  );
  //fixme Не забыть поменять на false чтобы работало нажаите кнопок
  const [isVisible, setIsVisible] = React.useState<boolean>(true);

  const route = useRoutes(contextValue);

  const leftChoice = React.createRef<HTMLButtonElement>();
  const rightChoice = React.createRef<HTMLButtonElement>();
  const activeChoice = React.createRef<HTMLSpanElement>();

  const switchLeft = (): void => {
    setToggleMode(ToggleModes.USER);
    dispatch(setRoute(CREATE_PAGE));
    rightChoice.current.classList.remove("active-case");
    leftChoice.current.classList.add("active-case");
    activeChoice.current.style.left = "0%";
  };

  const switchRight = (): void => {
    setToggleMode(ToggleModes.ADMIN);
    dispatch(setRoute(state.authReducer.admin ? ISSUES_PAGE : AUTH_PAGE));
    rightChoice.current.classList.add("active-case");
    leftChoice.current.classList.remove("active-case");
    activeChoice.current.style.left = "50%";
  };

  React.useEffect(() => {
    const initialize = async () => {
      dispatch(setLoadingMain());

      if (!!localStorage.getItem("token")) {
        await authApi.login(login, password).then((data) => {
          dispatch(setAdminData(data));
        });
      } else if (login && password) {
        await authApi.register(login, password);
      }
      dispatch(setNever());
    };
    initialize();
  }, [login, password]);

  const pressKey = React.useCallback((e: KeyboardEvent) => {
    if (e.which === 17) {
      keys[e.which] = true;
    }
    if (e.which === 46) {
      keys[e.which] = true;
    }

    if (keys[17] && keys[46]) {
      setIsVisible(true);
    }
  }, []);

  const upKey = React.useCallback((e: KeyboardEvent) => {
    if (e.which === 17) {
      keys[e.which] = false;
    }
    if (e.which === 46) {
      keys[e.which] = false;
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", pressKey);
    document.addEventListener("keyup", upKey);

    return () => {
      document.removeEventListener("keydown", pressKey);
      document.removeEventListener("keyup", upKey);
    };
  }, [pressKey, upKey]);

  return isVisible ? (
    <MainContext.Provider value={contextValue}>
      <Overlay>
        <Wrapper className="issues_portal">
          {state.mainReducer.status === StatusesMain.LOADING && (
            <LoaderOverlay>
              <Loader />
            </LoaderOverlay>
          )}

          <CloseButton onClick={() => setIsVisible(false)}>✖</CloseButton>
          <Content>
            <Title>🔧SENDISSUE</Title>
            <TogglePanel toggleMode={toggleMode}>
              <span ref={activeChoice}></span>
              <button ref={leftChoice} onClick={switchLeft}>
                Создать
              </button>
              <button ref={rightChoice} onClick={switchRight}>
                {state.authReducer.admin ? "Кабинет" : "Войти"}
              </button>
            </TogglePanel>
            {route}
          </Content>
        </Wrapper>
      </Overlay>
    </MainContext.Provider>
  ) : null;
};
