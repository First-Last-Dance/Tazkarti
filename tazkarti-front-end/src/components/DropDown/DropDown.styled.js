/* eslint-disable no-unused-vars */
import { styled, alpha } from "@mui/system";
import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import theme from "../../theme/theme";

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: ${(p) => (p.isSplitted ? "50%" : "100%")};
`;

export const MyAutoComplete = styled(Autocomplete)`
  color: white;
  border: 1px solid transparent;
  border-radius: ${(p) => (p.isSplitted ? "10px" : "10px")};
  outline: none;
  max-width: 100%;
  width: 100% !important;
  padding: 0 !important;

  fieldset {
    border: none;
  }
  .MuiInputBase-root {
    padding: 0;
  }

  .MuiFormControl-root {
    justify-content: center;
    align-items: center;
    height: 2.2rem;
  }

  .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot.css-7yt0d-MuiInputBase-root-MuiOutlinedInput-root {
    border-radius: 0;
    height: 3rem;
    padding: 0 !important;

    input {
      padding: 0 !important;
    }
  }

  label {
    display: none;
  }

  button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-popupIndicator.css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator {
    border-left: 1px solid black;
    border-radius: 0;
  }
  @media (max-width: 900px) {
  }
`;

export const MyTextField = styled(TextField)`
  color: black;
  background-color: white;
  border-radius: ${(p) => (p.isSplitted ? "10px" : "10px")};
  outline: none;
  height: 3.2rem;
  padding: 0;
  @media (max-width: 900px) {
  }
`;

export const MyLabel = styled(Typography)`
  text-align: start;
  color: black;
  font-size: 0.7rem;

  @media (max-width: 900px) {
  }
`;
