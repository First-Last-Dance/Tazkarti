/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import TextField from "../../components/TextField/TextField";
import { Change, Container, Header, MyButton } from "./LogIn.styled";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Authentication";
import useFetchFunction from "../../hooks/useFetchFunction";
import { getUserData, logIn } from "../../services/auth";

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = useAuth();

  const [data, error, isLoading, dataFetch] = useFetchFunction();
  const [data2, error2, isLoading2, dataFetch2] = useFetchFunction();

  const handleSubmit = () => {
    logIn(dataFetch, {
      userName: userName,
      password: password,
    });
  };

  useEffect(() => {
    if (data && data.token) {
      auth.login({ username: userName, token: data.token });
    }
  }, [data]);

  useEffect(() => {
    console.log("Entered 1");
    if (data.token) {
      console.log("Entered 2");
      if (auth && auth.getToken()) {
        console.log("Entered 3");
        getUserData(dataFetch2, auth);
      }
    }
  }, [auth]);

  useEffect(() => {
    if (data2 && data2.role) {
      auth.login({ username: userName, token: data.token, role: data2.role });
      navigate("/");
    }
  }, [data2]);

  return (
    <Container>
      <Header>Log In</Header>

      <TextField
        label={"Username"}
        placeHolder={"Username"}
        value={userName}
        setValue={setUserName}
      />
      <TextField
        label={"Password"}
        placeHolder={"Password"}
        value={password}
        setValue={setPassword}
      />

      <MyButton onClick={handleSubmit}>Log In</MyButton>
      <Change>
        Don't Have Acount ?{" "}
        <span
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </span>
      </Change>
    </Container>
  );
};

export default LogIn;
