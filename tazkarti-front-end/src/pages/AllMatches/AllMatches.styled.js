/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  padding: "10px 20px",
  "@media screen and (max-width: 768px)": {},
}));


export const MatchContainer = styled(Box)(({ theme }) => ({
    width: "70%",
    margin: "0 auto",
    "@media screen and (max-width: 768px)": {
      width: "100%"
    },
  }));
  