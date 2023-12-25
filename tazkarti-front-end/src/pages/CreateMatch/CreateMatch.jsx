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

const stads = [
  { name: "cairo", rows: 5, cols: 8 },
  { name: "anotherStadium", rows: 7, cols: 10 },
  // Add more stadiums as needed
];

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

  const [seats, setSeats] = useState(5);
  const [numOfSeats, setNumOfSeats] = useState(5);
  const [stadName, setStadName] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [referee, setReferee] = useState("");
  const [lineManOne, setLineManOne] = useState("");
  const [lineManTwo, setLineManTwo] = useState("");

  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [time, setTime] = useState(dayjs('2022-04-17T15:30'));

  useEffect(() => {
    // Find the selected stadium object from stads array
    const selectedStad = stads.find((stad) => stad.name === stadName);
    if (selectedStad) {
      setSeats(selectedStad.rows);
      setNumOfSeats(selectedStad.cols);
    }
  }, [stadName]);

  const handleSubmit = () => {
    // Handle form submission here
  };

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
          items={stads.map((stad) => stad.name)}
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
          <MyDatePicker value={date} setValue={setDate} label={"Match Date"}/>{" "}
          <MyTimePicker value={time} setValue={setTime} label={"Match Hour"}/>
        </Splitter>

        <MyButton onClick={handleSubmit}>Create</MyButton>
      </PartTwo>
    </Container>
  );
};

export default CreateMatch;
