/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "95%",
  margin: "0 auto",
  "@media screen and (max-width: 768px)": {},
}));

export const Header = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.blue.light,
  textAlign: "start",

  "@media screen and (max-width: 768px)": {},
}));
