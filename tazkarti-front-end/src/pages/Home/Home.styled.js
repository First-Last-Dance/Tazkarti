/* eslint-disable no-unused-vars */
import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme, image }) => ({
  width: "100%",
  height: "100vh", // Set the container height to the viewport height for full-screen display
  backgroundSize: "cover", // Ensure the background image covers the entire container
  backgroundRepeat: "no-repeat", // Prevent the background image from repeating
  backgroundPosition: "center", // Center the background image

  backgroundImage: image ? `url(${image})` : "none", // Set background image if available

  "@media screen and (max-width: 768px)": {
    /* Additional styles for smaller screens if needed */
    /* For example: */
    padding: "20px",
  },
}));
