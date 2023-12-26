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
} from "./EditMatch.styled";
import TextField from "../../components/TextField/TextField";
import MatchBox from "../../layouts/MatchBox/MatchBox";
import MyTimePicker from "../../components/MyTimePicker/MyTimePicker";

import useFetchFunction from "../../hooks/useFetchFunction";
import { useAuth } from "../../contexts/Authentication";
import { getStads } from "../../services/stad";
import { createMatch, getMatch, EditMatchFunc } from "../../services/match";

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

const EditMatch = () => {
  const { id } = useParams();

  const [data, error, isLoading, dataFetch] = useFetchFunction();
  const [data2, error2, isLoading2, dataFetch2] = useFetchFunction();
  const [data3, error3, isLoading3, dataFetch3] = useFetchFunction();
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

  function convertToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = () => {
    if (
      id === "" ||
      stadName === "" ||
      homeTeam === "" ||
      awayTeam === "" ||
      referee === "" ||
      lineManOne === "" ||
      lineManTwo === "" ||
      date === "" ||
      time === "" ||
      id === undefined ||
      stadName === undefined ||
      homeTeam === undefined ||
      awayTeam === undefined ||
      referee === undefined ||
      lineManOne === undefined ||
      date === undefined ||
      time === undefined ||
      lineManTwo === undefined
    ) {
      alert("All fields must be filled");
    } else {
      console.log("entertefdf");
      EditMatchFunc(
        dataFetch2,
        {
          matchID: id,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          matchVenue: stadName,
          date: convertToYYYYMMDD(date),
          time: time,
          mainReferee: referee,
          firstLinesman: lineManOne,
          secondLinesman: lineManTwo,
        },
        auth
      );
    }
  };

  useEffect(() => {
    // console.log("data2", data2);
  }, [data2]);

  useEffect(() => {
    getStads(dataFetch, auth);
    getMatch(dataFetch3, { matchID: id }, auth);
  }, []);

  useEffect(() => {
    console.log("data3", data3);
    if (data3) {
      setHomeTeam(data3.homeTeam);
      setAwayTeam(data3.awayTeam);
      setStadName(data3.matchVenue);
      setDate(dayjs(data3.date));
      setTime(dayjs(data3.time));
      setReferee(data3.mainReferee);
      setLineManOne(data3.firstLinesman);
      setLineManTwo(data3.secondLinesman);
    }
  }, [data3]);

  return (
    <>
      {stads.length === 0 && data3 && <h2>loading</h2>}{" "}
      {stads.length > 0 && data3 && (
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
            <Header>Edit Match</Header>

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

            <MyButton onClick={handleSubmit}>Edit</MyButton>
          </PartTwo>
        </Container>
      )}
    </>
  );
};

export default EditMatch;
