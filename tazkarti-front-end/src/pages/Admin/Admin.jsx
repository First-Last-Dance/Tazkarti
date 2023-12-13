import MyTable from "../../layouts/MyTable/MyTable";

import { Container, Header } from "./Admin.styled";

const users = [
  { userName: "mohamedromee", role: "fan" },
  { userName: "mohamedromee", role: "fan" },
  { userName: "mohamedromee", role: "fan" },
  { userName: "mohamedromee", role: "fan" },
];

const Admin = () => {
  return (
    <Container>
      <Header>Waiting Users</Header>
      <MyTable users={users} />
      <Header>Approved Users</Header>
      <MyTable users={users} approved = {true}/>
    </Container>
  );
};

export default Admin;
