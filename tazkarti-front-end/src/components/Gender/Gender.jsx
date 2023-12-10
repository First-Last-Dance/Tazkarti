/* eslint-disable react/prop-types */
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Gender = ({ value, setValue, disabled }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        <FormControlLabel
          value="female"
          control={<Radio disabled={disabled} />}
          label="Female"
        />
        <FormControlLabel
          value="male"
          control={<Radio disabled={disabled} />}
          label="Male"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Gender;
