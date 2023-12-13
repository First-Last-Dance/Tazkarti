/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 10px",

  borderBottom: "1px solid #eee",

  "@media screen and (max-width: 768px)": {},
}));

export const PartOne = styled(Box)(({ theme }) => ({
  width: "25%",
  textAlign: "center",

  "@media screen and (max-width: 768px)": {},
}));

export const PartTwo = styled(Box)(({ theme }) => ({
  width: "50%",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  gap: "5px",

  "@media screen and (max-width: 768px)": {},
}));

export const MyButton = styled(Box)(({ theme }) => ({
  padding: "5px 10px",
  textAlign: "center",
  color: "white",
  backgroundColor: "black",
  cursor: "pointer",

  "@media screen and (max-width: 768px)": {},
}));
