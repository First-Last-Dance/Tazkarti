import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Define your custom theme
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      blue: {
        main: "#262440",
        light: "#278DA2",
      },
      gray: {
        main: "#545070",
        light: "#F2ECFF",
      },
      green: {
        main: "#00C897",
        light: "#C8FCEA",
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
