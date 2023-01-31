import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "all"
  });

  const onSubmit = async (value) => {
    const { payload } = await dispatch(fetchUserData(value));

    if (!payload) {
      return alert("Не удалось войти");
    };

    if ("token" in payload) {
      window.localStorage.setItem("token", payload.token)
    };
  };

  if (isAuth) {
    return <Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          { ...register("email", { required: "Укажите почту" }) }
          fullWidth
        />
        <TextField 
        className={styles.field} 
        label="Пароль"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        { ...register("password", { required: "Укажите пароль" }) } 
        fullWidth />
        <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
