import styled from "styled-components";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormItem = styled.div`
  margin-bottom: 5px;
  position: relative;

  & label {
    display: block;
  }
`;

export const FormInput = styled.input`
  outline: none;
  width: 100%;
  height: 30px;
  padding-left: 5px;
  border: 2px solid #b5cda3;
  border-radius: 5px;
`;

export const SubmitButton = styled.button`
  background: #b5cda3;
  font-weight: 700;
  font-size: 15px;
  padding: 9px 24px;
  display: inline-block;
  border: none;
  border-radius: 4px;
  width: 120px;
  margin-left: 50%;
  transform: translate(-50%);
  color: #fff;
  cursor: pointer;
`;

export const Label = styled.label<{ isOver?: boolean }>`
  color: ${(props) => (props.isOver ? "#ff5c58" : "#3a3a3a")};
  font-size: 15px;
  margin-bottom: 5px;
`;

const Error = styled.div`
  display: flex;
  color: #ff5c58;
  font-size: 14px;
  margin-top: 5px;

  & svg {
    margin-right: 5px;
  }
`;

export const ErrorMessage: React.FC = ({ children }) => {
  return (
    <Error>
      <FontAwesomeIcon icon={faExclamationCircle} />
      {children}
    </Error>
  );
};
