/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",

  "@media screen and (max-width: 768px)": {},
}));

export const Stad = styled(Box)(({ theme }) => ({
  width: "700px",
  margin: "0 auto",
  maxWidth: "90%",

  "& img": {
    width: "100%",
    maxWidth: "100%",
  },

  "@media screen and (max-width: 768px)": {},
}));

export const Seat = styled(Box)(({ theme, notSelected, fromMe }) => ({
  width: "fit-content",
  height: "fit-content",

  "& svg": {
    height: "50px",
    width: "50px",
    color: notSelected
      ? "green !important"
      : fromMe
      ? "blue !important"
      : "red !important",
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


export const MyButton = styled(Box)(({ theme }) => ({

  fontSize: "1rem",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: theme.palette.blue.main,
  width: "fit-content",
  margin: "10px auto",

  "@media screen and (max-width: 768px)": {},
}));