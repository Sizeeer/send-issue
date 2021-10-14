import styled from "styled-components";
import { ToggleModes } from "../../pages/auth/contracts/contracts";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(250, 235, 224, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 300px;
  min-height: 300px;
  box-shadow: 0px 0px 46px -7px rgba(255, 255, 255, 0.8);
  border-radius: 2em;
  position: relative;
  padding-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 68px 20px 68px;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 36px;
  color: #3a3a3a;
`;

export const CloseButton = styled.button`
  border: none;
  display: inline;
  position: absolute;
  top: 21px;
  font-size: 21px;
  color: #c0c5cb;
  right: 21px;
  background: none;
  cursor: pointer;
`;

export const TogglePanel = styled.div<{ toggleMode: ToggleModes }>`
  width: 100%;
  text-align: center;
  cursor: pointer;
  height: 40px;
  transition: 0.3s ease all;
  position: relative;
  background: #c1ac95;
  margin-bottom: 16px;

  & button {
    display: inline-block;
    background: none;
    width: 49%;
    height: 100%;
    color: #fff;
    position: relative;
    border: none;
    transition: 0.3s ease all;
    padding-bottom: 1px;
    font-weight: 700;
    font-size: 15px;
    z-index: 11;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }

  & span {
    color: #c9e4c5;
    background-color: #c9e4c5;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    transition: 0.3s ease-out all;
    z-index: 10;
  }
`;

export const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(250, 235, 224, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const EmptyText = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-top: 0;
`;
