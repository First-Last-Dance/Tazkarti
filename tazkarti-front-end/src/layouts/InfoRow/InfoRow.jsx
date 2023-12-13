/* eslint-disable react/prop-types */
import { Container, PartOne, PartTwo, MyButton } from "./InfoRow.styled";

const InfoRow = ({ userName, role, approved }) => {
  return (
    <Container>
      <PartOne>{userName}</PartOne>
      <PartOne>{role}</PartOne>
      {approved && (
        <PartTwo>
          {role == "fan" && <MyButton>Make Manager</MyButton>}
          {role == "manager" && <MyButton>Make Fan</MyButton>}
          <MyButton>Remove</MyButton>
        </PartTwo>
      )}
      {!approved && (
        <PartTwo>
          <MyButton>Approve</MyButton>
          <MyButton>Remove</MyButton>
        </PartTwo>
      )}
    </Container>
  );
};

export default InfoRow;
