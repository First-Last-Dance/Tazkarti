/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "15px 20px",
  margin: "10px 0",
  backgroundColor: "#efefef",
  boxShadow: "0px 0px 7px -3px",
  borderRadius: "10px",
  "@media screen and (max-width: 768px)": {
    padding: "5px",

  },
}));

export const ClubBox = styled(Box)(({ theme }) => ({
  width: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "@media screen and (max-width: 768px)": {
    width: "150px",
  },
}));

export const ClubLogo = styled(Box)(({ theme }) => ({
  width: "50px",

  "& img": {
    width: "100%",
  },

  "@media screen and (max-width: 768px)": {
    width: "40px",
  },
}));

export const ClubName = styled(Typography)(({ theme }) => ({
  color: "black",
  fontSize: "1rem",

  "@media screen and (max-width: 768px)": {
    fontSize: "0.8rem",
  },
}));

export const ClubsContainer = styled(Box)(({ theme }) => ({
  width: "80%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  "@media screen and (max-width: 768px)": {
    width: "100%",
  },
}));

export const ReserveButton = styled(Box)(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  textAlign: "center",
  verticalAlign: "middle",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.blue.main,
  padding: "5px 10px",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  "@media screen and (max-width: 768px)": {
    fontSize: "0.8rem",
  },
}));

export const MiddleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "@media screen and (max-width: 768px)": {},
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px 0 0",
  "@media screen and (max-width: 768px)": {},
}));

export const Stad = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 5px",
  "@media screen and (max-width: 768px)": {},
}));

export const Date = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media screen and (max-width: 768px)": {},
}));
