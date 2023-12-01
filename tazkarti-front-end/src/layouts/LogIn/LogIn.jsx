/* eslint-disable react/no-unescaped-entities */
import TextField from "../../components/TextField/TextField";
import { Change, Container, Header, MyButton } from "./LogIn.styled";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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

      <MyButton>Log In</MyButton>
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
