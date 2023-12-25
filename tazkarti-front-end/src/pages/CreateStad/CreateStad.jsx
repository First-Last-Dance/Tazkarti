/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import stad from "../../assets/images/stad.png";
import ChairIcon from "@mui/icons-material/Chair";

import { useState } from "react";
import { useParams } from "react-router-dom";

import DropDown from "../../components/DropDown/DropDown";

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
import { Box } from "@mui/material";
import TextField from "../../components/TextField/TextField";

const rows = [1, 2, 3, 4, 5];
const cols = [1, 2, 3, 4, 5];

const CreateStad = () => {
  const { id } = useParams();

  const [seats, setSeats] = useState(5);
  const [numOfSeats, setNumOfSeats] = useState(5);
  const [stadName, setStadeName] = useState("");

  const handleSubmit = () => {};

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
