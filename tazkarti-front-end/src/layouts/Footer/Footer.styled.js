import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "50px",
  position: "static",
  bottom: 0,
  left: 0,
  backgroundColor: theme.palette.gray.main,

  '@media screen and (max-width: 768px)': {
   
  },
}));
