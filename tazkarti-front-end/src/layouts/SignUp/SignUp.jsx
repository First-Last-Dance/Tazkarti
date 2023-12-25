/* eslint-disable no-unused-vars */
import TextField from "../../components/TextField/TextField";
import { Container, Splitter, Header, MyButton, Change } from "./SignUp.styled";
import { useState, useEffect } from "react";
import MyDatePicker from "../../components/DatePicker/DatePicker";

import dayjs from "dayjs";
import Gender from "../../components/Gender/Gender";
import DropDown from "../../components/DropDown/DropDown";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Authentication";
import useFetchFunction from "../../hooks/useFetchFunction";
import { signUp } from "../../services/auth";

import { egyptGovernorates } from "../../constants";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [gender, setGender] = useState("male");
  const [city, setCity] = useState(egyptGovernorates[5]);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const [data, error, isLoading, dataFetch] = useFetchFunction();
  function convertToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = () => {
    signUp(dataFetch, {
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      birthDate: convertToYYYYMMDD(date),
      gender: gender,
      city: city,
      email: email,
      role: "fan",
    });
  };

  useEffect(() => {
    if (data && data.token) {
      auth.login({ username: userName, token: data.token, role: "fan" });
      navigate("/");
    }
  }, [data]);

  return (
    <Container>
      <Header>Sign Up</Header>
      <TextField
        label={"Email"}
        placeHolder={"Email"}
        value={email}
        setValue={setEmail}
      />
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
      <Splitter>
        <TextField
          label={"First Name"}
          placeHolder={"First Name"}
          value={firstName}
          setValue={setFirstName}
          isSplitted={true}
        />
        <TextField
          label={"Last Name"}
          placeHolder={"Last Name"}
          value={lastName}
          setValue={setLastName}
          isSplitted={true}
        />
      </Splitter>
      <Splitter>
        <Gender value={gender} setValue={setGender} />
        <MyDatePicker
          value={date}
          setValue={setDate}
          label={"Birth Date"}
        />{" "}
      </Splitter>
      <Splitter>
        <DropDown
          value={city}
          setValue={setCity}
          items={egyptGovernorates}
          label={"City"}
          isSplitted={true}
          placeHolder={"City"}
        />
        <TextField
          label={"Address"}
          placeHolder={"Address"}
          value={address}
          setValue={setAddress}
          isSplitted={true}
        />
      </Splitter>
      <MyButton onClick={handleSubmit}>Sign Up</MyButton>
      <Change>
        Have Acount ?{" "}
        <span
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </span>
      </Change>
    </Container>
  );
};

export default SignUp;
