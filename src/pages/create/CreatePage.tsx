import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

import issueApi from "../../api/issueApi";
import { MainContext } from "../../SendIssue";
import { setSuccessCreate } from "../../contexts/issues/actions";
import { StatusesIssues } from "../../contexts/issues/contracts/entity";
import {
  setErrorMain,
  setLoadingMain,
  setNever,
} from "../../contexts/main/actions";
import { UserFormInputs } from "../auth/contracts/contracts";
import {
  ErrorMessage,
  Form,
  FormItem,
  Label,
  SubmitButton,
} from "../styled/styledComponents";
import { Success } from "./Success";

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  max-height: 40px;
  border: 2px solid #b5cda3;
  border-radius: 5px;
  outline: none;
  padding-left: 5px;
  padding-top: 5px;
`;

const Select = styled.select`
  appearance: none;
  outline: none;
  width: 100%;
  height: 30px;
  padding-left: 5px;
  border: 2px solid #b5cda3;
  border-radius: 5px;
`;

const schema = yup
  .object({
    title: yup
      .string()
      .required("Описание обязательно")
      .max(80, "Максимальная длина описания 80 символов"),
    influence: yup.string().required("Выберите степень влияния"),
  })
  .required();

export const CreatePage = () => {
  const { state, dispatch } = React.useContext(MainContext);

  const [titleValue, setTitleValue] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    const { influence, title } = data;
    console.log(title);

    try {
      dispatch(setLoadingMain());
      await issueApi.create(influence, title);
      dispatch(setSuccessCreate());
      dispatch(setNever());
    } catch (e) {
      const message = (e as Error).message;
      dispatch(setErrorMain(message));
    }
  };

  if (state.issuesReducer.issuesStatus === StatusesIssues.SUCCESS_CREATE) {
    return <Success />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <Label htmlFor="title" isOver={titleValue.length > 80}>
          Описание {titleValue.length}/80
        </Label>
        <Textarea
          {...register("title", {
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              setTitleValue(event.target.value);
            },
          })}
          id="title"
          value={titleValue}
        />
        {errors.title?.message && (
          <ErrorMessage>
            <span>{errors.title?.message}</span>
          </ErrorMessage>
        )}
      </FormItem>
      <FormItem style={{ marginBottom: 16 }}>
        <Label htmlFor="influence">Влияние на работу приложения</Label>
        <div style={{ position: "relative" }}>
          <Select {...register("influence")} id="influence">
            {["", "Сильное", "Среднее", "Почти не влияет"].map(
              (value: string) => {
                return value ? (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ) : (
                  <option key={value} value={value} selected hidden>
                    {value}
                  </option>
                );
              }
            )}
          </Select>
          <FontAwesomeIcon
            icon={faArrowDown}
            style={{
              position: "absolute",
              top: 7,
              right: 8,
              pointerEvents: "none",
            }}
          />
        </div>
        {errors.influence?.message && (
          <ErrorMessage>
            <span>{errors.influence?.message}</span>
          </ErrorMessage>
        )}
      </FormItem>
      <SubmitButton type="submit">Отправить</SubmitButton>
    </Form>
  );
};
