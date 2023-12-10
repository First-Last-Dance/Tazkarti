/* eslint-disable react/prop-types */
import Switch from "@mui/material/Switch";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const SwitchButton = ({ checked, setChecked, label }) => {
  const handleChange = (event) => {
    console.log(event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default SwitchButton;
