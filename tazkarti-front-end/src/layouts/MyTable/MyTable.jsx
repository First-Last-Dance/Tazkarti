/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Container } from "./MyTable.styled";

import HeaderRow from "../HeaderRow/HeaderRow";
import InfoRow from "../InfoRow/InfoRow";

const MyTable = ({ users, approved }) => {
  return (
    <Container>
      <HeaderRow />
      {users.map((user, index) => (
        <InfoRow key={index} userName={user.userName} role={user.role} approved={approved}/>
      ))}
    </Container>
  );
};

export default MyTable;
