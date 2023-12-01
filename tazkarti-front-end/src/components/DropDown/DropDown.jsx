/* eslint-disable react/prop-types */
import {
  MyAutoComplete,
  MyTextField,
  MyLabel,
  Container,
} from "./DropDown.styled";

const DropDown = ({
  value,
  setValue,
  items,
  label,
  placeHolder,
  isSplitted,
  color = "light",
}) => {
  const handleValueChange = (event, newValue) => {
    if (newValue === "") {
      setValue(undefined);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Container isSplitted={isSplitted}>
      <MyLabel color={color}>{label}</MyLabel>
      <MyAutoComplete
        isSplitted={isSplitted}
        disablePortal
        id="combo-box-demo"
        options={items}
        value={value}
        onChange={handleValueChange}
        sx={{ paddingX: 0, paddingY: 0 }}
        disableClearable={true}
        renderInput={(params) => (
          <MyTextField
            isSplitted={isSplitted}
            placeholder={placeHolder}
            {...params}
            // label={label}
          />
        )}
      />
    </Container>
  );
};

export default DropDown;
