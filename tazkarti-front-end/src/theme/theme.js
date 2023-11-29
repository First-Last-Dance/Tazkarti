import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Define your custom theme
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      // mode: "dark",
      primary: {
        // Orange
        main: "#026773",
        light: "#012E40",
        contrastText: "#fff",
      },
      secondary: {
        // Blue
        main: "#3CA6A6",
        light: "#3CA6A6",
        dark: "#4A7B93",
      },
      tertiary: {
        // grey
        main: "#497A93",
        light: "#F9FBFC",
        second: "#E9F1F5",
      },
      red: {
        main: "#A62D43",
      },
      black: {
        main: "#454E52",
        light: "#3A4144",
        greyish: "#e2e2e2",
      },
      white: {
        main: "#616D73",
        light: "#d5d9db",
      },
      common: {
        white: "#FDFEFE",
        black: "#121214",
      },
    },
    typography: {
      fontSize: 12,
    },
  })
);

export default theme;
