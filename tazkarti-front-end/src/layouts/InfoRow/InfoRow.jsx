/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Container, PartOne, PartTwo, MyButton } from "./InfoRow.styled";

import useFetchFunction from "../../hooks/useFetchFunction";
import { approveUser, removeUser, switchRole } from "../../services/admin";
import { useAuth } from "../../contexts/Authentication";

const InfoRow = ({ userName, role, approved }) => {
  const auth = useAuth();
  const [data, error, isLoading, dataFetch] = useFetchFunction();

  const handleApprove = () => {
    approveUser(dataFetch, { userName: userName }, auth);
    window.location.reload();
  };

  const handleRemove = () => {
    removeUser(dataFetch, { userName: userName }, auth);
    window.location.reload();
  };

  const handleSwitchRole = () => {
    switchRole(dataFetch, { userName: userName }, auth);
    window.location.reload();
  };

  return (
    <Container>
      <PartOne>{userName}</PartOne>
      <PartOne>{role}</PartOne>
      {approved && (
        <PartTwo>
          {role == "fan" && (
            <MyButton onClick={handleSwitchRole}>Make Manager</MyButton>
          )}
          {role == "manager" && (
            <MyButton onClick={handleSwitchRole}>Make Fan</MyButton>
          )}
          <MyButton>Remove</MyButton>
        </PartTwo>
      )}
      {!approved && (
        <PartTwo>
          <MyButton onClick={handleApprove}>Approve</MyButton>
          <MyButton onClick={handleRemove}>Remove</MyButton>
        </PartTwo>
      )}
    </Container>
  );
};

export default InfoRow;
