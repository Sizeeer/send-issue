import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import authApi from "../../../api/authApi";
import { ISSUES_PAGE } from "../../../consts";
import { setAdminData } from "../../../contexts/auth/actions";
import {
  setLoadingMain,
  setNever,
  setRoute,
} from "../../../contexts/main/actions";
import { MainContext } from "../../../SendIssue";
import {
  ErrorMessage,
  Form,
  FormInput,
  FormItem,
  Label,
  SubmitButton,
} from "../../styled/styledComponents";
import { AdminFormInputs } from "../contracts/contracts";

const schema = yup
  .object({
    username: yup.string().required("Введите логин"),
    password: yup.string().required("Введите пароль"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Пароли не совпадают!"),
  })
  .required();

export const AdminForm = () => {
  const { dispatch } = React.useContext(MainContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AdminFormInputs> = async (data) => {
    const { username, password } = data;
    try {
      dispatch(setLoadingMain());
      const admin = await authApi.login(username, password);
      dispatch(setAdminData(admin));
      dispatch(setRoute(ISSUES_PAGE));
      dispatch(setNever());
    } catch (e) {
      const message = (e as Error).message;
      console.log(message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <Label htmlFor="username">Логин</Label>
        <FormInput {...register("username")} id="username" />
        {errors.username?.message && (
          <ErrorMessage>
            <span>{errors.username?.message}</span>
          </ErrorMessage>
        )}
      </FormItem>
      <FormItem>
        <Label htmlFor="password">Пароль</Label>
        <div style={{ position: "relative" }}>
          <FormInput type="password" {...register("password")} id="password" />
          <FontAwesomeIcon
            icon={faLock}
            style={{
              position: "absolute",
              top: 7,
              right: 10,
              pointerEvents: "none",
            }}
          />
        </div>

        {errors.password?.message && (
          <ErrorMessage>
            <span>{errors.password?.message}</span>
          </ErrorMessage>
        )}
      </FormItem>
      <FormItem style={{ marginBottom: 16 }}>
        <Label htmlFor="password2">Повторите пароль</Label>
        <div style={{ position: "relative" }}>
          <FormInput
            type="password"
            {...register("password2")}
            id="password2"
          />
          <FontAwesomeIcon
            icon={faLock}
            style={{
              position: "absolute",
              top: 7,
              right: 10,
              pointerEvents: "none",
            }}
          />
        </div>

        {errors.password2?.message && (
          <ErrorMessage>
            <span>{errors.password2?.message}</span>
          </ErrorMessage>
        )}
      </FormItem>

      <SubmitButton type="submit">Войти</SubmitButton>
    </Form>
  );
};
