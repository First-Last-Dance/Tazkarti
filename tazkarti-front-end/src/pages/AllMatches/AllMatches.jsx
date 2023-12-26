/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Container, MatchContainer } from "./AllMatches.styled";
import MatchBox from "../../layouts/MatchBox/MatchBox";
import useFetchFunction from "../../hooks/useFetchFunction";
import { useAuth } from "../../contexts/Authentication";
import { useEffect, useState } from "react";
import { getAllMatches } from "../../services/match";

// const matches = [
//   {
//     id: "2003",
//     homeClubName: "Alahly",
//     awayClubName: "Zamalek",
//     stad: "Cairo",
//     date: "4/2/2023",
//   },
//   {
//     id: "2002",
//     homeClubName: "Alahly",
//     awayClubName: "Zamalek",
//     stad: "Cairo",
//     date: "4/2/2023",
//   },
//   {
//     id: "2001",
//     homeClubName: "Alahly",
//     awayClubName: "Zamalek",
//     stad: "Cairo",
//     date: "4/2/2023",
//   },
// ];

const AllMatches = () => {
  const [data, error, isLoading, dataFetch] = useFetchFunction();
  const auth = useAuth();

  const [matches, setMatches] = useState([]);


  function convertToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  useEffect(() => {
    getAllMatches(dataFetch, auth);
  }, []);

  useEffect(() => {
    if (data) {
      setMatches(data);
    }
  }, [data]);

  return (
    <>
      {isLoading && <h1>Loading</h1>}
      {!isLoading && matches && (
        <Container>
          <MatchContainer>
            {matches.map((match, index) => (
              <MatchBox
                key={match.matchID}
                id={match.matchID}
                name1={match.homeTeam}
                name2={match.awayTeam}
                stad={match.matchVenue}
                // stad={"Cairo"}
                date={match.date}
              />
            ))}
          </MatchContainer>
        </Container>
      )}
    </>
  );
};

export default AllMatches;
