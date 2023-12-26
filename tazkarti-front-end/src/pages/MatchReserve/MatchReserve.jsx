/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import stad from "../../assets/images/stad.png";
import ChairIcon from "@mui/icons-material/Chair";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Stad, Seats, Seat, MyButton } from "./MatchReserve.styled";
import { useAuth } from "../../contexts/Authentication";
import useFetchFunction from "../../hooks/useFetchFunction";
import { getSeats, reserve } from "../../services/match";

// import io from "socket.io-client";
// const socket = io.connect("ws://localhost:3001", {
//   path: "ws://localhost:3001/match/seats",
// });

// const socket = io.connect("ws://localhost:3001", {
//   path: "/match/seats",
// });

// socket.on("connect_error", (error) => {
//   console.error("WebSocket connection error:", error);
//   // Handle connection error
// });

// var WebSocketClient = require('websocket').client;

// import WebSocketClient from "websocket";

// var socket = new WebSocketClient();

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
  // const [reservedSeats, setReservedSeats] = useState([]);

  const auth = useAuth();
  const [data, error, isLoading, dataFetch] = useFetchFunction();
  const [data2, error2, isLoading2, dataFetch2] = useFetchFunction();

  const handleReserve = (row, col) => {
    let updatedSeats = [...seats];
    updatedSeats[row][col] = 0;
    setSeats(updatedSeats);
    setReservedSeats([...reservedSeats, { row, col }]);
  };

  const handleCancelReserve = (row, col) => {
    let updatedSeats = [...seats];
    updatedSeats[row][col] = -1;
    setSeats(updatedSeats);
    setReservedSeats([...reservedSeats, { row, col }]);
  };

  useEffect(() => {
    console.log("Seats:", seats);
  }, [seats]);
  // useEffect(() => {
  //   socket.on("message", (newSeats) => {
  //     console.log("newSeats:", newSeats);
  //     setSeats(newSeats);
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   socket.on("connect", function (connection) {
  //     connection.emit("");
  //   });
  //   console.log(socket);
  // }, []);

  useEffect(() => {
    // console.log("Entered 54");
    setTimeout(function () {
      getSeats(dataFetch, { matchID: id.toString() }, auth);
    }, 1);
  }, []);

  useEffect(() => {
    setSeats(data);
    // console.log("data:", data);
  }, [data]);

  const handleSubmit = () => {
    const cardNumber = window.prompt("Enter your 16-digit credit card number:");
    const csv = window.prompt("Enter your 3-digit CSV number:");

    if (cardNumber && cardNumber.length === 16 && csv && csv.length === 3) {
      reserve(dataFetch2, { reserveSeats: seats }, auth, id);
    } else {
      window.alert("Please enter valid credit card details.");
    }
  };

  useEffect(() => {
    console.log("Data2:", data2);
  }, [data2]);

  return (
    <>
      {isLoading && <h1>Loading</h1>}
      {!isLoading && (
        <Container>
          {seats.map((rowSeats, row) => (
            <Seats key={row}>
              {rowSeats.map((seat, col) => (
                <Seat
                  key={`${row}-${col}`}
                  notSelected={seat === -1}
                  fromMe={seat === 0}
                  onClick={() => {
                    if (seat === -1) {
                      handleReserve(row, col);
                    } else if (seat === 0) {
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
      )}
    </>
  );
};

export default MatchReserve;
