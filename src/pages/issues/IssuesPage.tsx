import React from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

import issueApi from "../../api/issueApi";
import applause from "../../clapping.png";
import { EmptyText } from "../../components/styled/styledComponents";
import { setIssues, solveIssue } from "../../contexts/issues/actions";
import { setLoadingMain, setNever } from "../../contexts/main/actions";
import { MainContext } from "../../SendIssue";

const WrapperIssues = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  max-height: 350px;
  overflow-y: auto;
  padding-right: 10px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #c9e4c5;
  }

  ::-webkit-scrollbar-thumb {
    background: #b5cda3;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #c1ac95;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 90%;

  & h2 {
    font-size: 18px;
    overflow-wrap: anywhere;
  }
`;

const IssueCard = styled.div`
  width: 100%;
  padding: 7px 13px;
  border: 2px solid #b5cda3;
  margin-bottom: 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const bounce = keyframes`
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

const Custom = styled.label`
    --background: #fff;
    --border: #b5cda3;
    --border-hover: #b5cda3;
    --border-active: #b5cda3;
    --tick: #fff;
    position: relative;
    input,
    svg {
      width: 21px;
      height: 21px;
      display: block;
    }
    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      outline: none;
      background: var(--background);
      border: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      border-radius: 4px;
      transition: box-shadow 0.3s;
      box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));
      &:hover {
        --s: 2px;
        --b: var(--border-hover);
      }
      &:checked {
        --b: var(--border-active);
      }
    }
    svg {
      pointer-events: none;
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke: var(--stroke, var(--border-active));
      position: absolute;
      top: 0;
      left: 0;
      width: 21px;
      height: 21px;
      transform: scale(var(--scale, 1)) translateZ(0);
    }
    &.path {
      input {
        &:checked {
          --s: 2px;
          transition-delay: 0.4s;
          & + svg {
            --a: 16.1 86.12;
            --o: 102.22;
          }
        }
      }
      svg {
        stroke-dasharray: var(--a, 86.12);
        stroke-dashoffset: var(--o, 86.12);
        transition: stroke-dasharray 0.6s, stroke-dashoffset 0.6s;
      }
    }
    &.bounce {
      --stroke: var(--tick);
      input {
        &:checked {
          --s: 11px;
          & + svg {
            animation: ${bounce} 0.4s linear forwards 0.2s;
          }
        }
      }
      svg {
        --scale: 0;
      }
    }

  
  }
`;

interface CustomCheckboxProps {
  checked: boolean;
  solveIssue: () => Promise<void>;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  solveIssue,
}) => {
  return (
    <Custom className="checkbox path">
      <input type="checkbox" checked={checked} onChange={solveIssue} />
      <svg viewBox="0 0 21 21">
        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
      </svg>
    </Custom>
  );
};

export const IssuesPage = () => {
  const { state, dispatch } = React.useContext(MainContext);

  const getIssues = React.useCallback(async () => {
    dispatch(setLoadingMain());
    const asyncIssues = await issueApi.get();
    dispatch(setIssues(asyncIssues));
    dispatch(setNever());
  }, [dispatch]);

  const solveIssueHandler = async (id: string): Promise<void> => {
    try {
      dispatch(solveIssue(id));
      await issueApi.solve(id);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getIssues();
  }, [getIssues]);

  return ReactDOM.createPortal(
    <WrapperIssues>
      {state.issuesReducer.issues.length <= 0 ? (
        <EmptyText>Пусто(</EmptyText>
      ) : (
        state.issuesReducer.issues.map((el, i) => (
          <IssueCard key={i + el.title}>
            <ContentWrapper>
              <h2>{el.title}</h2>
              <span>{el.influence}</span>
            </ContentWrapper>
            <CustomCheckbox
              checked={!el.status}
              solveIssue={() => solveIssueHandler(el.issue_id.toString())}
            />
          </IssueCard>
        ))
      )}
    </WrapperIssues>,
    document.querySelector(".issues_portal")
  );
};
