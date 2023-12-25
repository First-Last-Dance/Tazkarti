/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import stad from "../../assets/images/stad.png";
import ChairIcon from "@mui/icons-material/Chair";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DropDown from "../../components/DropDown/DropDown";

import useFetchFunction from "../../hooks/useFetchFunction";
import { useAuth } from "../../contexts/Authentication";

import {
  Container,
  Stad,
  Seats,
  Seat,
  SeatsContainer,
  PartOne,
  PartTwo,
  Header,
  MyButton,
} from "./CreateStad.styled";
import { Box, Typography } from "@mui/material";
import TextField from "../../components/TextField/TextField";
import { createStad, isStadNameAvailable } from "../../services/stad";

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const CreateStad = () => {
  // const { id } = useParams();

  const [data, error, isLoading, dataFetch] = useFetchFunction();
  const [data2, error2, isLoading2, dataFetch2] = useFetchFunction();
  const auth = useAuth();

  const [seats, setSeats] = useState(5);
  const [numOfSeats, setNumOfSeats] = useState(5);
  const [stadName, setStadeName] = useState("");

  const [available, setAvailable] = useState(true);

  const handleSubmit = () => {
    if (
      stadName === "" ||
      stadName === undefined ||
      seats === undefined ||
      numOfSeats === undefined
    ) {
      alert("All fields are required");
    } else {
      if (available) {
        createStad(
          dataFetch,
          {
            stadiumName: stadName,
            numberOfRows: seats,
            numberOfSeatsPerRow: numOfSeats,
          },
          auth
        );
      } else {
        alert("Change stadium name");
      }
    }
  };

  useEffect(() => {
    if (stadName.length > 0 && !error) {
      alert("Stadium created successfully");
    }
  }, [data]);

  useEffect(() => {
    if (stadName !== undefined) {
      isStadNameAvailable(dataFetch2, { stadiumName: stadName.trim() }, auth);
    }
  }, [stadName]);

  useEffect(() => {
    if (data2.available !== undefined) {
      setAvailable(data2.available);
    }
  }, [data2]);

  return (
    <Container>
      <PartOne>
        <SeatsContainer>
          {Array(seats)
            .fill(null)
            .map((_, row) => (
              <Seats key={row}>
                {Array(numOfSeats)
                  .fill(null)
                  .map((_, col) => (
                    <Seat key={`${row}-${col}`} notSelected={false}>
                      <ChairIcon />
                    </Seat>
                  ))}
              </Seats>
            ))}
        </SeatsContainer>

        <Stad>
          <img src={stad} alt="Stadium" />
        </Stad>
      </PartOne>
      <PartTwo>
        <Header>Create Staduim</Header>

        <TextField
          label={"Name"}
          value={stadName}
          setValue={setStadeName}
          placeHolder={"Name"}
        />
        {!available && <Typography>Stadium name is taken</Typography>}
        <DropDown
          value={seats}
          setValue={setSeats}
          items={rows}
          label={"Number of rows"}
          isSplitted={false}
          placeHolder={"Number of rows"}
        />
        <DropDown
          value={numOfSeats}
          setValue={setNumOfSeats}
          items={cols}
          label={"Number of seats per row"}
          isSplitted={false}
          placeHolder={"Number of seats per row"}
        />

        <MyButton onClick={handleSubmit}>Create</MyButton>
      </PartTwo>
    </Container>
  );
};

export default CreateStad;
