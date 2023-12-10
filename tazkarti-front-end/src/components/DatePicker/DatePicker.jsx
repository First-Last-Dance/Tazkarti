/* eslint-disable react/prop-types */
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MyDatePicker = ({ value, setValue, disabled }) => {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Birth date"
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MyDatePicker;
