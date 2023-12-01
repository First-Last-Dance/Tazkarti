/* eslint-disable react/jsx-key */
import stad from "../../assets/images/stad.png";
import ChairIcon from "@mui/icons-material/Chair";

import { useState } from "react";

import { Container, Stad, Seats, Seat } from "./MatchReserve.styled";

const seats = [
  [
    { userName: "John" },
    { userName: "Alice" },
    { userName: "Bob" },
    { userName: "Bob" },
    { userName: "Bob" },
    { userName: "Bob" },
  ],
  [
    { userName: "Emma" },
    { userName: "" },
    { userName: "Michael" },
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
];

const MatchReserve = () => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5); // Number of seats per row

  return (
    <Container>
      {seats.map((rowSeats, row) => (
        <Seats key={row}>
          {rowSeats.map((seat, col) => (
            <Seat notSelected = {seat.userName == ""}>
              <ChairIcon />
            </Seat>
          ))}
        </Seats>
      ))}

      <Stad>
        <img src={stad} />
      </Stad>
    </Container>
  );
};

export default MatchReserve;
