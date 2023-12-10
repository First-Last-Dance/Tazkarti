/* eslint-disable react/prop-types */
import { Container, MyLabel } from "./TextField.styled";

const TextField = ({
  login,
  label,
  placeHolder,
  value,
  setValue,
  isSplitted,
  right,
  number,
  color = "light",
  disabled = false,
}) => {
  const handleValueChange = (event) => {
    if (number) {
      if (/^\d*$/.test(event.target.value)) {
        if (event.target.value === "" && !login) {
          setValue(undefined);
        } else {
          setValue(event.target.value);
        }
      }
    } else {
      if (event.target.value === "" && !login) {
        setValue(undefined);
      } else {
        setValue(event.target.value);
      }
    }
  };
  return (
    <Container login={login} isSplitted={isSplitted} right={right}>
      <MyLabel color={color}>{label}</MyLabel>
      <input
        placeholder={placeHolder}
        value={value ? value : ""}
        onChange={handleValueChange}
        disabled={disabled}
      />
    </Container>
  );
};

export default TextField;
