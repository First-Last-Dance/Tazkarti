import { Container, PartOne, PartTwo } from "./HeaderRow.styled";

const HeaderRow = () => {
  return (
    <Container>
      <PartOne>User Name</PartOne>
      <PartOne>Role</PartOne>
      <PartTwo>Actions</PartTwo>
    </Container>
  );
};

export default HeaderRow;
