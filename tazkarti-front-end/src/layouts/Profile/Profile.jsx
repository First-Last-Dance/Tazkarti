/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Container, Header, Role, Splitter } from "./Profile.styled";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Authentication";
import useFetchFunction from "../../hooks/useFetchFunction";
import { getUserData } from "../../services/auth";
import { egyptGovernorates } from "../../constants";
import TextField from "../../components/TextField/TextField";
import DropDown from "../../components/DropDown/DropDown";
import MyDatePicker from "../../components/DatePicker/DatePicker";
import Gender from "../../components/Gender/Gender";
import SwitchButton from "../../components/SwitchButton/SwitchButton";

import dayjs from "dayjs";

const Profile = () => {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [edit, setEdit] = useState(false);

  const [data, error, isLoading, dataFetch] = useFetchFunction();

  useEffect(() => {
    getUserData(dataFetch, auth);
  }, []);

  useEffect(() => {
    if (data) {
      setEmail(data.email);
      setUserName(data.userName);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDate(dayjs(data.birthDate));
      setGender(data.gender);
      setCity(data.city);
      setAddress(data.address);
      setRole(data.role);
    }
  }, [data]);

  return (
    <Container>
      <Splitter>
        <Header>Profile</Header>
        <SwitchButton
          checked={edit}
          setChecked={setEdit}
          label={"Enable Edit"}
        />
      </Splitter>
      {!isLoading && data && (
        <>
          <TextField
            label={"Email"}
            placeHolder={"Email"}
            value={email}
            setValue={setEmail}
            disabled={!edit}
          />
          <Splitter>
            {" "}
            <TextField
              label={"Username"}
              placeHolder={"Username"}
              value={userName}
              setValue={setUserName}
              isSplitted={true}
              disabled={!edit}
            />
            <Role>Role: {role}</Role>
          </Splitter>
          <Splitter>
            <TextField
              label={"First Name"}
              placeHolder={"First Name"}
              value={firstName}
              setValue={setFirstName}
              isSplitted={true}
              disabled={!edit}
            />
            <TextField
              label={"Last Name"}
              placeHolder={"Last Name"}
              value={lastName}
              setValue={setLastName}
              isSplitted={true}
              disabled={!edit}
            />
          </Splitter>
          <Splitter>
            <Gender value={gender} setValue={setGender} disabled={!edit} />
            <MyDatePicker
              value={date}
              setValue={setDate}
              disabled={!edit}
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
              disabled={!edit}
            />
            <TextField
              label={"Address"}
              placeHolder={"Address"}
              value={address}
              setValue={setAddress}
              isSplitted={true}
              disabled={!edit}
            />
          </Splitter>
        </>
      )}
    </Container>
  );
};

export default Profile;
