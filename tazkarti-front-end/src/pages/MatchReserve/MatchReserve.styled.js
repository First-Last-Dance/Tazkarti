/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",

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

export const Seat = styled(Box)(({ theme, notSelected }) => ({
  width: "fit-content",
  height: "fit-content",

  "& svg": {
    height: "50px",
    width: "50px",
    color: notSelected ? "green !important" :"red !important",
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
