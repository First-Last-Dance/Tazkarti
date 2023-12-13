/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.gray.main,
  padding: " 5px 10px",
  color: "white",

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

  "@media screen and (max-width: 768px)": {},
}));
