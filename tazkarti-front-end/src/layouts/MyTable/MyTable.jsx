/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Container } from "./MyTable.styled";

import { useState, useEffect } from "react";

import useFetchFunction from "../../hooks/useFetchFunction";
import { useAuth } from "../../contexts/Authentication";

import HeaderRow from "../HeaderRow/HeaderRow";
import InfoRow from "../InfoRow/InfoRow";
import { getApprovedUsers, getWaitingUsers } from "../../services/admin";

const MyTable = ({ approved }) => {

  const auth = useAuth()

  const [data, error, isLoading, dataFetch] = useFetchFunction();

  const [users, setUsers] = useState();


  useEffect(() => {
    if (approved) {
      getApprovedUsers(dataFetch, auth);
    } else {
      getWaitingUsers(dataFetch, auth);
    }
  }, []);

  useEffect(()=>{
    setUsers(data);
  },[data])

  return (
    <Container>
      <HeaderRow />
      {data && users && users.map((user, index) => (
        <InfoRow
          key={index}
          userName={user.userName}
          role={user.role}
          approved={approved}
        />
      ))}
    </Container>
  );
};

export default MyTable;
