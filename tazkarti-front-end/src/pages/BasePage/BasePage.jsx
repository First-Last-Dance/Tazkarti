import { Outlet } from "react-router-dom";
import NavBar from "../../layouts/NavBar/NavBar";
import Footer from "../../layouts/Footer/Footer";

const BasePage = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default BasePage;
