/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import stad from "../../assets/images/stad.png";
import ChairIcon from "@mui/icons-material/Chair";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DropDown from "../../components/DropDown/DropDown";
import MyDatePicker from "../../components/DatePicker/DatePicker";

import dayjs from "dayjs";

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
  Splitter,
} from "./CreateMatch.styled";
import TextField from "../../components/TextField/TextField";
import MatchBox from "../../layouts/MatchBox/MatchBox";
import MyTimePicker from "../../components/MyTimePicker/MyTimePicker";

import useFetchFunction from "../../hooks/useFetchFunction";
import { useAuth } from "../../contexts/Authentication";
import { getStads } from "../../services/stad";

// const stads = [
//   { stadiumName: "cairo", rows: 5, cols: 8 },
//   { stadiumName: "anotherStadium", rows: 7, cols: 10 },
// ];

const teams = [
  "alahly",
  "bank",
  "dakhlia",
  "elethad",
  "elgeesh",
  "elgona",
  "elmahla",
  "elmasry",
  "enbi",
  "esmaili",
  "future",
  "mqawloon",
  "pharco",
  "pyramids",
  "siramika",
  "smoha",
  "zamalek",
  "zed",
];

const CreateMatch = () => {
  const { id } = useParams();

  const [data, error, isLoading, dataFetch] = useFetchFunction();
  const auth = useAuth();

  const [stads, setStads] = useState([]);

  const [seats, setSeats] = useState(5);
  const [numOfSeats, setNumOfSeats] = useState(5);
  const [stadName, setStadName] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [referee, setReferee] = useState("");
  const [lineManOne, setLineManOne] = useState("");
  const [lineManTwo, setLineManTwo] = useState("");

  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [time, setTime] = useState(dayjs("2022-04-17T15:30"));

  useEffect(() => {
    console.log("data:", data);
    if (data.length > 0) {
      setStads(data);
    }
  }, [data]);

  useEffect(() => {
    // Find the selected stadium object from stads array
    console.log("Hello");
    const selectedStad = stads.find((stad) => stad.stadiumName === stadName);
    if (selectedStad) {
      setSeats(selectedStad.numberOfRows);
      setNumOfSeats(selectedStad.numberOfSeatsPerRow);
    }
  }, [stadName]);

  const handleSubmit = () => {
    if (
      stadName === "" ||
      homeTeam === "" ||
      awayTeam === "" ||
      referee === "" ||
      lineManOne === "" ||
      lineManTwo === "" ||
      stadName === undefined ||
      homeTeam === undefined ||
      awayTeam === undefined ||
      referee === undefined ||
      lineManOne === undefined ||
      lineManTwo === undefined
    ) {
      alert("All fields must be filled");
    } else {
      console.log("done");
    }
  };

  useEffect(() => {
    getStads(dataFetch, auth);
  }, []);

  return (
    <>
      {stads.length === 0 && <h2>loading</h2>}{" "}
      {stads.length > 0 && (
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
            <MatchBox
              name1={homeTeam}
              name2={awayTeam}
              show={true}
              stad={stadName}
            />
          </PartOne>
          <PartTwo>
            <Header>Create Match</Header>

            <DropDown
              label="Stadium"
              value={stadName}
              setValue={setStadName}
              placeHolder="Stadium"
              items={stads.map((stad) => stad.stadiumName)}
            />

            <DropDown
              label="Home Team"
              value={homeTeam}
              setValue={setHomeTeam}
              placeHolder="Select Home Team"
              items={teams.filter((team) => team !== awayTeam)} // Filter out the selected awayTeam
            />

            <DropDown
              label="Away Team"
              value={awayTeam}
              setValue={setAwayTeam}
              placeHolder="Select Away Team"
              items={teams.filter((team) => team !== homeTeam)} // Filter out the selected homeTeam
            />

            <TextField
              label={"Referee"}
              placeHolder={"Referee"}
              value={referee}
              setValue={setReferee}
            />
            <TextField
              label={"Line man 1"}
              placeHolder={"Line man 1"}
              value={lineManOne}
              setValue={setLineManOne}
            />
            <TextField
              label={"Line man 2"}
              placeHolder={"Line man 2"}
              value={lineManTwo}
              setValue={setLineManTwo}
            />

            <Splitter>
              <MyDatePicker
                value={date}
                setValue={setDate}
                label={"Match Date"}
              />{" "}
              <MyTimePicker
                value={time}
                setValue={setTime}
                label={"Match Hour"}
              />
            </Splitter>

            <MyButton onClick={handleSubmit}>Create</MyButton>
          </PartTwo>
        </Container>
      )}
    </>
  );
};

export default CreateMatch;
