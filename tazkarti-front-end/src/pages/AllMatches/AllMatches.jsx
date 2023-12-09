/* eslint-disable no-unused-vars */
import { Container, MatchContainer } from "./AllMatches.styled";
import MatchBox from "../../layouts/MatchBox/MatchBox";

const matches = [
  {
    id: "2003",
    homeClubName: "Alahly",
    awayClubName: "Zamalek",
    stad: "Cairo",
    date: "4/2/2023",
  },
  {
    id: "2002",
    homeClubName: "Alahly",
    awayClubName: "Zamalek",
    stad: "Cairo",
    date: "4/2/2023",
  },
  {
    id: "2001",
    homeClubName: "Alahly",
    awayClubName: "Zamalek",
    stad: "Cairo",
    date: "4/2/2023",
  },
];

const AllMatches = () => {

  return (
    <Container>
      <MatchContainer>
        {matches.map((match, index) => (
          <MatchBox
            key={match.id}
            id={match.id}
            name1={match.homeClubName}
            name2={match.awayClubName}
            stad={match.stad}
            date={match.date}
          />
        ))}
      </MatchContainer>
    </Container>
  );
};

export default AllMatches;
