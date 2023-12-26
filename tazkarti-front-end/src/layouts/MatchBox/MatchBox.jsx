/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  ClubBox,
  ClubLogo,
  ClubName,
  ClubsContainer,
  Container,
  Date,
  InfoContainer,
  MiddleContainer,
  ReserveButton,
  Stad,
} from "./MatchBox.styled";

import StadiumIcon from "@mui/icons-material/Stadium";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Authentication";
import { useEffect, useState } from "react";
import useFetchFunction from "../../hooks/useFetchFunction";
import { deleteMatch } from "../../services/match";

const MatchBox = ({ id, name1, name2, stad, date, show }) => {
  const navigate = useNavigate();

  const auth = useAuth();
  const [data, error, isLoading, dataFetch] = useFetchFunction();

  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (auth) {
      if (auth.getRole) {
        if (auth.getRole() === "manager") {
          setIsManager(true);
        }
      }
    }
  }, []);

  const handleDelete = () => {
    deleteMatch(dataFetch, { matchID: id }, auth);
  };

  return (
    <Container>
      <ClubsContainer>
        <ClubBox>
          <ClubName>{name1}</ClubName>
          <ClubLogo>
            <img
              src={"src/assets/images/teams/" + name1.toLowerCase() + ".png"}
            />
          </ClubLogo>
        </ClubBox>
        <MiddleContainer>
          {" "}
          {!show && (
            <ReserveButton
              onClick={() => {
                navigate(`/buy-ticket/${id}`);
              }}
            >
              Buy Ticket
            </ReserveButton>
          )}
          {!show && isManager && (
            <>
              <br />{" "}
              <ReserveButton
                onClick={() => {
                  navigate(`/edit-match/${id}`);
                }}
              >
                Edit Match
              </ReserveButton>
              <br />{" "}
              <ReserveButton onClick={handleDelete}>Delete Match</ReserveButton>
            </>
          )}
          <InfoContainer>
            <Stad>
              <StadiumIcon />
              {stad + " "}
            </Stad>

            <Date>
              <CalendarMonthIcon />
              {date}
            </Date>
          </InfoContainer>
        </MiddleContainer>
        <ClubBox>
          <ClubLogo>
            <img
              src={"src/assets/images/teams/" + name2.toLowerCase() + ".png"}
            />
          </ClubLogo>
          <ClubName>{name2}</ClubName>
        </ClubBox>
      </ClubsContainer>
    </Container>
  );
};

export default MatchBox;
