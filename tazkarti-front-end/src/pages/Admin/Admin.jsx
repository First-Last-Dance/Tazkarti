import { useAuth } from "../../contexts/Authentication";
import MyTable from "../../layouts/MyTable/MyTable";

import { Container, Header } from "./Admin.styled";



const Admin = () => {
  const auth = useAuth();



  return (
    <Container>
      {auth.getUserName() === "Admin" && (
        <>
          <Header>Waiting Users</Header>
          <MyTable />
          <Header>Approved Users</Header>
          <MyTable approved={true} />
        </>
      )}
      {auth.getUserName() !== "Admin" && (
        <>
          <h1>Not Admin</h1>
        </>
      )}
    </Container>
  );
};

export default Admin;
