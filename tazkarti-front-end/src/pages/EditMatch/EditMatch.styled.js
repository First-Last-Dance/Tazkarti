/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "@media screen and (max-width: 768px)": {
    flexDirection: "column",
  },
}));
export const PartOne = styled(Box)(({ theme }) => ({
  width: "49%",

  "@media screen and (max-width: 768px)": {
    width: "100%",
  },
}));

export const Stad = styled(Box)(({ theme }) => ({
  width: "700px",
  margin: "10px auto",
  maxWidth: "90%",

  "& img": {
    width: "100%",
    maxWidth: "100%",
  },

  "@media screen and (max-width: 768px)": {},
}));

export const Seat = styled(Box)(({ theme, notSelected }) => ({
  width: "fit-content",
  height: "fit-content",

  "& svg": {
    height: "50px",
    width: "50px",
    color: notSelected ? "green !important" : "red !important",
    cursor: notSelected ? "pointer" : "default",
  },

  "@media screen and (max-width: 768px)": {},
}));

export const Seats = styled(Box)(({ theme }) => ({
  //   width: "90%",
  margin: "0 auto",
  height: "fit-content",

  display: "flex",
  justifyContent: "center",

  "@media screen and (max-width: 768px)": {},
}));
export const SeatsContainer = styled(Box)(({ theme }) => ({
  //   width: "90%",
  margin: "10px auto",
  height: "fit-content",

  "@media screen and (max-width: 768px)": {},
}));

export const PartTwo = styled(Box)(({ theme }) => ({
  width: "49%",
  height: "fit-content",
  backgroundColor: "#e4e4e4",
  borderRadius: "10px",
  boxShadow: "0px 0px 8px -3px black",
  margin: "0 auto",
  maxWidth: "90%",
  padding: "15px",

  "@media screen and (max-width: 768px)": {
    width: "100%",
  },
}));

export const Splitter = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0 auto",

  "@media screen and (max-width: 768px)": {},
}));

export const Header = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.blue.light,
  textAlign: "start",

  "@media screen and (max-width: 768px)": {},
}));

export const MyButton = styled(Box)(({ theme }) => ({
  fontSize: "1rem",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: theme.palette.blue.main,
  width: "100%",
  margin: "10px 0",

  "@media screen and (max-width: 768px)": {},
}));

export const Change = styled(Typography)(({ theme }) => ({
  margin: "5px 0",
  textAlign: "start",
  fontSize: "0.8rem",
  color: "black",

  "& span": {
    color: theme.palette.blue.light,
    cursor: "pointer",
  },

  "@media screen and (max-width: 768px)": {},
}));
