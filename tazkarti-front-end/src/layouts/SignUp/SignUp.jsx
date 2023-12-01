import TextField from "../../components/TextField/TextField";
import { Container, Splitter, Header, MyButton, Change } from "./SignUp.styled";
import { useState } from "react";
import MyDatePicker from "../../components/DatePicker/DatePicker";

import dayjs from "dayjs";
import Gender from "../../components/Gender/Gender";
import DropDown from "../../components/DropDown/DropDown";

import { useNavigate } from "react-router-dom";

const egyptGovernorates = [
  "alexandria",
  "aswan",
  "asyut",
  "beheira",
  "beni suef",
  "cairo",
  "dakahlia",
  "damietta",
  "faiyum",
  "gharbeya",
  "giza",
  "ismailia",
  "kafr el-sheikh",
  "luxor",
  "matrouh",
  "minya",
  "monufia",
  "new valley",
  "north sinai",
  "port said",
  "qalyubia",
  "qena",
  "red sea",
  "sohag",
  "south sinai",
  "suez",
];

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
        <MyDatePicker value={date} setValue={setDate} />{" "}
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
      <MyButton>Sign Up</MyButton>
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
