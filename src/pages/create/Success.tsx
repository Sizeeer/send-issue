import React from "react";
import styled from "styled-components";

import { MainContext } from "../../SendIssue";
import { setNeverCreate } from "../../contexts/issues/actions";
import successIcon from "../../success.svg";
import { SubmitButton } from "../styled/styledComponents";
import LazyImage from "./LazyImage";

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SuccessText = styled.p`
  font-size: 22px;
  color: #3a3a3a;
  text-align: center;
`;

export const Success = () => {
  const { state, dispatch } = React.useContext(MainContext);

  const goToMain = () => {
    dispatch(setNeverCreate());
  };

  return (
    <SuccessWrapper>
      <LazyImage src={successIcon} alt={`Random image`} />

      <SuccessText>Спасибо, что помогаете сделать наш сайт лучше!</SuccessText>
      <SubmitButton
        style={{ padding: "15px 18px", maxWidth: "initial" }}
        onClick={goToMain}
      >
        Отправить ещё
      </SubmitButton>
    </SuccessWrapper>
  );
};
