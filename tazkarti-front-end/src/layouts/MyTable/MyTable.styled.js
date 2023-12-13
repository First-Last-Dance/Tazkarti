/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 auto",
  boxShadow: "0px 0px 5px 0px black",

  "@media screen and (max-width: 768px)": {},
}));
