/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import stad from "../../assets/images/stad.png";
import ChairIcon from "@mui/icons-material/Chair";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Stad, Seats, Seat, MyButton } from "./MatchReserve.styled";
import { useAuth } from "../../contexts/Authentication";
import useFetchFunction from "../../hooks/useFetchFunction";


import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const MatchReserve = () => {
  const { id } = useParams();

  const [seats, setSeats] = useState([
    [
      { userName: "John" },
      { userName: "" },
      { userName: "Bob" },
      { userName: "" },
      { userName: "Bob" },
      { userName: "Bob" },
    ],
    [
      { userName: "Emma" },
      { userName: "" },
      { userName: "Michael" },
      { userName: "" },
      { userName: "Bob" },
    ],
    [
      { userName: "Sophia" },
      { userName: "William" },
      { userName: "" },
      { userName: "Bob" },
      { userName: "Bob" },
    ],
    [
      { userName: "Sophia" },
      { userName: "William" },
      { userName: "" },
      { userName: "Bob" },
      { userName: "Bob" },
    ],
  ]);

  const [reservedSeats, setReservedSeats] = useState([]);

  const auth = useAuth();
  const [data, error, isLoading, dataFetch] = useFetchFunction();

  const handleReserve = (row, col) => {
    const updatedSeats = [...seats];
    updatedSeats[row][col].userName = auth.getUserName();
    setSeats(updatedSeats);
    setReservedSeats([...reservedSeats, { row, col }]);
  };

  const handleCancelReserve = (row, col) => {
    const updatedSeats = [...seats];
    updatedSeats[row][col].userName = "";
    setSeats(updatedSeats);
    setReservedSeats([...reservedSeats, { row, col }]);
  };

  const handleSubmit = () => {

  }

  return (
    <Container>
      {seats.map((rowSeats, row) => (
        <Seats key={row}>
          {rowSeats.map((seat, col) => (
            <Seat
              key={`${row}-${col}`}
              notSelected={seat.userName === ""}
              fromMe={seat.userName === auth.getUserName()}
              onClick={() => {
                if (seat.userName === "") {
                  handleReserve(row, col);
                } else if (seat.userName === auth.getUserName()) {
                  handleCancelReserve(row, col);
                }
              }}
            >
              <ChairIcon />
            </Seat>
          ))}
        </Seats>
      ))}

      <Stad>
        <img src={stad} alt="Stadium" />
      </Stad>

      <MyButton onClick={handleSubmit}>Save</MyButton>
    </Container>
  );
};

export default MatchReserve;
