/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box, Button, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "fit-content",
  backgroundColor: "#e4e4e4",
  borderRadius: "10px",
  boxShadow: "0px 0px 8px -3px black",
  margin: "0 auto",
  maxWidth: "90%",
  padding: "15px",
  "@media screen and (max-width: 768px)": {},
}));

export const Splitter = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
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

export const MyButton = styled(Button)(({ theme, disabled }) => ({
  fontSize: "1rem",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: !disabled ? theme.palette.blue.main : "gray",
  width: "100%",

  "@media screen and (max-width: 768px)": {},
}));

export const Role = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "black",
  textAlign: "start",
  width: "50%",
  paddingTop: "5px",
  marginLeft: "5px",
  "@media screen and (max-width: 768px)": {},
}));
