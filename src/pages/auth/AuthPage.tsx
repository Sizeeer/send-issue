import React from "react";
import styled from "styled-components";

import { MainContext } from "../../SendIssue";
import { AdminForm } from "./components/AdminForm";
import { ToggleModes } from "./contracts/contracts";

interface MainPageProps {}
const WrapperIssues = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  max-height: 350px;
  padding-right: 10px;
`;

export const AuthPage: React.FC<MainPageProps> = ({}) => {
  const { state } = React.useContext(MainContext);

  return <AdminForm />;
};
